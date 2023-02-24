const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

inquirer
  .prompt([
    {
      //manager questions
      type: "text",
      name: "name",
      message: "What is your name? ",
      validate: (name) => {
        if (name) {
          return true;
        } else {
          console.log("You must enter a name!");
          return false;
        }
      },
    },
    {
      type: "text",
      id: "id",
      message: "What is your id number? ",
      validate: (id) => {
        if (id) {
          return true;
        } else {
          console.log("You must enter an Id number!");
          return false;
        }
      },
    },
    {
      type: "text",
      name: "email",
      message: "What is your email Address? ",
      validate: (email) => {
        if (email) {
          return true;
        } else {
          console.log("You must enter an email address!");
          return false;
        }
      },
    },
    {
      type: "text",
      name: "officeNumber",
      message: "What is your office number? ",
      validate: (officeNumber) => {
        if (officeNumber) {
          return true;
        } else {
          console.log("You must enter an office number!");
          return false;
        }
      },
    },
  ])
  .then((response) => {
    // populate manager info
    const { name, id, email, officeNumber } = response;
    const manager = new Manager(name, id, email, officeNumber);
    employees.push(manager);
  });

const promptForNextEmployee = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What employee would you like to add? ",
        name: "role",
        choices: ["Engineer", "Intern"],
      },
      {
        type: "text",
        name: "name",
        message: "What is the name of the employee? ",
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log("You must enter a name!");
            return false;
          }
        },
      },
      {
        type: "text",
        name: "id",
        message: "What is the employee Id number? ",
        validate: (idInput) => {
          if (idInput) {
            return true;
          } else {
            console.log("You must enter an Id number! ");
            return false;
          }
        },
      },
      {
        type: "text",
        name: "email",
        message: "What is the email address of the employee?",
        validate: (emailInput) => {
          if (emailInput) {
            return true;
          } else {
            console.log("You need to enter an email!");
            return false;
          }
        },
      },
      {
        type: "text",
        name: "github",
        message: "What is GitHub username of employee?",
        when: (input) => input.role === "Engineer",
        validate: (github) => {
          if (github) {
            return true;
          } else {
            console.log("You need to enter a github username!");
            return false;
          }
        },
      },
      {
        type: "text",
        name: "school",
        message: "Where does the intern attend school?",
        when: (input) => input.role === "Intern",
        validate: (school) => {
          if (school) {
            return true;
          } else {
            console.log("You need to enter a school!");
            return false;
          }
        },
      },
      {
        type: "confirm",
        name: "confirmAddEmployee",
        message: "Would you like to add another employee?",
        default: false,
      },
    ])
    .then((response) => {
      // if engineer
      //    promptForEngineer
      // else if intern
      //    promptForIntern
      // else
      //    use the functionality from page-template to generate the team
    });
};

const promptForEngineer = () => {
  inquirer
    .prompt([
      {
        //engineer questions
      },
    ])
    .then((response) => {
      // add new engineer to employees array
      // promptForNextEmployee
    });
};

const promptForIntern = () => {
  inquirer
    .prompt([
      {
        //intern questions
      },
    ])
    .then((response) => {
      // add new intern to employees array
      // promptForNextEmployee
    });
};

const buildPage = () => {
  // render(myArrayOfTeamMembers)
};
