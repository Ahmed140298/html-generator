const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const employees = [];

inquirer
  .prompt([
    {
      //manager questions
      type: "input",
      message: "What is the team name? ",
      name: "name",
    },
    {
      type: "input",
      message: "What is your id number? ",
      name: "id",
    },
    {
      type: "input",
      message: "What is your email Address? ",
      name: "email",
    },
    {
      type: "input",
      message: "What is your office number? ",
      name: "officeNumber",
    },
  ])
  .then((response) => {
    // populate manager info
    const manager = new Manager(
      response.name,
      response.id,
      response.email,
      response.officeNumber
    );
    employees.push(manager);
    promptForNextEmployee();
  });

const promptForNextEmployee = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What employee would you like to add? ",
        name: "newMemeber",
        choices: ["Engineer ", "Intern ", "Done "],
      },
    ])
    .then((response) => {
      if (response.newMemeber === "Engineer") {
        promptForEngineer();
      } else if (response.newMemeber === "Intern") {
        promptForIntern();
      } else {
        fs.writeFile(outputPath, render(employees), (err) => err ? console.error(err) : console.log('Successfully generated team.html'));
      }
    });
};

const promptForEngineer = () => {
  inquirer
    .prompt([
      {
        //engineer questions
        type: "input",
        message: "What is the name of the engineer? ",
        name: "name",
      },
      {
        type: "input",
        message: "What is the enginner's Id number? ",
        name: "id",
      },
      {
        type: "input",
        message: "What is the email address of the engineer? ",
        name: "email",
      },
      {
        type: "input",
        message: "What is GitHub username of engineer? ",
        name: "github",
      },
    ])
    .then((response) => {
      // add new engineer to employees array
      // promptForNextEmployee
      const engineer = new Engineer(
        response.name,
        response.id,
        response.email,
        response.github
      );
      employees.push(engineer);
      promptForNextEmployee();
    });
};

const promptForIntern = () => {
  inquirer
    .prompt([
      {
        //intern questions
        type: "input",
        message: "What is the name of the intern? ",
        name: "name",
      },
      {
        type: "input",
        message: "What is the intern's Id number? ",
        name: "id",
      },
      {
        type: "input",
        message: "What is the email address of the intern? ",
        name: "email",
      },
      {
        type: "input",
        message: "Where does the intern attend school? ",
        name: "school",
      },
    ])
    .then((response) => {
      // add new intern to employees array
      // promptForNextEmployee
      const intern = new Intern(
        response.name,
        response.id,
        response.email,
        response.school
      );
      employees.push(intern);
      promptForNextEmployee();
    });
};
