#!/usr/bin/env python3

import os
import sys
import platform
import subprocess
import shutil
import shlex

USE_COLOR = sys.stdout.isatty()

def color(text, fg="red"):
    if not USE_COLOR:
        return text
    codes = {
        "red": "\033[91m",
        "green": "\033[92m",
        "yellow": "\033[93m",
        "cyan": "\033[96m",
        "bold": "\033[1m",
        "end": "\033[0m",
    }
    return f"{codes.get(fg, '')}{text}{codes['end']}"

def safe_print(text):
    try:
        print(text)
    except UnicodeEncodeError:
        print(text.encode('ascii', errors='replace').decode('ascii'))

def run_command(command, label, help_msg=None):
    print(f"\n{color('=== Running:', 'cyan')} {label}")
    try:
        subprocess.run(command, check=True)
    except subprocess.CalledProcessError as e:
        print(f"\n{color('❌ Failed:', 'red')} {label}")
        if help_msg:
            print(f"{color('💡 Tip:', 'yellow')} {help_msg}")
        sys.exit(e.returncode)

def ensure_command_exists(cmd, install_tip=None):
    path = shutil.which(cmd)
    if path is None:
        print(f"{color('❌ Error:', 'red')} '{cmd}' is not installed or not in PATH.")
        if install_tip:
            print(f"{color('💡 Tip:', 'yellow')} {install_tip}")
        sys.exit(1)
    return path

def safe_checkmark():
    if platform.system() == "Windows" and not os.environ.get("WT_SESSION"):
        return "[OK]"
    return "✅"

def main():
    npm_cmd = os.environ.get("NPM_CMD", "npm")
    npx_cmd = os.environ.get("NPX_CMD", "npx")
    test_cmd = os.environ.get("TEST_CMD", "lerna run test -- --run")

    npm_cmd = ensure_command_exists("npm", "Install Node.js from https://nodejs.org/")
    npx_cmd = ensure_command_exists("npx")

    run_command([npm_cmd, "ci"], "npm ci", "Make sure your package.json and lock file are valid.")

    run_command([npx_cmd] + shlex.split(test_cmd), test_cmd, "Try running the test command manually to debug.")

    safe_print(f"\n{color(f'{safe_checkmark()} All tests passed successfully!', 'green')}")

if __name__ == "__main__":
    main()
