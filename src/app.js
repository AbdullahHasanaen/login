const express = require("express");
const pool = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const userRute = require('./routes/userRoutes')
const app = express();

app.use(express.json())
app.use("/api/auth", authRoutes);
app.use("/api/users" , userRute)
app.get('/' , (req , res) => {
    res.json({
        message: 'server is run'
    })
})

pool.query("SELECT NOW()")
    .then(() => {
        console.log('database is conect')
    })
    .catch(error => {
        console.log('faild conect to database' , error)


    })

app.listen(3000 , () => {
    console.log('server is runing 3000')
})