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
        if(answer.mainAction == "Update Employee Roles") {
            updateEmployeeRole()
        } else(answer.mainAction == "Quit") 
            return 0
        
    })
}

//storing the value of the callback function within getData inside of getData
const getEmployees = ()=> {
    //arguments (actual query statment that you want to make, callback)
    //interacting with a database is asynchronous

    // need to select id, first_name, last_name, title, salary, manager
    // let query = "SELECT employee.first_name, employee.last_name, roles.title, roles.salary, employee.manager_id "
    // query += "FROM roles INNER JOIN department ON (roles.department_id = department.id) "
    // query += "INNER JOIN employee ON (employee.role_id = roles.id "
    // query += "LEFT JOIN employee manager ON (manager.id = employee.manager_id"


    connection.query('SELECT first_name, last_name FROM employee', (err, data) => {
        if (err) throw err
        console.table(data)
        start()
    })

    // 'SELECT * FROM employee'
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
    let query = "SELECT roles.title, roles.salary, department.department "
    query += "FROM roles INNER JOIN department ON roles.department_id = department.id"
    connection.query(query, (err, data) => {
        if (err) throw err
        console.table(data)
        start()
    })
    // 'SELECT * FROM roles'
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
        // {
        // name: "manager_id",
        // type: "input",
        // message: "Who is the employees manager?",
        // }
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

const updateEmployeeRole = () => {
    connection.query("SELECT * FROM employee", (err, results) =>{
        if (err) throw err;
        inquirer.prompt([
            {
            name: "choice",
            type: "rawlist",
            message: "Which employee's role do you want to update?",
            default: "(use arrow keys)",
            choices() {
                const choiceArray = [];
                results.forEach(({last_name}) => {
                    choiceArray.push(last_name);
                })
                return choiceArray;
                }
            }//,
            // {
            // name: "choice2",
            // type: "rawlist",
            // message: "Which role do you want to assign the selected employee ?",
            // default: "(use arrow keys)",
            // choices() {
            //     const choiceArray2 = [];
            //     results.forEach(({last_name}) => {
            //         choiceArray2.push(last_name);
            //     })
            //     return choiceArray2;
            //     }
            // }
        ]).then((answer) => {
            connection.query(
                "INSERT INTO employee SET ?",
                {
                    role_id: answer.choice2
                },
                    (err) => {
                        if (err) throw err;
                        console.log("The role was updated successfully.")
                        start()
                    }
            )
        })
    })
    // connection.query("SELECT * FROM roles", (err, results) =>{
    //     if (err) throw err;
    //     inquirer.prompt([
    //         {
    //         name: "choice2",
    //         type: "rawlist",
    //         message: "Which role do you want to assign the selected employee ?",
    //         default: "(use arrow keys)",
    //         choices() {
    //             const choiceArray2 = [];
    //             results.forEach(({last_name}) => {
    //                 choiceArray2.push(last_name);
    //             })
    //             return choiceArray2;
    //             }
    //         }
    //     ]).then((answer) => {
    //         connection.query(
    //             "INSERT INTO employee SET ?",
    //             {
    //                 role_id: answer.choice2
    //             },
    //                 (err) => {
    //                     if (err) throw err;
    //                     console.log("The role was updated successfully.")
    //                     start()
    //                 }
    //         )
    //     })
    // })
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