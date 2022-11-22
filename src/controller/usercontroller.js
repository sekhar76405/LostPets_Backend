const pool = require('../../db_connect')

const addUser = (req, res) => {
    const { u_id, name, email, password, phonenumber  } = req.body
    
    pool.query('INSERT INTO users (u_id, name, email, password, phonenumber) VALUES ($1, $2, $3, $4, $5) RETURNING *', [u_id, name, email, password, phonenumber], (error, results) => {
      if (error) {
        res.json({"success":false, "err": error.detail})
        throw error
      }
      res.status(201).json({"success": true, "message": "User Added Successfully" })
    })
}

const updateUser = (req, res) => {
    //update based on u_id
    const { u_id, name, email, password, phonenumber  } = req.body


    pool.query('SELECT * FROM users WHERE u_id = $1', [u_id], (error, results) => {
        if (error) {
          throw error
        }
        if(results.rowCount == 0)
          res.status(200).json({"success": false, "message": "User not found"})
        else
        {
            pool.query('UPDATE users SET name = $2, password = $3, phonenumber = $4 WHERE u_id = $1 ', [u_id, name, password, phonenumber], (error, results) => {
                if (error) {
                  res.json({"success":false, "err": error})
                  throw error
                }
                res.status(201).json({"success": true, "message": "User Updated Successfully" })
              })
        }
      })
    
}

const getUsers = (req, res) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
      })
}

const getUserById = (req, res) => {
    const u_id = parseInt(req.params.u_id)
    
    pool.query('SELECT * FROM users WHERE u_id = $1', [u_id], (error, results) => {
      if (error) {
        throw error
      }
      if(results.rowCount == 0)
        res.status(200).json({"success": false, "message": "User not found"})
      else
      res.status(200).json(results.rows)
    })
}

const emailExists = (req, res) => {
    const email = req.body.email
    
    pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
      if (error) {
        throw error
      }
      
      if(results.rowCount == 0)
        res.status(200).json({"success": false, "message": "Email Doesnt exist"})
      else
      res.status(200).json({"success": true, "message": "Email Already exists"})
    })
}

const verifyPassword = (req, res) => {
    const email = req.body.email
    const password = req.body.password
    
    pool.query('SELECT password FROM users WHERE email = $1', [email], (error, results) => {
      if (error) {
        throw error
      }
      
      if(results.rowCount == 0)
        res.status(200).json({"success": false, "message": "Email Doesnt exist"})
      else if(results.rows[0].password == password)
        res.status(200).json({"success": true, "message": "User Verified"})
      else
        res.status(200).json({"success": false, "message": "Password Invalid"})
    })
}

module.exports = {addUser, getUsers, getUserById, emailExists, verifyPassword, updateUser}; 