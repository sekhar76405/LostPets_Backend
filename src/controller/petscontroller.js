const pool = require('../../db_connect')

const addPet = (req, res) => {
    const { p_id, o_id, name, breed, colour, gender, category, marks, license } = req.body
    console.log("addpet called")
    if(p_id == '')
    {
      res.json({"success":false, "message": "empty fields"})
    }
    else{
    pool.query('INSERT INTO pets (p_id, o_id, name, breed, colour, gender, category, marks, license) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [p_id, o_id, name, breed, colour, gender, category, marks, license], (error, results) => {
      if (error) {
        try{
          throw error
        }
        catch(err){
          res.json({"success":false, "message": err.detail})
        }
      }
      else{
        res.status(201).json({"success": true, "message": "Pet Added Successfully" })
      }
    })
  }
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
          pool.query('UPDATE pets SET name = $2, breed = $3, colour = $4, gender = $5, category = $6, marks = $7, license = $8 WHERE p_id = $1 ', [p_id, name, breed, colour, gender, category, marks, license], (error, results) => {
              if (error) {
                res.json({"success":false, "message": error})
                throw error
              }
              res.status(201).json({"success": true, "message": "Pet Details Updated Successfully" })
            })
        }
    })
}

const pidExists = (req, res) => {
  const p_id = req.body.p_id;
  pool.query('SELECT * FROM pets WHERE p_id = $1',[p_id], (error, results) => {
    if(error){
      try{
        throw error;
      }
      catch(err){
        res.status(201).json({"success": false, "message": err.detail})
      }
    }
    else{
      if(results.rowCount == 0)
      res.status(200).json({"success": false, "message": "Pet not found"})
      else
      res.status(200).json({"success": true, "message": "Pet ID already exists"})
    }
  })
}
const getPets = (req, res) => {
    pool.query('SELECT * FROM pets', (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json({"success": true, "rows" : results.rows})
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
      else{
        
        pool.query('SELECT name FROM users WHERE u_id = $1',[results.rows[0].o_id], (error, results2) => {
          if(error){
            throw error
          }
          results.rows[0]["ownername"]  = results2.rows[0].name;
          res.status(200).json({"success": true, "rows" : results.rows})
        })
      }
      
    })
}

const getOwnerPets = (req, res) => {
  const o_id = req.params.o_id
  console.log("getownerpets  " + o_id)
  pool.query('SELECT * FROM pets WHERE o_id = $1', [o_id], (error, results) => {
    if(error){
      throw error;
    }
    if(results.rowCount == 0){
      res.status(200).json({"success": false, "message": "No Pets found with the given o_id"})
    }
    else{

      res.status(200).json({"success": true, "rows" : results.rows})
    }
  })
}

module.exports = {addPet, updatePet, getPets, getPetById, getOwnerPets, pidExists}