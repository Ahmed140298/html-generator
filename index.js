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
const employees = [];

inquirer
  .prompt([
    {
      //manager questions
      type: "text",
      name: "name",
      message: "What is the team name? ",
    },
    {
      type: "text",
      id: "id",
      message: "What is your id number? ",
    },
    {
      type: "text",
      name: "email",
      message: "What is your email Address? ",
    },
    {
      type: "text",
      name: "officeNumber",
      message: "What is your office number? ",
    },
  ])
  .then(response => {
    // populate manager info
    const manager = new Manager(response.name, response.id, response.email, response.officeNumber);
    employees.push(manager);
    promptForNextEmployee();
  });

const promptForNextEmployee = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What employee would you like to add? ",
        name: "role",
        choices: ["Engineer ", "Intern ", "Done "],
      },
    ])
    .then(response => {
      // if engineer
      //    promptForEngineer
      // else if intern
      //    promptForIntern
      // else
      //    use the functionality from page-template to generate the team
      if (response.role === "Engineer") {
        promptForEngineer();
      } else if (response.role === "Intern") {
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
        type: "text",
        name: "name",
        message: "What is the name of the engineer? ",
      },
      {
        type: "text",
        name: "id",
        message: "What is the enginner's Id number? ",
      },
      {
        type: "text",
        name: "email",
        message: "What is the email address of the engineer? ",
      },
      {
        type: "text",
        name: "github",
        message: "What is GitHub username of engineer? ",
      },
    ])
    .then(response => {
      // add new engineer to employees array
      // promptForNextEmployee
      const engineer = new Engineer(response.name, response.id, response.email, response.github);
      employees.push(engineer);
      promptForNextEmployee();
    });
};

const promptForIntern = () => {
  inquirer
    .prompt([
      {
        //intern questions
          type: "text",
          name: "name",
          message: "What is the name of the intern? ",
        },
        {
          type: "text",
          name: "id",
          message: "What is the intern's Id number? ",
        },
        {
          type: "text",
          name: "email",
          message: "What is the email address of the intern? ",
        },
        {
          type: "text",
          name: "school",
          message: "Where does the intern attend school? ",
      },
    ])
    .then(response => {
      // add new intern to employees array
      // promptForNextEmployee
      const intern = new Intern(response.name, response.id, response.email, response.school);
      employees.push(intern);
      promptForNextEmployee();
    });
};

// const buildPage = () => {
//   // render(myArrayOfTeamMembers)
  
// };

// buildPage();