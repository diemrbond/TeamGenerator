const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const templatesDir = path.resolve(__dirname, "templates");

const render = require("./lib/htmlRenderer");

// Constants and Variables
const employees = [];
const { managerQuestions, engineerQuestions, internQuestions, employeeQuestions, getGithubAvatar } = require("./lib/questions");

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
                    employee.url = getGithubAvatar();
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
                    addNew(managerQuestions, response.type);
                    break;

                case "Engineer":
                    addNew(engineerQuestions, response.type);
                    break;

                case "Intern":
                    addNew(internQuestions, response.type);
                    break;

                default:
                    createTeam();
                    break;
            }
        });
}

// Create team.html function
const createTeam = () => {

    console.log("");
    const throbber = ora('Generating team...').start();

    let renderHTML = render(employees);

    // Check if output directory exists
    if (!fs.existsSync(OUTPUT_DIR)){
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