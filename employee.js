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
        choices: ["View All Employees", "View All Departments", "View All Roles", "Add Employees", "Add Department", "Add Role", "Update Employee Roles", "Quit"]
    }).then((answer) => {
        if (answer.mainAction == "View All Employees"){
            getEmployees()
        }
        if (answer.mainAction == "View All Departments"){
            getDepartments()
        }
        if (answer.mainAction == "View All Roles"){
            getRoles()
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
            // updateEmployeeRole()
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
        start()
    })
}

const getDepartments = ()=> {
    //arguments (actual query statment that you want to make, callback)
    //interacting with a database is asynchronous
    connection.query('SELECT * FROM department', (err, data) => {
        if (err) throw err
        console.table(data)
        start()
    })
}

const getRoles = ()=> {
    //arguments (actual query statment that you want to make, callback)
    //interacting with a database is asynchronous
    connection.query('SELECT * FROM roles', (err, data) => {
        if (err) throw err
        console.table(data)
        start()
    })
}



const addEmployee = () => {
    inquirer.prompt([
        {
        name: "first_name",
        type: "input",
        message: "What is the employee's first name?",
        },
        {
        name: "last_name",
        type: "input",
        message: "What is the employee's last name?",
        },
        {
        name: "role_id",
        type: "list",
        message: "What is the employee's role?",
        default: "(use arrow keys)",
        choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead"]
        },
        {
        name: "manager_id",
        type: "input",
        message: "Who is the employees manager?",
        }
        // {
        // name: "manager_id",
        // type: "list",
        // message: "Who is the employee's manager?",
        // default: "(use arrow keys)",
        // choices: ["None", "Joe Sakic", "Adamn Deadmarsh", "Peter Forsberg"]
        // }
    ]).then((answer) => {
        connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: answer.role_id,
                manager_id: answer.manager_id
            },
                (err) => {
                    if (err) throw err;
                    console.log("The employee was created successfully.")
                    start()
                }
        )
    })
}

const addDepartment = () => {
    inquirer.prompt([
        {
        name: "department",
        type: "input",
        message: "What is the name of the department?",
        },
    ]).then((answer) => {
        connection.query(
            "INSERT INTO department SET ?",
            {
                department: answer.department
            },
                (err) => {
                    if (err) throw err;
                    console.log("The department was created successfully.")
                    start()
                }
        )
    })
}

const addRole = () => {
    inquirer.prompt([
        {
        name: "title",
        type: "input",
        message: "What is the role you would like to add?",
        },
        {
        name: "salary",
        type: "input",
        message: "What is the salary of this role?",
        },
    ]).then((answer) => {
        connection.query(
            "INSERT INTO roles SET ?",
            {
                title: answer.title,
                salary: answer.salary
            },
                (err) => {
                    if (err) throw err;
                    console.log("The department was created successfully.")
                    start()
                }
        )
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