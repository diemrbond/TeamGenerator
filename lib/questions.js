// Requirements
const logSymbols = require('log-symbols');
const ora = require("ora");
const Verifier = require("email-verifier");

// Variables
let throbberEmail;

// Function to verify email using email-verifier package
const verifyEmail = input => {

    return new Promise((resolve, reject) => {

        // API Key, free
        let verifier = new Verifier("at_4wu3dN8V7HIQYJbSKff20mf0fURwA");

        // Check email and return either error or true
        verifier.verify(input, error => {
            if (error) {
                reject(logSymbols.warning + " Please enter a valid EMAIL ADDRESS!");
            }
            // Stop looping throbber animation
            throbberEmail.stop();
            resolve(true);
        })
    })
}

// Manager Questions
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
        // Using the email-verifier package to check the email address
        validate: async input => {
            // Start throbbing animation
            throbberEmail = ora('Checking Valid Email...').start();
            try {
                return await verifyEmail(input);
            }
            catch (error) {
                return logSymbols.warning + " Please enter a valid EMAIL ADDRESS!"
            }
        }
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

// Engineer Questions
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
        // Using the email-verifier package to check the email address
        validate: async input => {
            // Start throbbing animation
            throbberEmail = ora('Checking Valid Email...').start();
            try {
                return await verifyEmail(input);
            }
            catch (error) {
                return logSymbols.warning + " Please enter a valid EMAIL ADDRESS!"
            }
        }
    },
    // GITHUB USERNAME
    {
        type: "input",
        message: "Please enter their GITHUB USERNAME",
        name: "github",
        suffix: " \n ",
        validate: value => value != "" ? true : logSymbols.warning + " Please enter a valid GITHUB ACCOUNT!"
    }
];

// Intern Questions
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
        // Using the email-verifier package to check the email address
        validate: async input => {
            // Start throbbing animation
            throbberEmail = ora('Checking Valid Email...').start();
            try {
                return await verifyEmail(input);
            }
            catch (error) {
                return logSymbols.warning + " Please enter a valid EMAIL ADDRESS!"
            }
        }
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

// Create a new employee question
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