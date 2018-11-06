const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/user')
const app = express()
require('./config/db')

app.use(cors())
app.use(express.json())

app.use('/user', userRouter)

app.listen(3000, () => console.log('Service User is listening in 3000'))
