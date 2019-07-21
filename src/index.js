"use strict";
exports.__esModule = true;
var express_1 = require("express");
var CRUDRouter = /** @class */ (function () {
    function CRUDRouter(collection, middleware, handlers) {
        this.collection = collection;
        this.router = express_1.Router();
        this.middleware = middleware;
        this.handlers = handlers;
        // Read All Route
        this.router.get('/', this.middleware.get, handlers.get);
        // Read Route
        this.router.get('/:id', this.middleware.getById, handlers.getById);
        // Create Route
        this.router.post('/', this.middleware.post, handlers.post);
        // Update Route
        this.router.put('/:id', this.middleware.put, handlers.put);
        // Destroy Route
        this.router["delete"]('/:id', this.middleware["delete"], handlers["delete"]);
    }
    return CRUDRouter;
}());
exports["default"] = (function (collection, customMiddleware, customHandlers) {
    var middleware = {
        get: function (req, res, next) { return next(); },
        getById: function (req, res, next) { return next(); },
        post: function (req, res, next) { return next(); },
        put: function (req, res, next) { return next(); },
        "delete": function (req, res, next) { return next(); }
    };
    var handlers = {
        get: function (req, res) {
            collection.find()
                .then(function (allResults) { return res.status(200).json(allResults); })["catch"](function (err) {
                console.error(err);
                res.status(500).send(err);
            });
        },
        getById: function (req, res) {
            collection.findById(req.params.id, function (err, foundEntry) {
                if (err) {
                    console.error(err);
                    res.status(500).send(err);
                }
                else
                    res.status(200).json(foundEntry);
            });
        },
        post: function (req, res) {
            collection.create(req.body)
                .then(function (createdEntry) {
                console.log("Created new entry:", createdEntry);
                createdEntry.save();
                res.status(201).send("Created new entry");
            })["catch"](function (err) {
                console.error(err);
                res.status(500).send('Unable to create entry');
            });
        },
        put: function (req, res) {
            collection.findOne({ _id: req.params.id }, function (err, foundEntry) {
                if (err) {
                    console.error(err);
                    res.status(500).send("Unable to find entry");
                }
                else {
                    foundEntry.update(req.body, function (err) {
                        if (err) {
                            console.error(err);
                            res.status(500).send("Unable to update entry");
                        }
                        else {
                            res.status(200).send('Entry Updated');
                        }
                    });
                }
            });
        },
        "delete": function (req, res) {
            collection.findByIdAndRemove(req.params.id, function (err) {
                if (err) {
                    console.error(err);
                    res.status(500).send('Unable to DELETE entry');
                }
                else
                    res.status(200).send("Deleted entry");
            });
        }
    };
    if (customHandlers) {
        Object.keys(customHandlers).forEach(function (key) { return handlers[key] = customHandlers[key]; });
    }
    if (customMiddleware) {
        Object.keys(customMiddleware).forEach(function (key) { return middleware[key] = customMiddleware[key]; });
    }
    return new CRUDRouter(collection, middleware, handlers).router;
});
