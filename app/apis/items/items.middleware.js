module.exports = (function (datastore, logger, Item) {

    const list = (req, res) => {

        Item.list()
            .then((entities) => res.status(200).json({
                list: entities
            }))
            .catch((error) => {
                logger.error(error);
                res.status(error.error.status).json({message: error.error.message});
            });
    };

    const get = (req, res) => {

        Item.get(req.params.id)
            .then((entity) => res.status(200).json(entity))
            .catch((error) => {
                logger.error(error);
                res.status(error.error.status).json({message: error.error.message});
            });
    };

    const save = (req, res) => {
        try {
            const item = new Item(req.body);

            item.save()
                .then(() => res.status(201).send())
                .catch((error) => {
                    logger.error(error);
                    res.status(500).send()
                });
        } catch (error) {
            logger.error(error);
            res.status(400).json({message: error.message});
        }
    };

    return {
        list,
        get,
        save
    };
});