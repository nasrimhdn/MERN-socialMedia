import bcrypt from "bcrypt"; //this allow us to encrypt our password 
import jwt from "jsonwebtoken"; //this will give us a way to send the user a web token  they will use for authorization
import User from "../models/User.js"; // this is user model from models folder

/* REGISTER USER 
req will give us the request body that we got from the frontend 
res what we are going to send back to the frontend
express provide this by default  */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body; // we will grab this from req body from the frontend when they send request 
                 
    const salt = await bcrypt.genSalt(); //this give us random salt provided by bcrypt and we are going to use this salt to incrypt our password
    const passwordHash = await bcrypt.hash(password, salt); /*   */
/*  the way this register func will work 
-we gonna encrypt the password 
-we are gonna save it 
- after when we save it when the user trys to login 
-we are gonna provide the password 
-we are gonna salt that again 
-we gonna make sure thats the correct one 
-and then give them a json web token  */
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } 
  catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // we grab the email and pass when the user try to login
    const user = await User.findOne({ email: email }); //we gonna use mongoose to find the one with the this email 

    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password); //this is gonna detrmine if we mach the password 
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
/*   we sign the token with the user id 
and the secret we write it in the env.file
the secret could be anything you want any type of string 
and then we delete the password so it dosnt send back to the front end */
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};