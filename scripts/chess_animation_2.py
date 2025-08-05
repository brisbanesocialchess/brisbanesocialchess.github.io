#!/usr/bin/env python3

import os
import time

# --- Configuration ---
ANIMATION_DURATION_SECONDS = 10
FRAME_DELAY_SECONDS = 2  # Time each board state is displayed

# --- Unicode Chess Pieces ---
WHITE_PAWN = "♙"
WHITE_ROOK = "♖"
WHITE_KNIGHT = "♘"
WHITE_BISHOP = "♗"
WHITE_QUEEN = "♕"
WHITE_KING = "♔"

BLACK_PAWN = "♟"
BLACK_ROOK = "♜"
BLACK_KNIGHT = "♞"
BLACK_BISHOP = "♝"
BLACK_QUEEN = "♛"
BLACK_KING = "♚"

EMPTY_SQUARE = " "

# --- Initial Chess Board State ---
# The board is represented as an 8x8 list of lists.
# Row 0 is rank 8, Row 7 is rank 1.
# Column 0 is file 'a', Column 7 is file 'h'.
initial_board = [
    [
        BLACK_ROOK,
        BLACK_KNIGHT,
        BLACK_BISHOP,
        BLACK_QUEEN,
        BLACK_KING,
        BLACK_BISHOP,
        BLACK_KNIGHT,
        BLACK_ROOK,
    ],
    [
        BLACK_PAWN,
        BLACK_PAWN,
        BLACK_PAWN,
        BLACK_PAWN,
        BLACK_PAWN,
        BLACK_PAWN,
        BLACK_PAWN,
        BLACK_PAWN,
    ],
    [
        EMPTY_SQUARE,
        EMPTY_SQUARE,
        EMPTY_SQUARE,
        EMPTY_SQUARE,
        EMPTY_SQUARE,
        EMPTY_SQUARE,
        EMPTY_SQUARE,
        EMPTY_SQUARE,
    ],
    [
        EMPTY_SQUARE,
        EMPTY_SQUARE,
        EMPTY_SQUARE,
        EMPTY_SQUARE,
        EMPTY_SQUARE,
        EMPTY_SQUARE,
        EMPTY_SQUARE,
        EMPTY_SQUARE,
    ],
    [
        EMPTY_SQUARE,
        EMPTY_SQUARE,
        EMPTY_SQUARE,
        EMPTY_SQUARE,
        EMPTY_SQUARE,
        EMPTY_SQUARE,
        EMPTY_SQUARE,
        EMPTY_SQUARE,
    ],
    [
        EMPTY_SQUARE,
        EMPTY_SQUARE,
        EMPTY_SQUARE,
        EMPTY_SQUARE,
        EMPTY_SQUARE,
        EMPTY_SQUARE,
        EMPTY_SQUARE,
        EMPTY_SQUARE,
    ],
    [
        WHITE_PAWN,
        WHITE_PAWN,
        WHITE_PAWN,
        WHITE_PAWN,
        WHITE_PAWN,
        WHITE_PAWN,
        WHITE_PAWN,
        WHITE_PAWN,
    ],
    [
        WHITE_ROOK,
        WHITE_KNIGHT,
        WHITE_BISHOP,
        WHITE_QUEEN,
        WHITE_KING,
        WHITE_BISHOP,
        WHITE_KNIGHT,
        WHITE_ROOK,
    ],
]


# --- Helper Functions ---


def clear_terminal():
    """Clears the terminal screen for animation."""
    os.system("cls" if os.name == "nt" else "clear")


def print_board(board, move_description="Initial Board"):
    """Prints the chess board to the terminal with coordinates."""
    clear_terminal()
    print(f"--- Chess Animation: {move_description} ---")
    print("  a b c d e f g h")
    print(" -----------------")
    for i, row in enumerate(board):
        # Print rank number (8 down to 1)
        print(f"{8 - i}|", end="")
        for piece in row:
            print(f"{piece} ", end="")
        print(f"|{8 - i}")
    print(" -----------------")
    print("  a b c d e f g h")
    print(
        f"\nAnimation will run for {ANIMATION_DURATION_SECONDS} seconds. Press Ctrl+C to exit."
    )


def make_move(board, from_row, from_col, to_row, to_col):
    """
    Applies a move to the board.
    Note: This is a simplified move function and does not validate chess rules.
    """
    piece = board[from_row][from_col]
    board[from_row][from_col] = EMPTY_SQUARE
    board[to_row][to_col] = piece


# --- Animation Sequence ---
# Each tuple represents a move: (from_rank, from_file, to_rank, to_file, description)
# Ranks are 1-8, Files are 'a'-'h'.
# We convert these to 0-7 array indices internally.
# Remember: board row 0 = rank 8, row 7 = rank 1.
#            board col 0 = file 'a', col 7 = file 'h'.
animation_moves = [
    # White Pawn e2 to e4
    {"from_rank": 2, "from_file": "e", "to_rank": 4, "to_file": "e", "desc": "1. e4"},
    # Black Pawn d7 to d5
    {"from_rank": 7, "from_file": "d", "to_rank": 5, "to_file": "d", "desc": "1... d5"},
    # White Knight g1 to f3
    {"from_rank": 1, "from_file": "g", "to_rank": 3, "to_file": "f", "desc": "2. Nf3"},
    # Black Knight b8 to c6
    {
        "from_rank": 8,
        "from_file": "b",
        "to_rank": 6,
        "to_file": "c",
        "desc": "2... Nc6",
    },
    # White Rook a1 to a3
    {"from_rank": 1, "from_file": "a", "to_rank": 3, "to_file": "a", "desc": "3. Ra3"},
]


def file_to_col(file_char):
    """Converts a file character ('a'-'h') to a 0-7 column index."""
    return ord(file_char.lower()) - ord("a")


def rank_to_row(rank_num):
    """Converts a rank number (1-8) to a 0-7 row index."""
    return 8 - rank_num


# --- Main Animation Loop ---
def run_animation():
    """Runs the chess animation for the specified duration."""
    current_board = [row[:] for row in initial_board]  # Create a copy to modify
    start_time = time.time()
    move_index = 0

    try:
        while (time.time() - start_time) < ANIMATION_DURATION_SECONDS:
            if move_index >= len(animation_moves):
                # If all moves are played, reset to initial board or loop
                # For a 10-second animation with 5 moves at 2s/move, this won't be hit
                # unless ANIMATION_DURATION_SECONDS is much longer.
                # For continuous loop, uncomment:
                # current_board = [row[:] for row in initial_board]
                # move_index = 0
                break  # Exit after all moves are played if duration allows

            move_data = animation_moves[move_index]

            # Print current board state before applying the move
            print_board(current_board, move_data["desc"])
            time.sleep(FRAME_DELAY_SECONDS)  # Display current state for a moment

            # Apply the move
            from_row = rank_to_row(move_data["from_rank"])
            from_col = file_to_col(move_data["from_file"])
            to_row = rank_to_row(move_data["to_rank"])
            to_col = file_to_col(move_data["to_file"])

            make_move(current_board, from_row, from_col, to_row, to_col)

            move_index += 1

        # Display the final state after the last move
        if move_index > 0:  # Only if at least one move was made
            print_board(current_board, "Animation End")
        else:  # If no moves were made (e.g., duration too short)
            print_board(initial_board, "Animation End (No moves played)")
        print("\nAnimation finished!")

    except KeyboardInterrupt:
        print("\nAnimation interrupted by user. Exiting.")
    finally:
        # Ensure terminal is clear and cursor is at a new line
        print("\n")


if __name__ == "__main__":
    run_animation()
