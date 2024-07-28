
#! bin/sh
# Check if an argument was provided
if [ $# -eq 0 ]; then
  echo "Usage: $0 <arg>"
  exit 1
fi

room_id=$1
cat $room_id.json | http PUT "https://virtualtabletop.io/state/$room_id"

echo "Upload of $room_id complete"
