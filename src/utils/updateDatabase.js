// Exported: update_Database

// update the passed database table with the passed row and value
// db: the database to update
// table: the table to update
// row: the row to update
// value: the value to update the row with

function update_Database(db, table, row, value, user) {
  db.run(`UPDATE ${table} SET ${row} = ${value} WHERE user_id = ${user}`, function(err) {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`Row(s) updated: ${this.changes}`);
    }  
  });
}

module.exports = { update_Database };