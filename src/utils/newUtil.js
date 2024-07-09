import logger from "./LoggerUtil";
exports.executeStep = async (test, element, action, description, data) => {
    try {
        await test.step(description, async () => {
            switch (action) {
                case 'click':
                    await element.click();
                    break;
                case 'dblclick':
                    await element.dblclick();
                    break;
                case 'fill':
                    await element.fill(data[0]);
                    break;
                case 'navigate':
                    await element.goto(data[0]);
                    break;
                case 'type':
                    await element.type(data[0]);
                    break;
                case 'check':
                    await element.check({ force: true });
                    break;
                case 'uncheck':
                    await element.uncheck({ force: true });
                    break;
                case 'tap':
                    await element.tap();
                    break;
                case 'hover':
                    await element.hover();
                    break;
                default:
                    throw new Error(`Unsupported action: ${action}`);
            }
            logger.info(`Action '${action}' executed successfully: ${description}`);
        });
    } catch (error) {
        logger.error(`Error executing action '${action}' with description '${description}': ${error.message}`);
        throw error;
    }
};

exports.executeStepWithLogging = async (test, element, action, description, data) => {
    try {
        await exports.executeStep(test, element, action, description, data);
    } catch (error) {
        logger.error(`Error during step '${description}': ${error.message}`);
        throw error;
    }
};
