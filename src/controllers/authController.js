const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const result = await pool.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, role`,
      [name, email, hashedPassword]
    );

    res.status(201).json({
      message: "User registered successfully",
      user: result.rows[0],
    });

 } catch (error) {
  console.error("REGISTER ERROR:", error);

  res.status(500).json({
    message: error.message,
  });
}
};

const login = async (req , res) => {
  try{
    const { email , password} = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    )

    if(result.rows.length === 0){
      return res.status(401).json({
        message: 'invalid email or password'
      })
    }

    const user = result.rows[0]

    const isPasswordCorect = await bcrypt.compare(
      password,
      user.password
    )

    if(!isPasswordCorect){
      return res.status(401).json({
        message: 'invalid email or password'
      })
    }

    const token = jwt.sign(
      
      { id: user.id, email: user.email, role: user.role }, "MY_SECRET_KEY" ,{expiresIn : '1h'}
    )

    res.json({
      message: 'login successful',
      token
    })

  } catch(error){
    console.log(error);
    res.status(500).json({
      message: 'server error'
    })
  }
}

module.exports =  {register , login};