import requests
import csv
import sys

def download_mtg_deck(url):
    # Headers to mimic a Linux Firefox browser
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:90.0) Gecko/20100101 Firefox/90.0'
    }

    # Make a request to the URL with the custom headers to get the deck data
    response = requests.get(url, headers=headers)
    deck_data = response.json()
    deck_name = deck_data['name']
    file_name = deck_name.replace(" ", "_") + '.csv'
    print("Parsing " + deck_name)

    # Extract the mainboard cards from the deck data
    mainboard = deck_data['mainboard']

    # Create a CSV file and write the card names and counts
    with open(file_name, 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['label', 'image', 'cardCount::INTERNAL'])  # Header row

        for card in mainboard:
            name = mainboard[card]['card']['name']
            count = mainboard[card]['quantity']
            # URL format for Scryfall API to fetch card images
            image_url = f"https://api.scryfall.com/cards/named?exact={'+'.join(name.split())}&format=image"
            writer.writerow([ name, image_url, count])
    return file_name


if len(sys.argv) == 2:
    # The first argument sys.argv[0] is the script name, so sys.argv[1] is the first actual input argument
    url = sys.argv[1]
    print(f"The URL provided is: {url}")
    deck_id = url.split('/')[-1]
    download_url = "https://api2.moxfield.com/v2/decks/all/" + deck_id
else:
    print("This script requires exactly one argument which is a URL.")


file_name = download_mtg_deck(download_url)
print(file_name + ' complete!')
