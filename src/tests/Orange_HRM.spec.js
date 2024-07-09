const { test, expect, chromium } = require('@playwright/test');
const section = require('../pages/pageIndex')
require('dotenv').config();
import { encrypt, decrypt } from '../utils/CryptojsUtil';
import { encryptEnvFile, decryptEnvFile } from '../utils/EncryptEnvFile'
let context;
let page;
// const fetchData = require('../utils/fetchData');
test('Login with Credentials', async ({ browser }) => {
    // (async () => {
    //     try {
    //         // Fetch data from the MySQL database
    //         const data = await fetchData();
    //         console.log('Fetched data ++++:', data);
    //         const req_data = data.reduce((acc, value) => {
    //             acc[value.locator_name] = value.locator_xpath;
    //             return acc;
    //         }, {});


    //         console.log("req_data>>>>", req_data)
    //         console.log("username : ", req_data.userName)

    //     } catch (err) {
    //         console.error('Error:', err);
    //     }
    // })();
    context = await browser.newContext();
    page = await context.newPage();
    const loginPage = new section.Login(page, test);
    await loginPage.launchApplication([process.env.BASE_URL]);
    await loginPage.loginWithValidCredentials();
});
test.only('Add Employee', async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    const loginPage = new section.Login(page, test);
    const add_Employee = new section.AddEmployee(page, test)
    await loginPage.launchApplication([process.env.BASE_URL]);
    await loginPage.loginWithValidCredentials();
    await add_Employee.addingNewEmployee();
});
test('Sharing Photo', async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    const loginPage = new section.Login(page, test);
    const sharePost = new section.BUZZ(page, test)
    await loginPage.launchApplication([process.env.BASE_URL]);
    await loginPage.loginWithValidCredentials();
    await sharePost.sharingPhoto()
});
test('encrypt env', async ({ page }) => {
    const plainText = "Vijay Kumar";
    const encryptedText = encrypt(plainText);
    console.log("SALT", process.env.SALT);
    console.log("Encrypted text", encryptedText);
    const decryptedText = decrypt(encryptedText);
    console.log("decrypted text", decryptedText);

    // encryptEnvFile();

    // decryptEnvFile();


});