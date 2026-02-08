#!/usr/bin/env python3
"""Query the todos SQLite database offline."""

import sqlite3
import sys
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "data", "todos.db")


def main():
    if not os.path.exists(DB_PATH):
        print(f"Database not found: {DB_PATH}")
        sys.exit(1)

    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row

    if len(sys.argv) > 1:
        query = " ".join(sys.argv[1:])
        try:
            cursor = conn.execute(query)
            rows = cursor.fetchall()
            for row in rows:
                print(dict(row))
        except sqlite3.Error as e:
            print(f"SQL error: {e}")
            sys.exit(1)
    else:
        cursor = conn.execute("SELECT * FROM todos")
        rows = cursor.fetchall()
        if not rows:
            print("No todos found.")
        else:
            print(f"{'ID':<6}{'Completed':<12}{'Title'}")
            print("-" * 40)
            for row in rows:
                status = "Yes" if row["completed"] else "No"
                print(f"{row['id']:<6}{status:<12}{row['title']}")
            print(f"\nTotal: {len(rows)} todo(s)")

    conn.close()


if __name__ == "__main__":
    main()
