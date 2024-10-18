require('dotenv').config()
const express = require('express')

const app = express()

app.use(require('./routes/categoryRoute'))
app.use(require('./routes/productRoute'))

app.listen(3000, () => { console.log('Server started on port 3000') })

