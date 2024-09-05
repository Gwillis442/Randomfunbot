// Exported: update_Database

function update_Database(db, table, row, value) {
  db.run(`UPDATE ${table} SET ${row} = ${value}`, function(err) {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`Row(s) updated: ${this.changes}`);
    }  
  });
}

module.exports = { update_Database };