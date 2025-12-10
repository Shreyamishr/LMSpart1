// import User from "../model/userModel.js"
// import validator from "validator"
// import bcrypt from "bcryptjs"
// import genToken from "../config/token.js"

// export const signUp=async(req,res)=>{
//     try{
//         const{name,email,password,role}=req.body
//         let existUser=await User.findOne({email:email})
//         if(existUser){
//             return res.status(400).json({message:"user alredy exist"})

//         }
//         if (!validator.isEmail(email)){
//             return res.status(400).json({message:"invalid email"})

//         }
//         if (password.length<8){
//             return res.status(400).json({message:"enter strong password"})
//         }
//         let hashPassword=await bcrypt.hash(password,10)
//         const user =new User.create({
//             name,
//             email,
//             password:hashPassword,
//             role

//         })

// let token=await genToken(user._id)
// req.cookie("token",token,{
//     httponly:true,
//     secure:false,
//     sameSite:"strict",
//     maxAge:7*24*60*60*1000
// })
// return res.status(201).json({user})
//     }catch(error){
//         console.res.status(500).json({message:"signup failed"})
//     }
    
// }
// export const login=async(req,res)=>{
//     try{
//         const{email,password}=req.body
//         let user=await User.findOne({email:email})
//         if(!User){
//             return res.status(400).json({message:"user not found"}

//             )
//         }
//         let isMatch=await bcrypt.compare(password,user.password)
//         if (!isMatch){
//             return res.status(400).json({message:"invalid password"}

//             )
//         }
//         let token=await genToken(user._id)
//         res.cookie("token",token,{
//         httponly:true,
//         secure:false,
//         sameSite:"strict",
//         maxAge:7*24*60*60*1000
// })
// return res.status(200).json({user})

//     }catch(error){
//          return res.status(500).json({message:"login failed"})
//     }
// }

// export const logOut=async(req,res)=>{
//     try{
//         await res.clearCookie("token")
//         return res.status(200).json({message:"logout sucessful"})


//     }
//     catch(error){
//         return  res.status(500).json({message:"logout failed"})
//     }
// }
import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";

export const signUp = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // check existing user
        let existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email" });
        }

        // validate password
        if (!password || password.length < 8) {
            return res.status(400).json({ message: "Enter strong password (8+ chars)" });
        }

        // hash password
        let hashPassword = await bcrypt.hash(password, 10);

        // create user
        const user = await User.create({
            name,
            email,
            password: hashPassword,
            role
        });

        // generate token
        let token = await genToken(user._id);

        // set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json({ user });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Signup failed", error: error.message });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        let token = await genToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({ user });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Login failed" });
    }
};


export const logOut = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Logout successful" });

    } catch (error) {
        return res.status(500).json({ message: "Logout failed" });
    }
};
