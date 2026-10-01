const cache = {};

const TTL = 60 * 1000; // 1 minute

function cacheMiddleware(req, res, next) {

    const key = req.originalUrl;

    const cachedData = cache[key];

    if (cachedData) {

        const age = Date.now() - cachedData.createdAt;

        if (age < TTL) {

            res.set('X-Cache', 'HIT');

            return res.json(cachedData.data);
        }

        delete cache[key];
    }

    res.set('X-Cache', 'MISS');

    next();
}

function storeCache(key, data) {

    cache[key] = {
        data: data,
        createdAt: Date.now()
    };
}

function clearCache() {

    Object.keys(cache).forEach((key) => {
        delete cache[key];
    });
}

module.exports = {
    cacheMiddleware,
    storeCache,
    clearCache
};