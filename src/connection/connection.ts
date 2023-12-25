var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'astro_db',
  multipleStatements: true
})

connection.connect((err: any) => {
  if (err) throw err
  // console.log(`Started server at http://localhost:3000!`)
})

module.exports = connection;