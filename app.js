// A software engineering team generator command line application,
// Built with node.js
//  The application will prompt the user for information about the team manager and then information about the team members. The user can input any number of team members, and they may be a mix of engineers and interns. When the user has completed building the team, the application will create an HTML file that displays a nicely formatted team roster based on the information provided by the user. 

// Include the necessary npm packages
// probably will require Inquirer, and fs

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");

// setup an array of questions to send to Inquirer
// This array will include:  Questions about the Manager
// A prompt about which type of team member they want to add
// - this also gives the user an opportunity to end the prompting cycle.
// Questions for each team member will include:  name, position, 
// email and github name

// Rather than assuming there is only one manager - let's ask the user
// How many managers there are on this project and that way there can
// be more than one.

let q1 = {name: "employeeCount",message: "\nHow many people are there on this project?",
        default: "1"};

let employeeBasics = [
{ type: "list", name: "role", message:"What is this person's role in the project?", choices: [{name: "manager"},{name: "engineer"},{name: "intern"},]},
{ name: "name", message:"", default: "name", },
{ name: "email", message: "email", default: ""}, 
{ name: "github", message: "github", default: "github"},
{ name: "officeNumber", message: "officeNumber", default: "0"}];

let employees = [];
let employeeCount = 0;

async function main() {
    let employeeCount = await inquirer.prompt(q1);
    
    console.log(employeeCount);
    employeeCount = parseInt(employeeCount.employeeCount); 
    console.log(employeeCount);

    for (var i = 1; i < employeeCount+1; i++) {
        console.log("\nFor employee #" + i + ": -----------------------\n");
        let employeeData = await inquirer.prompt(employeeBasics);

        let thisEmployee = {};
        
        switch(employeeData.role) {
            case "manager":
                thisEmployee = new Manager(employeeData.name, i-1, employeeData.email, employeeData.officeNumber, employeeData.github);
                break;
            case "engineer":
                thisEmployee = new Engineer(employeeData.name, i-1, employeeData.email,  employeeData.github, employeeData.officeNumber);
                break;
            case "intern":
                thisEmployee = new Intern(employeeData.name, i-1, employeeData.email, employeeData.github, employeeData.officeNumber);
                break;
        }
        
       
        

        employees.push(thisEmployee);  // add each manager to an array of managers

    }

    console.log(employees);
    
}

main();



// const path = require("path");
// const fs = require("fs");

// const OUTPUT_DIR = path.resolve(__dirname, "output");
// const outputPath = path.join(OUTPUT_DIR, "team.html");

// const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

