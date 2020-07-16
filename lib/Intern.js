// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee.js");

class Intern extends Employee {

    constructor(name, id, email, school) {
        super( name, id, email, 0);
        this.officeNumber = 0;
        this.school = school;
        this.role = "Intern";
    }

    getSchool() {
        return this.school;
    }


}
   // Intern.prototype = new Employee( this.name, this.id, this.email, this.officeNumber );
    

    // Intern.prototype.getSchool = function() {
    //     return this.school;
    // }

module.exports = Intern;

