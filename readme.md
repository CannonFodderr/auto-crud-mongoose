# Auto-CRUD-Mongoose

Automatic generation of RESTFUL CRUD routes for Express server with Mongoose.

## Setup

* npm install express mongoose auto-crud-mongoose
* create an express server
* require('auto-crud-mongoose').default
    **i.e.** const autoCrud = require('auto-crud-mongoose).default
* require mongoose modeles
    **i.e.** const User = require('./db/models/user.js')
* use generate a full rest route
    * **Default Config:** app.use(User, autoCrud(User))
    * or **With Middleware:** app.use('User', autoCrud(User, myMiddleware))
    * or **With Custom Handlers:** app.use('User, null, autoCrud(User, null, myHandlers))
    * or **All toghether now:** app.use(User, autoCrud(User, myMiddleware, myHandlers))

#### Define middleware
    Currently middleware is defined on all routes

        (req, res, next) => {
            console.log("Hi from middleware")
            next()
        }


#### Handlers config:
    you can define handlers for specific route or leave it out to use the default handler
    {
        get: (req, res) => { ... },
        getById: (req, res) => { ... },
        post: (req, res) => { ... },
        put: (req, res ) => { ... },
        delete: (req, res) => { ... }
    }
    Example:
    {
        delete: (req, res) => { res.send("DELETE method not allowed!")}
    }


## Contact me
[Linkedin](https://www.linkedin.com/in/idan-izhaki/)