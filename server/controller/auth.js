const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const email = req.query.data.email;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }
    const hashedPassword = await bcrypt.hash(req.query.data.password, 10);
    const newUser = new User({
      email: email,
      password: hashedPassword,
      firstName: req.query.data.firstName,
      lastName: req.query.data.lastName,
      organizationName: req.query.data.organizationName,
      contact: req.query.data.contact,
      link: req.query.data.link,
      address: req.query.data.address,
      skill: req.query.data.skill,
      location: req.query.data.location,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      type: req.query.type,
    });
    await newUser.save();
    res.json({ message: "Successful" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function loginUser(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id }, 'Volunt33ringM@d3Easy');
    res.json({ token, message: 'Successful' });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
}

module.exports = {
  registerUser,
  loginUser,
};
