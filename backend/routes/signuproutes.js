const express = require('express');
const router = express.Router();
const User = require('../models/Signup');

router.post('/signup', async (req, res) => {
    const { emailOrMobile, fullName, username, password } = req.body;

    if (!emailOrMobile || !fullName || !username || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
        let user = await User.findOne({ $or: [{ emailOrMobile }, { username }] });
        if (user) {
            return res.status(400).json({ msg: 'User with this email or username already exists' });
        }
        
        
        const newUser = new User({ 
            emailOrMobile, 
            fullName, 
            username, 
            password: password 
        });

        await newUser.save();
        res.status(201).json({ msg: 'User registered successfully!' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.post('/login', async (req, res) => {
    const { emailOrMobile, password } = req.body;

    if (!emailOrMobile || !password) {
        return res.status(400).json({ success: false, msg: 'Please enter all fields' });
    }

    try {
        const user = await User.findOne({ 
            $or: [{ emailOrMobile: emailOrMobile.toLowerCase() }, { username: emailOrMobile.toLowerCase() }] 
        });

        if (!user) {
            return res.status(400).json({ success: false, msg: 'Invalid credentials' });
        }
        const isMatch = (password === user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, msg: 'Invalid credentials' });
        }

        res.json({
            success: true,
            msg: `Signup Successful, ${user.fullName}!`,
            user: {
                id: user.id,
                username: user.username,
                fullName: user.fullName
            }
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;