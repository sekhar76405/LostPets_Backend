const router = require('express').Router();
const usercontroller = require('../controller/usercontroller')
const petscontroller = require('../controller/petscontroller')

//user routes
router.get("/getusers", usercontroller.getUsers);
router.get("/getusers/:u_id", usercontroller.getUserById);
router.get("/emailexists", usercontroller.emailExists);

router.post("/adduser", usercontroller.addUser);
router.post("/verifypassword", usercontroller.verifyPassword);
router.post("/updateuser", usercontroller.updateUser);

//pets routes
router.get("/getpets", petscontroller.getPets);
router.get("/getpets/:p_id", petscontroller.getPetById);

router.post("/addpet", petscontroller.addPet);
router.post("/updatepet", petscontroller.updatePet);

module.exports = router;