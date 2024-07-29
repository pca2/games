#! /bin/bash
# Check if an argument was provided
if [ $# -eq 0 ]; then
  echo "Usage: $0 <arg>"
  exit 1
fi

room_id=$1

if [ -z "$2" ]; then
  server_room_id=$1
else
  server_room_id=$2
fi

cat $room_id.json | http PUT "https://virtualtabletop.io/state/$server_room_id"

echo "Upload of $room_id to $server_room_id complete"
