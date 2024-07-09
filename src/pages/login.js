import { executeStep, executeStepWithLogging } from '../utils/newUtil';
require('dotenv').config();
const { expect } = require('@playwright/test');
const fetchData = require('../utils/fetchData');
import { handleEncryption } from '../utils/EncryptEnvFile';
import logger from '../utils/LoggerUtil';
let req_data;
(async () => {
    try {
        // Fetch data from the MySQL database
        const data = await fetchData();
        req_data = data.reduce((acc, value) => {
            acc[value.locator_name] = value.locator_xpath;
            return acc;
        }, {});
    } catch (err) {
        console.error('Error:', err);
    }
})();
exports.Login = class Login {
    constructor(page, test) {
        this.page = page;
        this.test = test;
        this.userName = page.locator(req_data.userName)
        this.password = page.locator(req_data.password)
        this.loginBtn = page.locator(req_data.loginBtn)
    }
    launchApplication = async (base_URL) => {
        await handleEncryption();
        await this.page.waitForTimeout(2000);

        await executeStepWithLogging(
            this.test,
            this.page,
            'navigate',
            `Navigating to ${base_URL}`,
            base_URL
        );
        await expect(this.page).toHaveURL(`${process.env.BASE_URL}`);
    };
    loginWithValidCredentials = async () => {
        await executeStepWithLogging(this.test, this.userName, 'fill', 'enterning user name', [process.env.USER_NAME]);
        await executeStepWithLogging(this.test, this.password, 'fill', 'entering password', [process.env.PASSWORD]);
        await executeStepWithLogging(this.test, this.loginBtn, 'click', 'clicking on login button');
        await this.page.waitForTimeout(2000);
    }

}
