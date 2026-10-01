const productService = require('../services/productService');

const {
    storeCache,
    clearCache
} = require('../middleware/cacheMiddleware');

async function getProducts(req, res) {
    try {
        const products = await productService.getProducts();

        storeCache(req.originalUrl, products);

        res.json(products);

    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}

async function getProductById(req, res) {
    try {
        const product = await productService.getProductById(
            req.params.id
        );

        if (!product) {
            return res.status(404).send('Product not found');
        }

        storeCache(req.originalUrl, product);

        res.json(product);

    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}

async function createProduct(req, res) {
    try {
        const product = await productService.createProduct(req.body);

        clearCache();

        res.status(201).json(product);

    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}

async function updateProduct(req, res) {
    try {
        const product = await productService.updateProduct(
            req.params.id,
            req.body
        );

        if (!product) {
            return res.status(404).send('Product not found');
        }

        clearCache();

        res.json(product);

    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}

async function deleteProduct(req, res) {
    try {
        const product = await productService.deleteProduct(
            req.params.id
        );

        if (!product) {
            return res.status(404).send('Product not found');
        }

        clearCache();

        res.json(product);

    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};