module.exports = (function (express, items) {
    const router = express.Router();

    router.use((req, res, next) => {
        console.log(`In Items router at ${new Date().toJSON()}`);
        next();
    });

    router.route('/')
        .get(items.list)
        .post(items.save);

    router.route('/:id')
        .get(items.get);

    return router;
});