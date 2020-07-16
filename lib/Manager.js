// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee.js");

//Engineer.prototype = new Employee(name, "Engineer", email, github);

class Manager extends Employee {

        constructor(name, id, email, officeNumber, github) {

            super(name, id, email, officeNumber );

            this.github = github;
            this.role = "Manager";
        }
}

// const Manager = function(name, id, email, officeNumber, github ) {
// this.name = name;
// this.id = id;
// this.email = email;
// this.officeNumber = officeNumber;
// this.role = "Manager";
// this.github = github;
// };
// Manager.prototype = new Employee( this.name, this.id, this.email, this.officeNumber );

module.exports = Manager;