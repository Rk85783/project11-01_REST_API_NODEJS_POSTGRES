const express = require('express')
const database = require('./services/database')

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/categories', async (req, res) => {

  // --------------> Asynchronous code
  // database.pool.query('SELECT * FROM category').then((result) => {
  //   // return res.status(200).json(result)
  //   return res.status(200).json(result.rows)
  // }).catch(err => {
  //   console.log(err)
  //   return res.status(500).json({ error: err.message })
  // })

  // --------------> Synchronous code
  try {
    const result = await database.pool.query('SELECT * FROM category')
    return res.status(200).json(result.rows)
  } catch (error) {
    return res.status(500).json({ error: err.message })
  }

})

app.get('/products', async (req, res) => {
  try {
    const result = await database.pool.query(`
      SELECT p.id, p.name, p.description, p.price, p.quantity, p.created_date, p.updated_date,

      (SELECT ROW_TO_JSON(category_obj) FROM (
        SELECT id, name FROM category WHERE id = p.category_id
      ) category_obj) AS category
      
      FROM product p  
    `)
    return res.status(200).json(result.rows)
  } catch (error) {
    return res.status(500).json({ error: err.message })
  }
})

app.listen(3000, () => { console.log('Server started on port 3000') })

