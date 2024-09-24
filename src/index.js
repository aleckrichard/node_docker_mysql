import express from 'express'
import {createPool} from 'mysql2/promise'
import {config} from 'dotenv'
config()
const app = express()

console.log(process.env.MYSQLDB_HOST)

const pool = createPool({
    host: process.env.MYSQLDB_HOST,
    user: 'root',
    password: process.env.MYSQLDB_PASSWORD,
    port:process.env.MYSQL_DOCKER_PORT
})

app.get('/', (req, res) =>{
    res.send('Hi Nodejs')
})

app.get('/ping', async (req, res) =>{
   const result =  await pool.query('SELECT NOW()')

   res.json(result[0])

})


app.listen(3000, ()=>{
    console.log(`server running on port ${process.env.NODE_DOCKER_PORT}`)
})