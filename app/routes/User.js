import express from "express";
// import {createUser, updateProfile} from "../controllers/Database.js"; 
import { login, register } from "../controllers/UserController.js";
import loginMiddleware from "../middleware/Session.js"; 


const userRoutes = express.Router();

userRoutes.post('/login', async (req, res) => {
    const {result, message} = await login(req.body);
    if (result === 'success') {
        req.session.user = { user_id: req.body.user_id };
        console.log(message);
        res.send('/');
    }
    else {
        console.log(message);
    }
});

userRoutes.post('/user', async (req, res) => {
    const {result, message} = await register(req.body);
    if (result === 'success') {
        console.log(message);
        res.send('/');
    }
    else {
        console.log(message);
        res.send('/');
    }
});

// userRoutes.post('/updateProfile', loginSessionCheck, (req, res) => {
//     if (req.loginSessionError) {
//         console.log("로그인 세션이 유효하지 않음.");
//     } else {
//         updateProfile(req.body.user_id, req.body.name, req.body.profile_picture_url, (result) => {
//             if (result.success) {
//                 console.log(result.message); 
//             } else {
//                 console.log(result.message); 
//             }
//         });
//     }
// });

export default userRoutes;