// utils/slackNotifier.js
const axios = require('axios');

const webhookUrl = process.env.SLACK_WEBHOOK_URL;

async function sendSlackNotification(message) {
    if (!webhookUrl) {
        console.error('Slack webhook URL is not set.');
        return;
    }

    const payload = {
        text: message,
    };

    try {
        await axios.post(webhookUrl, payload);
        console.log('Slack notification sent successfully.');
    } catch (error) {
        console.error('Error sending Slack notification:', error);
    }
}

module.exports = { sendSlackNotification };
