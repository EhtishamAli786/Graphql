import bcrypt from "bcryptjs";
import { generateAccessToken } from "../utils";
const express = require("express");
let router = express.Router();

const { UserModel } = require("../models");
const saltRounds = 10;
router.get("/all", function (req, res) {
  UserModel.find({}, function (err, users) {
    if (!err) {
      return res.status(200).send({ res: users });
    }
    return res.status(201).send("Failed to get all users");
  });
});
router.post("/login", function (req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(201)
      .send({ message: !email ? "Email not found" : "Password not found" });
  }
  UserModel.findOne({ email }, function (err, user) {
    if (!!err || !user) {
      return res.status(201).send({
        message: !!err ? "Error occured" : "Failed to get single user",
      });
    } else {
      bcrypt.compare(password, user.password, function (e, isMatch) {
        if (e) {
          return res.status(201).send("Error occured");
        }
        if (isMatch) {
          const token = generateAccessToken(user._id);
          return res.status(200).send({ res: user, token });
        }
        return res.status(201).send("Failed to get single user");
      });
    }
  });
});
router.post("/signup", function (req, res) {
  const { email, password, fullname } = req.body;
  if (!email || !password) {
    return res
      .status(201)
      .send({ message: !email ? "Email not found" : "Password not found" });
  }
  UserModel.findOne({ email }, function (err, user) {
    if (!!err || !!user) {
      return res
        .status(201)
        .send({ message: !!err ? "Error occured" : "User email exists" });
    } else {
      bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
          return res.status(201).send({ message: "Error occured", err });
        } else {
          bcrypt.hash(password, salt, function (err, hashedPassword) {
            if (err) {
              return res.status(201).send({ message: "Error occured", err });
            } else {
              const newUser = new UserModel({
                email,
                fullname,
                password: hashedPassword,
              });
              newUser.save(function (err) {
                if (err) {
                  return res
                    .status(201)
                    .send({ message: "User creation failed", err });
                }
                return res.status(200).send("Account Created Successfully");
              });
            }
          });
        }
      });
    }
  });
});
export const userroute = router;
