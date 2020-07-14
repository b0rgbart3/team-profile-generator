// TODO: Write code to define and export the Employee class
const Employee = function(name, id, email, officeNumber) {
    this.name = name;
    this.id = id;
    this.email = email;
    this.officeNumber = officeNumber;
    this.role = "Employee";
};

// class Employee {
//     constructor(name, id, email, officeNumber) {
//         this.name = name;
//         this.id = id;
     
//         this.email = email;
//         this.officeNumber = officeNumber;
     
//     }
// }

Employee.prototype.getName = function() {
    return this.name;
}
Employee.prototype.getId = function() {
    return this.id;
}
Employee.prototype.getEmail = function() {
    return this.email;
}
Employee.prototype.getRole = function() {
    return this.role;
}
Employee.prototype.getOfficeNumber = function() {
    return this.officeNumber;
}


module.exports = Employee;
