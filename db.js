const mysql = require('mysql')

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root123',
    database: 'organ_donation'
})

connection.connect(function(err) {
    if (err)
        throw err

    console.log('Database connected!')
})

module.exports = connection