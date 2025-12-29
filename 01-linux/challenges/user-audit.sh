#!/usr/bin/env bash

# user-audit.sh
# Audit local user accounts

PASSWD_FILE="/etc/passwd"
SHADOW_FILE="/etc/shadow"

echo "=== User Audit Report ==="

# Total users
TOTAL_USERS=$(wc -l < "$PASSWD_FILE")
echo "Total users: $TOTAL_USERS"

# Users with shell access (exclude nologin and false)
SHELL_USERS=$(awk -F: '$7 !~ /(nologin|false)$/ { print $1 ":" $7 }' "$PASSWD_FILE")
SHELL_USER_COUNT=$(echo "$SHELL_USERS" | wc -l)
echo "Users with shell access: $SHELL_USER_COUNT"

# Users without password
# In /etc/shadow:
#  - empty field means no password
#  - "!" or "*" means locked
NO_PASSWORD_USERS=$(awk -F: '$2 == "" { print $1 }' "$SHADOW_FILE" 2>/dev/null)
NO_PASSWORD_COUNT=$(echo "$NO_PASSWORD_USERS" | sed '/^$/d' | wc -l)

echo "Users without password: $NO_PASSWORD_COUNT"
for USER in $NO_PASSWORD_USERS; do
  echo "  - $USER"
done

# Last login info
echo "Last login info for shell users:"
while IFS=: read -r USER _; do
  LAST_LOGIN=$(lastlog -u "$USER" | awk 'NR==2 { print $4, $5, $6 }')
  if [[ -z "$LAST_LOGIN" || "$LAST_LOGIN" == "**Never logged in**" ]]; then
    LAST_LOGIN="Never logged in"
  fi
  echo "  - $USER: $LAST_LOGIN"
done <<< "$SHELL_USERS"
