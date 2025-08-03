// Filename: routes/auth.js (or whatever you named it)
const express = require('express');
const router = express.Router();
const User = require('../models/Signup'); // Assuming your model is in ../models/Signup

/* 
  You can now REMOVE or COMMENT OUT the old '/signup' route, 
  as its functionality is now merged into '/login'.
*/
// router.post('/signup', ...); // <-- DELETE THIS ENTIRE BLOCK

// The new, combined login/signup route
router.post('/login', async (req, res) => {
    const { emailOrMobile, password } = req.body;

    // Basic validation
    if (!emailOrMobile || !password) {
        return res.status(400).json({ success: false, msg: 'Please enter all fields' });
    }

    try {
        // 1. Check if the user already exists
        let user = await User.findOne({ emailOrMobile: emailOrMobile.toLowerCase() });
        
        // 2. If the user exists, this is the "second login" attempt.
        if (user) {
            // As per your requirement, we tell them the user already exists.
            return res.status(400).json({ success: false, msg: 'User with this email/mobile already exists' });
        }

        // 3. If the user does NOT exist, this is their first time. We create a new user.
        // NOTE: Your User model requires 'fullName' and 'username'.
        // Since the login form only provides email/mobile, we'll use that for the other fields.
        // This is a key decision to make this flow work with your current schema.
        const newUser = new User({
            emailOrMobile: emailOrMobile.toLowerCase(),
            fullName: emailOrMobile, // Using emailOrMobile as placeholder
            username: emailOrMobile, // Using emailOrMobile as placeholder
            password: password      // In a real app, you MUST hash this password!
        });

        // 4. Save the new user to the database
        await newUser.save();

        // 5. Respond with a success message for the new registration/login
        res.status(201).json({ // Using 201 Created status code is appropriate here
            success: true,
            msg: `Welcome! Account created successfully!`,
            user: {
                id: newUser.id,
                username: newUser.username,
                fullName: newUser.fullName
            }
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;