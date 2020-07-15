// A software engineering team generator command line application,
// Built with node.js
//  The application will prompt the user for information about the team manager and then information about the team members. The user can input any number of team members, and they may be a mix of engineers and interns. When the user has completed building the team, the application will create an HTML file that displays a nicely formatted team roster based on the information provided by the user. 

// Include the necessary npm packages
// probably will require Inquirer, and fs

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");

const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// setup an array of questions to send to Inquirer
// This array will include:  Questions about the Manager
// A prompt about which type of team member they want to add
// - this also gives the user an opportunity to end the prompting cycle.
// Questions for each team member will include:  name, position, 
// email and github name

let projectNameQuestion = {name: "projectName", message: "What is the name of your project?", default:""};
// we ask the role question first because it will change the list of other questions to ask
let roleQuestion = { type: "list", name: "role", message:"What is this person's role in the project?", choices: [{name: "manager"},{name: "engineer"},{name: "intern"},]};

let employeeBasics = [
{ name: "name", message:"", default: "name", },
{ name: "email", message: "email", default: ""}, 
{ name: "github", message: "github", default: "github"},
{ name: "officeNumber", message: "officeNumber", default: "0"}];

let continueQuestion = { type: "confirm", name: "more", message: "\nAre there more employees to add to this project?"};

let employees = [];

async function main() {

    let moreEmployees = true;
    let employeeCount = 1;


// Use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

    let projectNameAnswer = await inquirer.prompt(projectNameQuestion);

    while (moreEmployees) {
        
        console.log("\nFor employee #" + employeeCount + ": -----------------------");

        let roleAnswer = await inquirer.prompt(roleQuestion);
        
        let employeeQuestions = employeeBasics;
        switch(roleAnswer.role) {
            case "manager": 
              employeeQuestions = employeeBasics;
              break;
            case "engineer": 
              // For Engineers we don't need an officeNumber
              employeeQuestions =[ employeeBasics[0],employeeBasics[1],employeeBasics[2]];
              break;
            case "intern": 
               // For Interns we don't need an officeNumber
               employeeQuestions =[ employeeBasics[0],employeeBasics[1],employeeBasics[2]];
               // but we do need to ask for the name of their school
               employeeQuestions.push( { name: "school", message:"What is the name of your school?", default: "" })
              break;
        }

    

        let employeeData = await inquirer.prompt(employeeQuestions);

        let thisEmployee = {};
        
        // Create different objects based on the role
        switch(roleAnswer.role) {
            case "manager":
                thisEmployee = new Manager(employeeData.name, employeeCount, employeeData.email, employeeData.officeNumber, employeeData.github);
                break;
            case "engineer":
                thisEmployee = new Engineer(employeeData.name, employeeCount, employeeData.email,  employeeData.github, employeeData.officeNumber);
                break;
            case "intern":
                thisEmployee = new Intern(employeeData.name, employeeCount, employeeData.email, employeeData.github, employeeData.officeNumber);
                break;
        }
        
       
        employees.push(thisEmployee); 
        moreEmployeesAnswer = await inquirer.prompt(continueQuestion);
        moreEmployees = moreEmployeesAnswer.more;
        employeeCount++;
    }

    // After the user has input all employees desired, call the `render` function (required
    // above) and pass in an array containing all employee objects; the `render` function will
    // generate and return a block of HTML including templated divs for each employee!
    let htmlBlock = render(employees, projectNameAnswer.projectName);
   // console.log(htmlBlock);

    // After you have your html, you're now ready to create an HTML file using the HTML
    // returned from the `render` function. Now write it to a file named `team.html` in the
    // `output` folder. You can use the variable `outputPath` above target this location.
    // Hint: you may need to check if the `output` folder exists and create it if it
    // does not.

    if (fs.existsSync("output")) {
        // Do something
        fs.writeFile("output/index.html", htmlBlock, function() {console.log('Done writing to file.'); });
    }

   
}

main();






// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

