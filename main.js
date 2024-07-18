#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Student {
    static counter = 100000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = []; // initialize
        this.balance = 100000;
    }
    // method to enroll student in a course
    enroll_course(course) {
        this.courses.push(course);
    }
    // method to view balance
    view_balance(insert) {
        this.balance += insert;
        console.log(`Balance for ${this.name}: $${this.balance}`);
    }
    // method to pay student fees
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`$${amount} Fees paid successfully for ${this.name}: Your remaining balance is $${this.balance}`);
    }
    // method to display status
    show_status() {
        console.log(`Id: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance: ${this.balance}`);
    }
}
// define a student manager class to manage students
class StudentManagement {
    students;
    constructor() {
        this.students = [];
    }
    // method to add new student
    newstudent(name) {
        let stu = new Student(name);
        this.students.push(stu);
        console.log(chalk.yellow(`Student ${name} added successfully. Student id: ${stu.id}`));
    }
    // method to enroll a student in a course
    enroll_student(student_id, course) {
        let student_find = this.find_student(student_id);
        if (student_find) {
            student_find.enroll_course(course);
            console.log(chalk.yellow(`${student_find.name} enrolled in ${course} successfully`));
        }
    }
    // method to view student balance
    view_student_balance(student_id) {
        let student_find = this.find_student(student_id);
        if (student_find) {
            student_find.view_balance(0); // assuming 'insert' was meant to add 0 to view the current balance
        }
        else {
            console.log(chalk.yellow("Student not found. Please enter a correct student Id."));
        }
    }
    // method to pay student fees
    pay_student_fees(student_id, amount) {
        let student_find = this.find_student(student_id);
        if (student_find) {
            student_find.pay_fees(amount);
        }
        else {
            console.log(chalk.yellow("Student not found. Please enter a correct student Id."));
        }
    }
    // method to display student status
    show_student_status(student_id) {
        let student_find = this.find_student(student_id);
        if (student_find) {
            student_find.show_status();
        }
    }
    // method to find student
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
async function main() {
    console.log(chalk.greenBright.bold.underline("Welcome to my - Student management system"));
    console.log("-".repeat(50));
    let Student_manager = new StudentManagement();
    // while loop to keep continue program
    while (true) {
        let choice = await inquirer.prompt([{
                name: "choices",
                type: "list",
                message: chalk.greenBright.bold.underline("Please select an option"),
                choices: [
                    { name: "Add student", value: "Add student" },
                    { name: "Enroll student", value: "Enroll student" },
                    { name: "View student balance", value: "View student balance" },
                    { name: "Pay fees", value: "Pay fees" },
                    { name: "Show status", value: "Show status" },
                    { name: "Exit", value: "Exit" },
                ]
            }]);
        // using switch case to select Option
        switch (choice.choices) {
            case "Add student":
                let name_Input = await inquirer.prompt([{
                        name: "Name",
                        type: "input",
                        message: chalk.blueBright("Enter a student name")
                    }]);
                Student_manager.newstudent(name_Input.Name);
                break;
            case "Enroll student":
                let course_Input = await inquirer.prompt([{
                        name: "student_id",
                        type: "number",
                        message: chalk.blueBright("Enter a student id")
                    },
                    {
                        name: "course",
                        type: "input",
                        message: chalk.blueBright("Enter a course name")
                    }
                ]);
                Student_manager.enroll_student(course_Input.student_id, course_Input.course);
                break;
            case "View student balance":
                let balance_input = await inquirer.prompt([{
                        name: "student_id",
                        type: "number",
                        message: chalk.blueBright("Enter a student id")
                    }]);
                Student_manager.view_student_balance(balance_input.student_id);
                break;
            case "Pay fees":
                let fees_input = await inquirer.prompt([{
                        name: "student_id",
                        type: "number",
                        message: chalk.blueBright("Enter a student id")
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: chalk.blueBright("Enter amount to pay")
                    }]);
                Student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "Show status":
                let status_input = await inquirer.prompt([{
                        name: "student_id",
                        type: "number",
                        message: chalk.blueBright("Enter a student id")
                    }]);
                Student_manager.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log(chalk.redBright("Exiting the program......."));
                process.exit();
        }
    }
}
main();
