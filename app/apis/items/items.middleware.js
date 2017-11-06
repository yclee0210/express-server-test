module.exports = (function (Item) {

    const list = (req, res) => {

        Item.list()
            .then((entities) => res.status(200).json({
                list: entities[0]
            }))
            .catch((error) => {
            });
    };

    const get = (req, res, next) => {

        Item.get(req.params.id)
            .then(() => {
                res.locals.user = user;
                next();
            })
            .catch((error) => {
            });
    };

    const save = (req, res) => {
        try {
            const item = new Item(req.body);

            item.save()
                .then(() => res.status(201).send())
                .catch((error) => res.status(500).send())
        } catch (error) {
            res.status(400).json({
                error: error
            });
        }
    };

    return {
        list,
        get,
        save
    };
});