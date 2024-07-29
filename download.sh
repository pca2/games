#! /bin/bash
# Check if an argument was provided
if [ $# -eq 0 ]; then
  echo "Usage: $0 <arg>"
  exit 1
fi

room_id=$1
http GET "https://virtualtabletop.io/state/$room_id" > $room_id.json

echo "Download of $room_id complete"
