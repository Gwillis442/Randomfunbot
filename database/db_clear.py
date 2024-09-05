import sqlite3

conn = sqlite3.connect('messageCount.db')
cursor = conn.cursor()

# Execute and print results for each SELECT statement
tables = ['users', 'post_count', 'bag']

for table in tables:
    cursor.execute(f'delete from {table}')
    print(f"{table} cleared")
    print()  # Add a blank line for better readability

conn.commit()
conn.close()