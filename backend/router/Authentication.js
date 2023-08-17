const express = require("express");
const bcrypt = require("bcrypt"); // to encode and decode password
const jwt = require("jsonwebtoken"); // for user authentication
const user = require("../models/User");
const User = require("../models/User");
const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        const encryptPassword = await bcrypt.hash(password, 10);
        const user = new User({
            email, password: encryptPassword
        });
        await user.save();
        res.status(202).json({ msg: "Successful" });
    }
    catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!User)
            return res.status(402).json({ msg: "User not found " });
        const validatePassword = await bcrypt.compare(password, user.password);
        if (!validatePassword)
            return res.status(402).json({ msg: "wrong password" });
        const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET);
        res.cookie('token',token, { maxAge: 900000, httpOnly: true })
        res.json({ token });
    }
    catch {
        res.status(500).json({ msg: "Login Failed" });
    }
});

module.exports = router;