// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee.js");


const Intern = function(name, id, email, school, officeNumber) {
    this.name = name;
    this.id = id;
    this.email = email;
    this.officeNumber = 0;
    this.school = school;
    this.role = "Intern";
    this.officeNumber = officeNumber;
    };
    Intern.prototype = new Employee( this.name, this.id, this.email, this.officeNumber );
    

    Intern.prototype.getSchool = function() {
        return this.school;
    }

module.exports = Intern;

