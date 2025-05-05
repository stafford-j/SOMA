const bcrypt = require("bcryptjs");
const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();

// This is our hardcoded test user with a hash for "securepassword"
// Using $2b$ format which is compatible with your server's bcrypt version
const testUser = {
  id: "1742961914546",
  email: "james@conasishow.com",
  // This is the bcrypt hash for "securepassword" with $2b$ prefix
  password: "$2b$10$/AxKKCcwRsj2GXNqf08/He/.OMCcAaycjGeMlzKCx9MVGHa0kI9VW"
};

// Register route kept simple
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { name, email, password } = req.body;
    
    try {
      // Just return success for proof of concept
      res.status(201).json({ 
        message: "User registered successfully",
        user: {
          id: Date.now().toString(),
          name,
          email
        }
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Clean login route
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").not().isEmpty()
  ],
  async (req, res) => {
    console.log("Login attempt received");
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { email, password } = req.body;
    
    // Email check
    if (email !== testUser.email) {
      console.log("Email mismatch");
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    try {
      // Password check with updated hash
      const isMatch = await bcrypt.compare(password, testUser.password);
      
      if (!isMatch) {
        console.log("Password incorrect");
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      // Success!
      console.log("Login successful");
      res.json({ 
        message: "Login successful",
        user: {
          id: testUser.id,
          email: testUser.email
        }
      });
    } catch (error) {
      console.error("Error during authentication:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;