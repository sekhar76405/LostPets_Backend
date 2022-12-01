const { Server } = require('socket.io')


const joinRoom = (data)=>{
    console.log("joined")
    socket.join(data);
}
const sendMsg = (data)=>{

}

const disconnect = (data) =>{

}

module.exports = { joinRoom, sendMsg, disconnect}