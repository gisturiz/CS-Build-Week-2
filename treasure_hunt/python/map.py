import json
import sys
import time

import requests

# Rooms dictionary
rooms = {}

# Define main URL
URL = "https://lambda-treasure-hunt.herokuapp.com/api/adv/move/"

# Initial get request to API
# r = requests.get(url=URL + "init/",
#                  headers={"Authorization": "Token dac283c27cd80fc77aba445dd4834ab83ee0eff5"})

# Move
def move(move_direction):
    direction = {"direction": move_direction}
    move = requests.post(url="https://lambda-treasure-hunt.herokuapp.com/api/adv/move/", json=direction,
                         headers={
                             "Authorization": "Token dac283c27cd80fc77aba445dd4834ab83ee0eff5",
                             "Content-Type": "application/json"})
    print(direction)
    print(move)

    # Data received
    data = move.json()

    # Converts dicitonary to String
    response = json.dumps(data)

    # Open map.txt file to append map rooms
    f = open("map.txt", "a")

    # Appends room details to map.txt
    f.write(response + "," "\n")
    f.close()

    # Define room_id variable
    room_id = data["room_id"]

    # Define room exits variable
    exits = data["exits"]

    # Append room_id and exits to rooms dictionary
    room_exits = {}
    for exit in exits:
        room_exits[exit] = "?"

    # Assign room exits to room id
    rooms[room_id] = room_exits

    print(room_id)
    print(exits)
    print(room_exits)
    print(rooms)

    return room_id


def get_neighbors(room_id):
    """
    Get all neighbors (edges) of a vertex.
    """
    return rooms[room_id]


def dft(direction, visited=None):
    """
    Print each vertex in depth-first order
    beginning from starting_vertex.

    This should be done using recursion.
    """
    if visited is None:
        visited = {}
    print(visited)

    room_id = move(direction)
    if room_id not in visited:  
        visited[room_id] = None
    print(room_id)

    # 15 second cooldown
    time.sleep(20)

    # Check if the node is visited
    if direction not in visited[room_id]:
        # Mark it as visited
        visited[room_id] = direction
        # Print
        print("direction" + direction)

        for neighbor in get_neighbors(room_id):
            dft(neighbor, visited)


dft(sys.argv[1])
