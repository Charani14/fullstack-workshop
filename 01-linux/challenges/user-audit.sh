#!/bin/bash
set -e

# Script to audit users on the system
# Usage: ./user-audit.sh <username>

if [ $# -ne 1 ]; then
  echo "Usage: $0 <username>"
  exit 1
fi

USERNAME="$1"

# Check if user exists
if id "$USERNAME" &>/dev/null; then
  echo "User '$USERNAME' exists."

  # Show user details
  echo "User details:"
  id "$USERNAME"

  # Show last login
  echo "Last login:"
  last "$USERNAME" | head -n 1
else
  echo "User '$USERNAME' does not exist."
  exit 1
fi
