const express = require("express")
const authMidllware =require("../middleware/authMiddleware")
const allowRoles = require('../middleware/roleMiddlware')
const router = express.Router();

router.get("/profile" , authMidllware ,(req , res) => {
    res.json({
        message: 'welcom to profile',
        user:req.user
    })
})

router.get("/admin" , authMidllware , allowRoles('admin') , (req , res) => {
    res.json({
        message: 'welcom admin'
    })
})

module.exports = router