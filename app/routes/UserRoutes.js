import express from "express";

import {validationLoginCheck} from "../controllers/validationCheck.js"; 
import {validationRegisterCheck} from "../controllers/validationCheck.js"; 
import loginSessionCheck from "../controllers/loginSessionCheck.js"; 
import {createUser, updateProfile} from "../controllers/Database.js"; 


const userRoutes = express.Router();

userRoutes.post('/login', validationLoginCheck, loginSessionCheck, (req, res) => {
    if (req.validationError || req.loginSessionError) {
        console.log("조건 만족하지 못함.");
    } 
    else {
        console.log("발급받은 세션으로 메인 페이지 리다이렉션 요청하라는 글");
    }
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