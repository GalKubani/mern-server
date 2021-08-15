const express = require('express')
const cors = require('cors')
const taskRouter = require('./routers/taskRouter')
const port = process.env.PORT

const app = express()
require('./db/mongoose')
app.use(cors())
app.use(express.json())
app.use(taskRouter)

app.use('/*', (req, res) => {
    res.status(404).send({ error: "not found" })
})

app.listen(port, () => console.log("server on port:", port))