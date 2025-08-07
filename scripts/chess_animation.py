#!/usr/bin/env python3

import os
import time

FRAME_DELAY = 1  # delay in seconds between frames


def clear_screen():
    # Clears the terminal screen in a cross-platform way
    try:
        if os.name == "nt":
            os.system("cls")  # Windows
        else:
            os.system("clear")  # macOS/Linux
    except Exception:
        print("\033[H\033[J", end="")  # ANSI escape sequence fallback


def animate_board():
    board_states = [
        # Initial board
        "r n b q k b n r\np p p p p p p p\n. . . . . . . .\n. . . . . . . .\n. . . . . . . .\n. . . . . . . .\nP P P P P P P P\nR N B Q K B N R",
        # Simple pawn move e.g., e2 to e4
        "r n b q k b n r\np p p p p p p p\n. . . . . . . .\n. . . . . . . .\n. . . . P . . .\n. . . . . . . .\nP P P P . P P P\nR N B Q K B N R",
        # Another simple move
        "r n b q k b n r\n. p p p p p p p\np . . . . . . .\n. . . . . . . .\n. . . . P . . .\n. . . . . . . .\nP P P P . P P P\nR N B Q K B N R",
    ]

    print("♟️  Terminal Chess Animation Starting...")
    time.sleep(FRAME_DELAY)

    for i, state in enumerate(board_states):
        clear_screen()
        print(f"🖼️  Frame {i + 1} of {len(board_states)}")
        print("-" * 17)
        for row in state.split("\n"):
            print(row.replace(" ", ""))  # Keep compact
        print("-" * 17)
        time.sleep(FRAME_DELAY)

    clear_screen()
    print("✅ Animation complete!")


if __name__ == "__main__":
    animate_board()
