import inquirer from "inquirer";
class ATM {
    balance;
    pinCode;
    constructor(initialBalance, pinCode) {
        this.balance = initialBalance;
        this.pinCode = pinCode;
    }
    checkBalance() {
        return this.balance;
    }
    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
            console.log(`Deposited ${amount} successfully.`);
        }
        else {
            console.log("Invalid deposit amount.");
        }
    }
    withdraw(amount) {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            console.log(`Withdrawn ${amount} successfully.`);
        }
        else {
            console.log("Insufficient funds or invalid withdrawal amount.");
        }
    }
    authenticate(pin) {
        return pin === this.pinCode;
    }
}
async function main() {
    const atm = new ATM(9985, 1111); // Starting balance of $9985 and PIN code 1111
    const { pin } = await inquirer.prompt({
        type: "password",
        message: "Enter your PIN code:",
        name: "pin",
    });
    if (!atm.authenticate(Number(pin))) {
        console.log("Incorrect PIN code. Exiting...");
        return;
    }
    console.log("Authenticated successfully!");
    const { action } = await inquirer.prompt({
        type: "list",
        message: "Choose an action:",
        choices: ["Check Balance", "Deposit", "Withdraw"],
        name: "action",
    });
    switch (action) {
        case "Check Balance":
            console.log("Current Balance:", atm.checkBalance());
            break;
        case "Deposit":
            const { depositAmount } = await inquirer.prompt({
                type: "number",
                message: "Enter deposit amount:",
                name: "depositAmount",
            });
            atm.deposit(depositAmount);
            break;
        case "Withdraw":
            const { withdrawAmount } = await inquirer.prompt({
                type: "number",
                message: "Enter withdrawal amount:",
                name: "withdrawAmount",
            });
            atm.withdraw(withdrawAmount);
            break;
        default:
            console.log("Invalid action.");
    }
}
main();
