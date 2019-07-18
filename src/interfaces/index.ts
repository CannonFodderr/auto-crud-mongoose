import {Router} from 'express'
import {Model} from 'mongoose'

export interface ICRUDRouter{
    readonly collection: Model<any, {}>
    readonly router: Router
    handlers: IHandlers
    middleware: any
}

export interface IHandlers {
    [key: string]: object;
    get?: any
    getById?: any
    post?: any
    put? : any
    delete?: any
}