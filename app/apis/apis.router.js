module.exports = (function (express, items) {
    const router = express.Router();

    router.use(express.json(), (req, res, next) => {
        console.log(`In APIs router at ${new Date().toJSON()}`);
        next();
    });
    router.get('/', (req, res) => {
        res.status(200).json({
            version: '1.0.0'
        });
    });
    router.use('/items', items.router);

    return router;
});