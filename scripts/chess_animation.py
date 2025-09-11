#!/usr/bin/env python3

"""
This module provides functions to animate a simple chess board in the terminal.
It includes functionality to clear the screen and display a sequence of board
states as an animation.
"""

import os
import time

FRAME_DELAY = 1  # delay in seconds between frames


def clear_screen():
    """
    Clear the terminal screen in a cross-platform way.

    This function attempts to clear the terminal using system commands
    for Windows (cls) and macOS/Linux (clear). If those fail, it uses
    an ANSI escape sequence as a fallback.

    Returns:
        None
    """
    # Clears the terminal screen in a cross-platform way
    try:
        if os.name == "nt":
            os.system("cls")  # Windows
        else:
            os.system("clear")  # macOS/Linux
    except Exception:
        print("\033[H\033[J", end="")  # ANSI escape sequence fallback


def animate_board():
    """
    Animate a sequence of chess board states in the terminal.

    This function prints a series of predefined board states, clearing
    the screen and inserting delays between frames to create an animation
    effect.

    Returns:
        None
    """
    board_states = [
        # Initial board
        "r n b q k b n r\np p p p p p p p\n. . . . . . . .\n. . . . . . . .\n. . . . . . . .\n. . . . . . . .\nP P P P P P P P\nR N B Q K B N R",  # noqa: E501
        # Simple pawn move e.g., e2 to e4
        "r n b q k b n r\np p p p p p p p\n. . . . . . . .\n. . . . . . . .\n. . . . P . . .\n. . . . . . . .\nP P P P . P P P\nR N B Q K B N R",  # noqa: E501
        # Another simple move
        "r n b q k b n r\n. p p p p p p p\np . . . . . . .\n. . . . . . . .\n. . . . P . . .\n. . . . . . . .\nP P P P . P P P\nR N B Q K B N R",  # noqa: E501
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
