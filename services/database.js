const { Pool } = require('pg')

const pool = new Pool({
  connectionString: 'postgres://avnadmin:AVNS_kkCAOCM1Y5W3d7iR5_T@pg-2fa9e9a-rk85783-cb5a.e.aivencloud.com:27729/01',
  ssl: {
    rejectUnauthorized: false
  }
})

module.exports = {
  pool
}