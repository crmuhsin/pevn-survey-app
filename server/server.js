import express from 'express';
import dotenv from 'dotenv';
var cors = require('cors');
import 'babel-polyfill';
import mountRoutes from './src/routes'

dotenv.config();

const app = express()
const port = 3000

var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

app.use(express.json())

mountRoutes(app)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})