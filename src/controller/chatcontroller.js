const pool = require('../../db_connect')

const sendRequest = (req, res) => {
    const s_id = req.body.s_id
    const r_id = req.body.r_id
    var s_name = ""
    var r_name = ""
    if(s_id == null || r_id == null)
    {
      res.json({"success":false, "message": "empty field"})
    }
    else{

        pool.query('SELECT name FROM users WHERE u_id = $1', [s_id], (error, results) => {
            if (error) {
              res.json({"success":false, "message": error})
              throw error
            }
            else{
                s_name = results.rows[0].name
                pool.query('SELECT name FROM users WHERE u_id = $1', [r_id], (error, results1) => {
                    if (error) {
                      res.json({"success":false, "message": error})
                      throw error
                    }
                    else{
                        r_name = results1.rows[0].name
                        pool.query('INSERT INTO requests (sender_id, sender_name, receiver_id, receiver_name) VALUES ($1, $2, $3, $4) RETURNING *', [s_id,s_name, r_id, r_name], (error, results2) => {
                            if (error) {
                              res.json({"success":false, "message": error})
                              throw error
                            }
                            else{
                                res.status(201).json({"success": true, "message": "Request sent Successfully", "r_id": results2.rows[0].r_id })
                            }
                          })
                    }
                    
                  })  
            }
            
          })  
    }
}

const acceptRequest = (req, res) => {
    const s_id = req.body.s_id
    const r_id = req.body.r_id
    
    if(s_id == null || r_id == null)
    {
      res.json({"success":false, "message": "empty field"})
    }
    else{
      pool.query('DELETE FROM requests WHERE sender_id = $1 AND receiver_id = $2', [s_id, r_id], (error, results) => {
        if (error) {
          res.json({"success":false, "message": error})
          throw error
        }
        res.status(201).json({"success": true, "message": "Request Accepted Successfully"})
      })
    }
}

const rejectRequest = (req, res) => {
  const s_id = req.body.s_id
  const r_id = req.body.r_id
  
  if(s_id == null || r_id == null)
  {
    res.json({"success":false, "message": "empty field"})
  }
  else{
    pool.query('DELETE FROM requests WHERE sender_id = $1 AND receiver_id = $2', [s_id, r_id], (error, results) => {
      if (error) {
        res.json({"success":false, "message": error})
        throw error
      }
      res.status(201).json({"success": true, "message": "Request Rejected Successfully"})
    })
  }
}

const getRequests = (req, res) => {
    
    const r_id = req.body.r_id
    
    if(r_id == null)
    {
      res.json({"success":false, "message": "empty field"})
    }
    else{
      pool.query('SELECT * FROM requests WHERE receiver_id = $1', [r_id], (error, results) => {
        if (error) {
          res.json({"success":false, "message": error})
          throw error
        }
        res.status(201).json({"success": true, "rows": results.rows})
      })
    }
}

const newChat = (req, res) => {
    
    const s_id = req.body.s_id
    const r_id = req.body.r_id
    var s_name = ""
    var r_name = ""
    var c_id = ""

    if(s_id <= r_id)
        c_id = s_id+r_id
    if(s_id>r_id)
        c_id = r_id+s_id
    console.log(c_id)

    if(s_id == null || r_id == null || c_id == null)
    {
      res.json({"success":false, "message": "empty field"})
    }
    else{
    
      pool.query('SELECT name FROM users WHERE u_id = $1', [s_id], (error, results) => {
        if (error) {
          res.json({"success":false, "message": error})
          throw error
        }
        else{
            s_name = results.rows[0].name
            pool.query('SELECT name FROM users WHERE u_id = $1', [r_id], (error, results1) => {
                if (error) {
                  res.json({"success":false, "message": error})
                  throw error
                }
                else{
                    r_name = results1.rows[0].name
                    pool.query('INSERT INTO chats (c_id, sender_id, sender_name, receiver_id, receiver_name) VALUES ($1, $2, $3, $4, $5)', [c_id, s_id, s_name, r_id, r_name], (error, results2) => {
                        if (error) {
                          res.json({"success":false, "message": error})
                          throw error
                        }
                        else{
                            pool.query('INSERT INTO chats (c_id, sender_id, sender_name, receiver_id, receiver_name) VALUES ($1, $2, $3, $4, $5) RETURNING *', [c_id, r_id, r_name, s_id, s_name], (error, results3) => {
                                if (error) {
                                  res.json({"success":false, "message": error})
                                  throw error
                                }
                                else{
                                  const history = {"msgList": []}
                                  pool.query('INSERT INTO chat_history (c_id, history) VALUES ($1, $2) RETURNING *', [c_id, history], (error, results4) => {
                                    if (error) {
                                      res.json({"success":false, "message": error})
                                      throw error
                                    }
                                    else{
                                        res.status(201).json({"success": true, "message": "Chat added and history initiated succesfully"})
                                    }
                                  })
                                    //res.status(201).json({"success": true, "message": "Chat added succesfully"})
                                }
                              })
                            
                        }
                      })
                }
                
              })  
        }
        
      })  
      
    }
}


const getUserChats = (req, res) => {

    const s_id = req.body.s_id
    
    if(s_id == null)
    {
      res.json({"success":false, "message": "empty field"})
    }
    else{
      pool.query('SELECT * FROM chats WHERE sender_id = $1', [s_id], (error, results) => {
        if (error) {
          res.json({"success":false, "message": error})
          throw error
        }
        //console.log(results.rows)
        res.status(201).json({"success": true, "rows": results.rows})
      })
    }
}

const getChatById = (req, res) => {

  const c_id = req.body.c_id

    if(c_id == null)
    {
      res.json({"success":false, "message": "empty field"})
    }
    else{
      pool.query('SELECT history FROM chat_history WHERE c_id = $1', [c_id], (error, results) => {
        if (error) {
          res.json({"success":false, "message": error})
          throw error
        }
        if(results.rowCount == 0){
          res.status(201).json({"success": false, "message": "chats not found before"})
        }
        else{
          console.log(results.rows[0].history)
          res.status(201).json({"success": true, "rows": results.rows[0].history})
        }

      })
    }
}

const updateChatById = (req, res) => {

    const c_id = req.body.c_id
    const history = req.body.history
    console.log(history)
    if(c_id == null)
    {
      res.json({"success":false, "message": "empty field"})
    }
    else{
      pool.query('UPDATE chat_history SET history = $2 WHERE c_id = $1 RETURNING *', [c_id, history], (error, results) => {
        if (error) {
          res.json({"success":false, "message": error})
          throw error
        }
        //console.log(results.rows)
        res.status(201).json({"success": true, "message": "chat updated"})
      })
    }
}

module.exports = {sendRequest, acceptRequest, rejectRequest, getRequests, newChat, getUserChats, getChatById, updateChatById};