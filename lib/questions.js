const logSymbols = require('log-symbols');
const axios = require("axios");
const ora = require("ora");
const validator = require("email-validator");

const verifyEmail = async input => {

    const Verifier = require("email-verifier");

    let verifier = new Verifier("at_4wu3dN8V7HIQYJbSKff20mf0fURwA");

    verifier.verify(input, (error, data) => {
        if (error) return "Please enter a valid number";
        console.log(data);
        return true;
    });
}

const managerQuestions = [

    // NAME
    {
        type: "input",
        message: "What is your MANAGER'S NAME?",
        name: "name",
        suffix: " \n ",
        validate: value => value != "" ? true : logSymbols.warning + " Please enter your MANAGER'S NAME!"
    },
    // ID
    {
        type: "input",
        message: "What is your MANAGER'S ID?",
        name: "id",
        suffix: " \n ",
        validate: value => value != "" ? true : logSymbols.warning + " Please enter your MANAGER'S ID!"
    },
    // EMAIL ADDRESS
    {
        type: "input",
        message: "What is their EMAIL ADDRESS?",
        name: "email",
        suffix: " \n ",
        // Using the email-validator to check the email address
        // validate: value => validator.validate(value) ? true : logSymbols.warning + " Please enter a valid EMAIL ADDRESS!"
        validate: input => verifyEmail(input) ? true : logSymbols.warning + " Please enter a valid EMAIL ADDRESS!"

    },
    // OFFICE NUMBER
    {
        type: "input",
        message: "What is their OFFICE NUMBER?",
        name: "officeNumber",
        suffix: " \n ",
        validate: value => value != "" ? true : logSymbols.warning + " Please enter their OFFICE NUMBER!"
    }
];

const engineerQuestions = [

    // NAME
    {
        type: "input",
        message: "What is your ENGINEER'S NAME?",
        name: "name",
        suffix: " \n ",
        validate: value => value != "" ? true : logSymbols.warning + " Please enter your ENGINEER'S NAME!"
    },
    // ID
    {
        type: "input",
        message: "What is your ENGINEER'S ID?",
        name: "id",
        suffix: " \n ",
        validate: value => value != "" ? true : logSymbols.warning + " Please enter your ENGINEER'S ID!"
    },
    // EMAIL ADDRESS
    {
        type: "input",
        message: "What is their EMAIL ADDRESS?",
        name: "email",
        suffix: " \n ",
        // Using the email-validator to check the email address
        validate: value => validator.validate(value) ? true : logSymbols.warning + " Please enter a valid EMAIL ADDRESS!"
    },
    // GITHUB USERNAME
    {
        type: "input",
        message: "Please enter their GITHUB USERNAME",
        name: "github",
        suffix: " \n ",
        validate: async (value) => {

            // Adds a loading animation while checking github
            const throbber = ora('Checking Github...').start();

            // API to search Github for the entered github name
            const queryUrl = `https://api.github.com/search/users?q=${value}`;

            // Call using Axios to Github
            const axiosResults = await axios.get(queryUrl).then(function (res) {

                // Check there is at least 1 user that matches
                let totalResults = res.data.total_count;
                let loginName;

                // Check there is at least 1 result
                if (totalResults > 0) {
                    loginName = res.data.items[0].login;
                }

                // If the user login is an exact match
                if ((totalResults > 0) && (loginName === value)) {

                    // Return true back to promise
                    return true;
                }

                // Return error back to promise
                return logSymbols.warning + " Please enter a valid GITHUB USERNAME!";
            });

            // Stop the loading animation
            throbber.stop();

            // Return result back to inquirer
            return axiosResults;
        }
    }
];

const internQuestions = [

    // NAME
    {
        type: "input",
        message: "What is your INTERN'S NAME?",
        name: "name",
        suffix: " \n ",
        validate: value => value != "" ? true : logSymbols.warning + " Please enter your INTERN'S NAME!"
    },
    // ID
    {
        type: "input",
        message: "What is your INTERN'S ID?",
        name: "id",
        suffix: " \n ",
        validate: value => value != "" ? true : logSymbols.warning + " Please enter your INTERN'S ID!"
    },
    // EMAIL ADDRESS
    {
        type: "input",
        message: "What is their EMAIL ADDRESS?",
        name: "email",
        suffix: " \n ",
        // Using the email-validator to check the email address
        validate: value => validator.validate(value) ? true : logSymbols.warning + " Please enter a valid EMAIL ADDRESS!"
    },
    // OFFICE NUMBER
    {
        type: "input",
        message: "What is their SCHOOL?",
        name: "school",
        suffix: " \n ",
        validate: value => value != "" ? true : logSymbols.warning + " Please enter their SCHOOL!"
    }
];

const employeeQuestions = [

    // NEW EMPLOYEE
    {
        type: "list",
        message: "What TEAM MEMBER TYPE would you like to add?",
        name: "type",
        suffix: " \n ",
        choices: ["Manager", "Engineer", "Intern", "None, Team Complete"]
    }

];

module.exports = {
    managerQuestions,
    engineerQuestions,
    internQuestions,
    employeeQuestions
}