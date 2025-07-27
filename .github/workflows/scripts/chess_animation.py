import time
import os

def clear_screen():
    # For Windows
    if os.name == 'nt':
        _ = os.system('cls')
    # For macOS and Linux(here, os.name is 'posix')
    else:
        _ = os.system('clear')

def animate_board():
    board_states = [
        # Initial board
        "r n b q k b n r\np p p p p p p p\n. . . . . . . .\n. . . . . . . .\n. . . . . . . .\n. . . . . . . .\nP P P P P P P P\nR N B Q K B N R",
        # Simple pawn move e.g., e2 to e4
        "r n b q k b n r\np p p p p p p p\n. . . . . . . .\n. . . . . . . .\n. . . . P . . .\n. . . . . . . .\nP P P P . P P P\nR N B Q K B N R",
        # Another simple move
        "r n b q k b n r\n. p p p p p p p\np . . . . . . .\n. . . . . . . .\n. . . . P . . .\n. . . . . . . .\nP P P P . P P P\nR N B Q K B N R",
        # You can add more complex states
    ]

    print("Terminal Chess Animation!")
    time.sleep(1)

    for i, state in enumerate(board_states):
        clear_screen()
        print(f"Frame {i+1}/{len(board_states)}")
        print("-" * 17)
        for row in state.split('\n'):
            print(row.replace(' ', '')) # Remove spaces if you prefer compact
        print("-" * 17)
        time.sleep(1) # Adjust speed

    clear_screen()
    print("Animation complete!")

if __name__ == "__main__":
    animate_board()
