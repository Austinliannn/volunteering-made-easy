const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

async function registerUser(req, res) {
    const email = req.body.data.email;
  try {
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }
    const hashedPassword = await bcrypt.hash(req.body.data.password, 10);
    const newUser = new User({
      email: req.body.data.email,
      password: hashedPassword,
      firstName: req.body.data.firstName,
      lastName: req.body.data.lastName,
      organizationName: req.body.data.organizationName,
      contact: req.body.data.contact,
      link: req.body.data.link,
      address: req.body.data.address,
      skill: req.body.data.skill,
      location: req.body.data.location,
      image: req.body.data.image,
      type: req.body.type,
    });
    await newUser.save();
    res.status(201).json({ message: req.body.type + " registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  registerUser,
};
