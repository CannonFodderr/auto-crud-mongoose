# auto-crud-mongoose

Automatic generation of RESTFUL CRUD API routes for Express server with Mongoose.

**By default** API routes will return a **JSON** response.

## Setup

* npm install express mongoose auto-crud-mongoose

* create an express server

* **use body-parser** or similar packages to parse post/put request body

* require('auto-crud-mongoose')
    **i.e.** const autoCrud = require('auto-crud-mongoose)

* require mongoose modeles
    **i.e.** const User = require('./db/models/user.js')

* use generate a full rest route
    * **Default Config:** app.use(User, autoCrud(User))

    * or **With Middleware:** app.use(User, autoCrud(User, myMiddleware))

    * or **With Custom Handlers:** app.use(User, null, autoCrud(User, null, myHandlers))

    * or **All toghether now:** app.use(User, autoCrud(User, myMiddleware, myHandlers))

#### Define middleware
You can create a specific middleware for each route. **omited routes will be ignored.**

        const myMiddleware = {
            get: (req: Request, res: Response, next: NextFunction) => {
                console.log("Hello from GET middleware)
                next()
            },
            getById: (req: Request, res: Response, next: NextFunction) => next(),
            post: (req: Request, res: Response, next: NextFunction) => next(),
            put: (req: Request, res: Response, next: NextFunction) => next(),
            delete: (req: Request, res: Response, next: NextFunction) => next(),
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

#### REST Routes
Use the express app.use prefix to define a specific route.
Learn more on [expressjs.com/routing](https://expressjs.com/en/guide/routing.html)
**app.use('/myPrefix', dbModel)**

    {
        get => /
        getById => /:id
        post => /
        put => /:id
        delete => /:id
    }

## Contact me
* [Linkedin](https://www.linkedin.com/in/idan-izhaki/)
* [GitHub](https://github.com/CannonFodderr)
* Contribute to [the repo](https://github.com/CannonFodderr/auto-crud-mongoose)
