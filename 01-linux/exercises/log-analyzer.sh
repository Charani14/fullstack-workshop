#!/bin/bash

# Check if argument is provided
if [ $# -eq 0 ]; then
    echo "Usage: ./log-analyzer.sh <log_file_path>"
    exit 1
fi

LOG_FILE=$1

# Check if file exists
if [ ! -f "$LOG_FILE" ]; then
    echo "Error: File '$LOG_FILE' does not exist."
    exit 1
fi

# Count total lines
TOTAL_LINES=$(wc -l < "$LOG_FILE")

# Count log levels
ERROR_COUNT=$(grep -c "ERROR" "$LOG_FILE")
WARNING_COUNT=$(grep -c "WARNING" "$LOG_FILE")
INFO_COUNT=$(grep -c "INFO" "$LOG_FILE")

# Extract unique IP addresses
IP_ADDRESSES=$(grep -Eo '([0-9]{1,3}\.){3}[0-9]{1,3}' "$LOG_FILE" | sort -u)

# Print formatted report
echo "        LOG ANALYSIS REPORT        "
echo "Log File        : $LOG_FILE"
echo "Total Lines     : $TOTAL_LINES"
echo "ERROR Count     : $ERROR_COUNT"
echo "WARNING Count   : $WARNING_COUNT"
echo "INFO Count      : $INFO_COUNT"
echo "Unique IP Addresses:"
if [ -z "$IP_ADDRESSES" ]; then
    echo "None found"
else
    echo "$IP_ADDRESSES"
fi
