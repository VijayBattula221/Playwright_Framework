const { executeStep, executeStepWithLogging } = require('../utils/newUtil');
const { expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
const { error } = require('console');
const { default: logger } = require('../utils/LoggerUtil');
const firstName = faker.person.firstName();
const middleName = faker.person.middleName()
const lastName = faker.person.lastName();
import { handleEncryption } from '../utils/EncryptEnvFile';

// import logger from '../utils/LoggerUtil';

require('dotenv').config();
exports.AddEmployee = class AddEmployee {
    constructor(page, test) {
        this.page = page;
        this.test = test;
        this.PIM = page.locator("//span[text()='PIM']")
        this.addButton = page.locator("//button[text()=' Add ']")
        this.fName = page.locator('//input[@name="firstName"]');
        this.mName = page.locator('//input[@name="middleName"]');
        this.lName = page.locator('//input[@name="lastName"]');
        this.createLoginDetailsCheckbox = page.locator('(//input[@type="checkbox"])[1]')
        this.saveBtn = page.locator("//button[text()=' Save ']")

    }
    addingNewEmployee = async () => {
        await executeStepWithLogging(this.test, this.PIM, 'click', 'clicking on PIM');
        await executeStepWithLogging(this.test, this.addButton, 'click', 'clicking on add button');
        await executeStepWithLogging(this.test, this.fName, 'fill', 'enterning first name', [firstName]);
        await executeStepWithLogging(this.test, this.mName, 'fill', 'enterning middle name', [middleName]);
        await executeStepWithLogging(this.test, this.lName, 'fill', 'enterning last name', [lastName]);
        // await executeStep(this.test, this.createLoginDetailsCheckbox, 'check', 'click on check box');
        await executeStepWithLogging(this.test, this.saveBtn, 'click', 'clicking on save button');
        // await handleEncryption();

    }
}