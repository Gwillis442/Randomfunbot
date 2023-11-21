const oracledb = require('oracledb');
const { user, password, connectString } = require('./config.json');

const dbConfig = {
  user: user,
  password: password,
  connectString: connectString, // Format: host:port/service_name
};

// Connect to the Oracle Database
oracledb.getConnection(dbConfig, (err, connection) => {
  if (err) {
    console.error('Error connecting to Oracle Database:', err.message);
    return;
  }
  console.log('Connected to Oracle Database');

  // Use the 'connection' object to perform database operations

  // Don't forget to release the connection when done
  connection.release((err) => {
    if (err) {
      console.error('Error releasing Oracle Database connection:', err.message);
    }
  });
});
