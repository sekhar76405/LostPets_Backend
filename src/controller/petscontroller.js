const pool = require('../../db_connect')

const addPet = (req, res) => {
    const { p_id, o_id, name, breed, colour, gender, category, marks, license } = req.body
    
    pool.query('INSERT INTO pets (p_id, o_id, name, breed, colour, gender, category, marks, license) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [p_id, o_id, name, breed, colour, gender, category, marks, license], (error, results) => {
      if (error) {
        res.json({"success":false, "err": error.detail})
        throw error
      }
      res.status(201).json({"success": true, "message": "Pet Added Successfully" })
    })
}

const updatePet = (req, res) => {
    const { p_id, o_id, name, breed, colour, gender, category, marks, license  } = req.body

    pool.query('SELECT * FROM pets WHERE p_id = $1', [p_id], (error, results) => {
        if (error) {
          throw error
        }
        if(results.rowCount == 0)
          res.status(200).json({"success": false, "message": "Pet not found"})
        else
        {
            pool.query('UPDATE pets SET name = $2, breed = $3, colour = $4, gender = $5, category = $6, marks = $7, license = $8 WHERE p_id = $1 ', [p_id, name, breed, colour, gender, category, marks, license ], (error, results) => {
                if (error) {
                  res.json({"success":false, "err": error})
                  throw error
                }
                res.status(201).json({"success": true, "message": "Pet Details Updated Successfully" })
              })
        }
    })
}

const getPets = (req, res) => {
    pool.query('SELECT * FROM pets', (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
      })
}

const getPetById = (req, res) => {
    const p_id = req.params.p_id
    
    pool.query('SELECT * FROM pets WHERE p_id = $1', [p_id], (error, results) => {
      if (error) {
        throw error
      }
      if(results.rowCount == 0)
        res.status(200).json({"success": false, "message": "Pet not found"})
      else
      res.status(200).json(results.rows)
    })
}

module.exports = {addPet, updatePet, getPets, getPetById}