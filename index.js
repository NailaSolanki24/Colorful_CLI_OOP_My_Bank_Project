#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.redBright.bold.italic("\n\t=====> Welcome To Naila Solanki's CLI OOP MyBank Project.<=====\n"));
//Bank Account Class.
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    //Debit Money.
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(chalk.red.bold(`\nWithdrawal of $${amount} successful. Remaining balance: $${this.balance}`));
        }
        else {
            console.log(chalk.green.bold("\nInsufficient Balance."));
        }
    }
    //Credit Money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; //$1 fee charged if more than $100 is deposited.
        }
        this.balance += amount;
        console.log(chalk.green.bold(`\nDeposit of $${amount} successful. Remaining balance: $${this.balance}`));
    }
    //Check Balance.
    checkBalance() {
        console.log(chalk.redBright.bold(`\nCurrent balance: $${this.balance}`));
    }
}
//Customer Class.
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
//Create Bank Account.
const accounts = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000),
];
//Create Customers.
const customers = [
    new Customer("Talha", "Solanki", "Male", 32, 3212233445, accounts[0]),
    new Customer("Asfhan", "Chohan", "Male", 25, 3213344556, accounts[1]),
    new Customer("Uzair", "Khatri", "Male", 36, 3214455667, accounts[2]),
];
//Function to interact with bank account.
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accontNumber",
            type: "number",
            message: (chalk.blueBright.bold("\nEnter your account number:")),
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accontNumber);
        if (customer) {
            console.log(chalk.greenBright.bold(`\nWelcome, ${customer.firstName} ${customer.lastName}!\n`));
            const ans = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: (chalk.magenta.bold("\nSelect an Operation")),
                    choices: ["Deposit", "Withdraw", "Check Balance", "Exit"],
                },
            ]);
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: (chalk.magentaBright.bold("\nEnter the amount to deposit:")),
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: (chalk.yellow.bold("\nEnter the amount to withdraw:")),
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log(chalk.bgGreenBright.bold("\nExiting bank program..."));
                    console.log(chalk.bgRedBright.bold("\n Thank you for using our bank services. Have a great day!"));
                    return;
            }
        }
        else {
            console.log(chalk.bgBlueBright.bold("\nInvalid account number. Please try again."));
        }
    } while (true);
}
service();
