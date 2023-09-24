import express from "express";

import loginSessionCheck from "../controllers/loginSessionCheck.js"; 
import {createUser, updateProfile} from "../controllers/Database.js"; 
import { login } from "../controllers/UserController.js";


const userRoutes = express.Router();

userRoutes.post('/login', logMiddleware, (req, res) => {
    const {result} = login(req);
    if (result === 'success') {
        res.redirect('/');
    }
    // error checking
});

userRoutes.put('/register', validationRegisterCheck, (req, res) => {
    if (req.validationError) {
        console.log("조건 만족하지 못함.");
    } else {
        createUser(req.body, (result) => {
            if (result.success) {
                console.log(result.message); 
            } else {
                console.log(result.message); 
            }
        });
    }
});

userRoutes.post('/updateProfile', loginSessionCheck, (req, res) => {
    if (req.loginSessionError) {
        console.log("로그인 세션이 유효하지 않음.");
    } else {
        updateProfile(req.body.user_id, req.body.name, req.body.profile_picture_url, (result) => {
            if (result.success) {
                console.log(result.message); 
            } else {
                console.log(result.message); 
            }
        });
    }
});

export default userRoutes;