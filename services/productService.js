const {
    readProducts,
    writeProducts
} = require('../database/productDatabase');

async function getProducts() {
    return await readProducts();
}

async function getProductById(id) {
    const products = await readProducts();

    return products.find((product) => product.id === Number(id));
}

async function createProduct(product) {
    const products = await readProducts();

    products.push(product);

    await writeProducts(products);

    return product;
}

async function updateProduct(id, updatedProduct) {
    const products = await readProducts();

    const index = products.findIndex(
        (product) => product.id === Number(id)
    );

    if (index === -1) {
        return null;
    }

    products[index] = {
        ...products[index],
        ...updatedProduct
    };

    await writeProducts(products);

    return products[index];
}

async function deleteProduct(id) {
    const products = await readProducts();

    const index = products.findIndex(
        (product) => product.id === Number(id)
    );

    if (index === -1) {
        return null;
    }

    const deletedProduct = products.splice(index, 1)[0];

    await writeProducts(products);

    return deletedProduct;
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};