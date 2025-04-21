import { Request, Response } from "express";
import bcrypt from "bcrypt"
import userModel from "../models/user.model.js";
import { signJwt, verifyJwt } from "./jwt.service.js";
import { User } from "../types/user.js";    

// api handlers 
async function loginHandler(req : Request , res : Response) {
    const {email , password} = req.body


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const { _doc } = user as any;
        const {__v , password : userPassword , ...userData} = _doc       
         const token = signJwt(userData);

        res.json({
            data: userData,
            token,
            message: "Login successful"
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

async function registerHandler(req : Request , res : Response) {
    const user : User = req.body

    if (!user.username || !user.email || !user.password || !user.phone) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (user.password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    const phoneRegex = /^[0-9]{9}$/;
    if (!phoneRegex.test(user.phone)) {
        return res.status(400).json({ message: "Phone number must be 9 digits" });
    }

    const hashedPassword = await bcrypt.hash(user.password , 10)

    let newUserObject = {...user , password : hashedPassword}

    try {

        const newUser = await userModel.create(newUserObject) as any;
        const {_doc} = newUser;
        const {__v , password , ...userData} = _doc
        const userJwt =  signJwt(userData)
        
        res.status(201).json({
            data : userData,
            token : userJwt,
            message : "Created Succesfully"
        })
    } catch (e) {
        if(e instanceof Error) {
            res.status(404).json({message : e.message})
        }
    }

}

//web handlers
async function webLoginHandler (req : Request , res : Response) {
    const {email , password} = req.body

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.render("pages/login/login.view.ejs", { 
            error: "Invalid email format",
            email: email
        });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.render("pages/login/login.view.ejs", { 
                error: "User not found",
                email: email
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.render("pages/login/login.view.ejs", { 
                error: "Invalid password",
                email: email
            });
        }

        const { _doc } = user as any;
        const {__v , password : userPassword , ...userData} = _doc       
        const token = signJwt(userData);

        // Set cookie with token
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
            path: '/' // Make sure the cookie is available for all paths
        });

        // Redirect to home page on success
        res.redirect('/');
    } catch (error) {
        res.render("pages/login/login.view.ejs", { 
            error: "Internal server error",
            email: email
        });
    }
}

async function webRegisterHandler(req: Request, res: Response) {
    const { username, email, phone, password } = req.body;

    // Validation
    if (!username || !email || !phone || !password) {
        return res.render("pages/register/register.view.ejs", {
            error: "All fields are required",
            username,
            email,
            phone
        });
    }

    if (password.length < 6) {
        return res.render("pages/register/register.view.ejs", {
            error: "Password must be at least 6 characters long",
            username,
            email,
            phone
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.render("pages/register/register.view.ejs", {
            error: "Invalid email format",
            username,
            email,
            phone
        });
    }

    const phoneRegex = /^[0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
        return res.render("pages/register/register.view.ejs", {
            error: "Phone number must be 9 digits",
            username,
            email,
            phone
        });
    }

    try {
        // Check if user already exists
        const existingUser = await userModel.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.render("pages/register/register.view.ejs", {
                error: "User with this email or username already exists",
                username,
                email,
                phone
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await userModel.create({
            username,
            email,
            phone,
            password: hashedPassword
        });

        // Generate token
        const { _doc } = newUser as any;
        const { __v, password: userPassword, ...userData } = _doc;
        const token = signJwt(userData);

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
            path: '/' // Make sure the cookie is available for all paths
        });

        // Redirect to home
        res.redirect('/');
    } catch (error) {
        console.error('Registration error:', error);
        res.render("pages/register/register.view.ejs", {
            error: "Internal server error",
            username,
            email,
            phone
        });
    }
}
async function logoutHandler(req: Request, res: Response): Promise<void> {
    res.clearCookie('token');
    res.redirect('/auth/login');
}

function getLoginView(req: Request, res: Response) {
    res.render("pages/login/login.view.ejs" , {error : null , email : null});
}

function getRegisterView(req: Request, res: Response) {
        res.render("pages/register/register.view.ejs", {
            error: null,
            username: null,
            email: null,
            phone: null
        });
}

export {loginHandler , registerHandler , getLoginView , webLoginHandler , webRegisterHandler , getRegisterView , logoutHandler}