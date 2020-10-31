const Employee = require("./Employee");

class Engineer extends Employee {

    constructor(name, id, email, github){

        super(name, id, email);
        this.github = github;
        this.url = "../assets/img/coding.svg";

    }

    getRole(){
        return "Engineer";
    }

    getGithub(){
        return this.github;
    }

    getURL(){
        return this.url;
    }

}

module.exports = Engineer;