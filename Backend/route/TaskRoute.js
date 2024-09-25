const { updateData, deleteData, saveData, getData } = require("../controller/TaskController");
const {signupUser,loginUser} = require("../controller/user-controller")
const { Router } = require("express");
const router = Router();
router.get("/get", getData);
router.post('/save', saveData);
router.delete('/delete/:id', deleteData);
router.put('/update/:id', updateData);
router.post("/signup", signupUser);
router.post("/login", loginUser);
module.exports=router;

