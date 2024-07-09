const mysql = require('mysql2/promise');

async function fetchData() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Vijay',
        database: 'qa_testdata'
    });

    const [rows] = await connection.execute('SELECT locator_name, locator_xpath FROM orange_hrm');
    await connection.end();

    return rows;
}

module.exports = fetchData;
