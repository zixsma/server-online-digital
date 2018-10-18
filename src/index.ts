import * as express from "express";
import { Request, Response, NextFunction } from 'express';
import { User } from "./user";
import * as cors from "cors";

const app = express()
const port = 5400
app.use(express.json());
app.use(cors({origin: "*"}));

const users: Map<number, User> = new Map()
users.set(1, {
    id: 1,
    name: "Harry Potter",
    age: 13,
    address: "Griffin Dor",
    tel: "0812345678"
})
users.set(2, {
    id: 2,
    name: "Gran Draff",
    age: 70,
    address: "Shine",
    tel: "0987654321"
})
users.set(3, {
    id: 3,
    name: "Pooh",
    age: 6,
    address: "100th Aker",
    tel: "0817263549"
})

app.get('/', (req: Request, res: Response, next: NextFunction) => res.send('Hello World!'))
app.get('/user', (req: Request, res: Response, next: NextFunction) => {    
    const usersTemp = Array.from(users.values());
    console.log(usersTemp);
    res.json(usersTemp);
})
app.post('/user', (req: Request, res: Response, next: NextFunction) => {
    const user = req.body as User;
    user.id = users.size;
    users.set(user.id, user);
    res.json(user)
})
app.post('/user/:id', (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id
    const user = req.body as User;
    user.id = userId;
    users.set(userId, user)
    res.json(user)
})
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))