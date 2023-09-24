import userModel from '../models/userModel.js'
import bcrypt from 'bcrypt';
import { createToken } from "../lib/auth.js";

export async function createUserController (req,res) {
    try {
        const saltRound = 12;
        const salt = await bcrypt.genSalt(saltRound)
        const hashedSaltedPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashedSaltedPassword

        const newUser = userModel(req.body)
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)

    } catch (error) {
        res.status(500).json(error.message)
    }
}

export async function loginUserController (req,res) {
    try {
        const user = await userModel.findOne({email:req.body.email})
        console.log("user", user)

        if(user) {
            const isMatching = await bcrypt.compare(req.body.password, user.password)

            if(isMatching) {
                const token = await createToken({userId:user._id, userName:user.username},{expiresIn:"10m"});
                console.log(token)

                return res.status(200).cookie("jwt", token, {httpOnly:true}).json({message:"Login succesfull."})
            }
            return res.status(401).json({message:"Access denied! Invalid credentials."})
        } 
        return res.status(404).json({message:"User not found!"});
        
    } catch (error) {
        res.status(500).json(err)        
    }
}

export const logoutUserController = async (req, res) => {
    res.clearCookie('jwt');
    res.status(200).send({ msg: 'logged out, cookies cleared' });
  };


export async function getAllUsersController(req, res){
    console.log("register", req.register);
    const iatTimestamp = req.register.iat; 
    const iatDate = new Date(iatTimestamp * 1000); 
    console.log([iatDate]);
    try {
        const allRegisters = await userModel.find();
        res.status(200).json(allRegisters);
    } catch (error) {
        res.status(500).json(error);
    }
}