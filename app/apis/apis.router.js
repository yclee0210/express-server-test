module.exports = (function (express, items) {
    const router = express.Router();

    router.use(express.json());

    router.get('/', (req, res) => {
        res.status(200).json({
            version: '1.0.0'
        });
    });

    router.use('/items', items.router);

    return router;
});