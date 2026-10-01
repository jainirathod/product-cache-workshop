const fs = require('fs/promises');
const path = require('path');

const pathFile = path.join(__dirname, '..', 'db.json');

async function readProducts() {
    const data = await fs.readFile(pathFile, 'utf-8');

    return JSON.parse(data);
}

async function writeProducts(products) {
    await fs.writeFile(
        pathFile,
        JSON.stringify(products, null, 2)
    );
}

module.exports = {
    readProducts,
    writeProducts
};