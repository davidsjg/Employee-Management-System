const mysql = require('mysql')


//need to create a connection configuration (passing in an object)
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Colorado23',
    database: 'employees_DB'
})

//create a function that is going to retrieve the data. READ

//storing the value of the callback function within getData inside of getData
const getData = ()=> {
    //arguments (actual query statment that you want to make, callback)
    //interacting with a database is asynchronous
    connection.query('SELECT * FROM employee', (err, data) => {
        if (err) throw err
        console.log(data)
    })

}

//take connnection config and connect
connection.connect((err) => {
    if(err) throw err
    console.log(`Connected at ${connection.threadId}`)
    getData()
    connection.end()
})