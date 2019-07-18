import {Router, Request, Response, NextFunction} from 'express'
import {Model, Error} from 'mongoose'
import {ICRUDRouter, IHandlers} from './interfaces/index'

class CRUDRouter implements ICRUDRouter{
    collection: Model<any, {}>
    router: Router
    middleware: any
    handlers: any
    constructor(collection: any, middleware:any, handlers: IHandlers){
        this.collection = collection
        this.router = Router()
        this.middleware = middleware
        this.handlers = handlers
        // Read All Route
        this.router.get('/', this.middleware, handlers.get)
        // Read Route
        this.router.get('/:id', this.middleware, handlers.getById)
        // Create Route
        this.router.post('/', this.middleware, handlers.post)
        // Update Route
        this.router.put('/:id', this.middleware, handlers.put)
        // Destroy Route
        this.router.delete('/:id', this.middleware, handlers.delete)
    }
}

export default (collection: Model<any, {}>, customMiddleware?: any, customHandlers:IHandlers = {}) => {
    let middleware = (req: Request, res: Response, next: NextFunction) => next()
    middleware = customMiddleware ? customMiddleware : middleware
    const handlers: IHandlers = {
        get: (req: Request, res: Response) => {
            collection.find()
            .then(allResults => res.status(200).json(allResults))
            .catch(err => {
                console.error(err)
                res.status(500).send(err)
            })
        },
        getById: (req: Request, res: Response) => {
            collection.findById(req.params.id, 
                (err: Error, foundEntry: Model<any, {}>) => 
            {
                if(err) {
                    console.error(err)
                    res.status(500).send(err)
                } else res.status(200).json(foundEntry)
            })
        },
        post: (req: Request, res:Response) => {
            collection.create(req.body)
            .then(createdEntry => {
                console.log("Created new entry:", createdEntry)
                createdEntry.save()
                res.status(201).send(`Created new entry`)
            })
            .catch(err => {
                console.error(err)
                res.status(500).send('Unable to create entry')
            })
        },
        put: (req: Request, res: Response) => {
            collection.findOne({_id: req.params.id}, (err, foundEntry) => {
                if(err){
                    console.error(err)
                    res.status(500).send(`Unable to find entry`)
                } else {
                    foundEntry.update(req.body, (err: Error) => {
                        if(err) {
                            console.error(err)
                            res.status(500).send(`Unable to update entry`)
                        } else {
                            res.status(200).send('Entry Updated')
                        }
                    })
                }
            })
        },
        delete: (req: Request, res: Response) => {
            collection.findByIdAndRemove(req.params.id, (err) => {
                if(err) {
                    console.error(err)
                    res.status(500).send('Unable to DELETE entry')
                } else res.status(200).send(`Deleted entry`)
            })
        }
    }
    Object.keys(customHandlers).forEach(key => handlers[key] = customHandlers[key])
    return new CRUDRouter(collection, middleware, handlers).router
}