const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Constants and Variables
const employees = [];
const { managerQuestions, engineerQuestions, internQuestions, employeeQuestions } = require("./lib/questions");

// Additional Package Requirements
const util = require("util");
// const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

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

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

const createTeam = () => {

    let renderHTML = render(employees);

    // Check if 
    if (!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR);
    }

    writeFileAsync(outputPath, renderHTML).then(function (error) {

        if (error) return console.log(error);

        console.log("");
        console.log("Congratulations, your team has been created!");
        console.log(`--> Open file: ${outputPath}`)
    });
}

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

const init = () => {

    console.clear();

    console.log("OUTPUT_DIR: "+OUTPUT_DIR);
    console.log("outputPath: "+outputPath);

    console.log("\n////////////////////\n// TEAM GENERATOR //\n////////////////////\n");
    console.log("Please answer the following questions to complete your TEAM:");

    // Add a Manager by Default as the first entry
    addNew(managerQuestions, "Manager");
}

init();