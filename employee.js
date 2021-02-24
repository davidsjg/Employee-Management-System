const mysql = require('mysql')
const inquirer = require('inquirer')
require ('console.table')

//need to create a connection configuration (passing in an object
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Colorado23',
    database: 'employees_DB'
})


const start = () => {
    inquirer.prompt({
        name: "mainAction",
        type: "list",
        message: "What would you like to do?",
        default: "(use arrow keys)",
        choices: ["View All Employees", "View All Employees by Department", "View All Employees by Manager", "Add Employees", "Add Department", "Add Role", "Update Employee Roles", "Quit"]
    }).then((answer) => {
        if (answer.mainAction == "View All Employees"){
            getEmployees()
        }
        if (answer.mainAction == "View All Departments"){
            getEmployeesDept()
        }
        if (answer.mainAction == "View All Roles"){
            getEmployeesDept()
        }
        if (answer.mainAction == "Add Employees"){
            addEmployee()
        }
        if (answer.mainAction == "Add Department"){
            addDepartment()
        }
        if (answer.mainAction == "Add Role"){
            addRole()
        }
        else {
            updateEmployeeRole()
        }
        

    })
}

//storing the value of the callback function within getData inside of getData
const getEmployees = ()=> {
    //arguments (actual query statment that you want to make, callback)
    //interacting with a database is asynchronous
    connection.query('SELECT * FROM employee', (err, data) => {
        if (err) throw err
        console.table(data)
    })

}

// const updateEmployee = () => {
//     console.log("Updating employee") 
//     const query = connection.query(
//         "UPDATE employees SET ? WHERE ?"
//     )


// }


// const getEmployeeName = () => {
//     connection.query(
//         "SELECT * FROM employees WHERE "
//     )

// }



// const addEmployee = () => {
//     const query = connection.query(
//         "INSERT INTO employee SET ?",
//         {
//             //USER ENTERED EMPLOYEE OBJECT
//         },
//         (err, res) => {
//             if (err) throw err
//             console.log(`${res.affectedRows} employee inserted\n`)
//             updateEmployees()
//         }
//     )
// }

//take connnection config and connect
connection.connect((err) => {
    if(err) throw err
    console.log(`Connected at ${connection.threadId}`)
    // getEmployees()
    start()
})   