const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const axios = require("axios");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const templatesDir = path.resolve(__dirname, "templates");

const render = require("./lib/htmlRenderer");

async function verifyGithub(input,which) {
    // API to search Github for the entered github name
    const queryUrl = `https://api.github.com/search/users?q=${input}`;

    // Call using Axios to Github
    response = await axios.get(queryUrl).then(function (res) {

        // Check there is at least 1 user that matches
        let totalResults = res.data.total_count;
        let loginName;

        // Check there is at least 1 result
        if (totalResults > 0) {
            loginName = res.data.items[0].login;
        }

        // If the user login is an exact match
        if ((totalResults > 0) && (loginName === input)) {

            let github_avatar = res.data.items[0].avatar_url;
            employees[which].url = github_avatar;

            // Return true back to promise                      
            return true;
        }

        // Return error back to promise
        return false;
    });

    return response;
}

// Constants and Variables
const employees = [];
const { managerQuestions, engineerQuestions, internQuestions, employeeQuestions } = require("./lib/questions");

// Additional Package Requirements
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const copyFileAsync = util.promisify(fs.copyFile);
const ora = require("ora");

// Function to create new employee types
const addNew = (which, type) => {

    console.log("");

    inquirer
        .prompt(which)
        .then(function (response) {

            let employee;

            switch (type) {
                case "Manager":
                    employee = new Manager(response.name, response.id, response.email, response.officeNumber);
                    employees.push(employee);
                    break;

                case "Engineer":
                    employee = new Engineer(response.name, response.id, response.email, response.github);
                    verifyGithub(response.github,employees.length);
                    employees.push(employee);
                    break;

                case "Intern":
                    employee = new Intern(response.name, response.id, response.email, response.school);
                    employees.push(employee);
                    break;
            }

            addEmployee();
        });
}

// Function to add an employee, prompt for type
const addEmployee = () => {

    console.log("");

    inquirer
        .prompt(employeeQuestions)
        .then(function (response) {

            switch (response.type) {
                case "Manager":
                    addNew([...managerQuestions], response.type);
                    break;

                case "Engineer":
                    addNew([...engineerQuestions], response.type);
                    break;

                case "Intern":
                    addNew([...internQuestions], response.type);
                    break;

                default:
                    createTeam();
                    break;
            }
        });
}

// Create team.html function
const createTeam = () => {
    console.log("Employees: " + employees);
    console.log("");
    const throbber = ora('Generating team...').start();

    let renderHTML = render(employees);

    // Check if output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }

    // Copy across the style sheet
    copyFileAsync(templatesDir + "/style.css", OUTPUT_DIR + "/style.css").then(function (error) {

        if (error) return console.log(error);

        console.log("");
        console.log("--> Copied style.css");

        // Write the file to the output path
        writeFileAsync(outputPath, renderHTML).then(function (error) {

            if (error) return console.log(error);

            console.log("--> Generating team.html")
            console.log("");
            console.log("Congratulations, your team has been created!");
            console.log(`--> Open file: ${outputPath}`)

            throbber.stop();
        });
    })
}

// Initialisation function
const init = () => {

    console.clear();

    console.log("\n////////////////////\n// TEAM GENERATOR //\n////////////////////\n");
    console.log("Please answer the following questions to complete your TEAM:");

    // Add a Manager by Default as the first entry
    addNew(managerQuestions, "Manager");
}

init();