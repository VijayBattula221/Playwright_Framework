const { executeStep } = require('../utils/actions');
const { expect } = require('@playwright/test');
require('dotenv').config();

exports.BUZZ = class BUZZ {
    constructor(page, test) {
        this.page = page;
        this.test = test;
        this.buzz_Tab = page.locator("//span[text()='Buzz']");
        this.sharePhoto = page.locator("//button[text()=' Share Photos']");
        this.addPhoto = page.locator('//input[@type="file"]');
        this.shareBtn = page.locator("//button[text()=' Share ']");
    }

    sharingPhoto = async () => {
        await executeStep(this.test, this.buzz_Tab, 'click', 'clicking on buzz tab');
        await executeStep(this.test, this.sharePhoto, 'click', 'clicking on share photo');
        // await executeStep(this.test, this.addPhoto, 'click', 'clicking on add photo');
        const filePath = process.cwd() + "/documents/samplePic.png";

        // const filePath = path.join(process.cwd(), 'documents', 'samplePic.png');
        await this.addPhoto.setInputFiles(filePath);
        await executeStep(this.test, this.shareBtn, 'click', 'clicking on share button');
        await this.page.waitForTimeout(2000);
    }
}
