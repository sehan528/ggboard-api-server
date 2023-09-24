import express from "express";

import loginSessionCheck from "../controllers/loginSessionCheck.js"; 
import { uploadPost } from "../controllers/Database.js";

const postsRoutes = express.Router();

postsRoutes.post('/upload', loginSessionCheck, (req, res) => {
    if (req.loginSessionError) {
        console.log("로그인 세션이 유효하지 않음.");
    } else {
        const { user_id, content, photo } = req.body;
        
        // 여기서 리사이징 해야될까? 아님 sessioncheck 다음 미들웨어로 req 내에서 해결해야될까?

        uploadPost(user_id, content, photo, (result) => {
            if (result.success) {
                console.log(result.message); 
            } else {
                console.log(result.message); 
            }
        });
    }
});

// 메인 피드 페이지 로드
// 함수: 로그인 성공 시, 게시글 불러오기
// 1. 로그인 확인
// 2. 피드 내 모든 게시글 DB로 부터 불러오기


// 회원 피드 페이지 로드
// 함수: 로그인 성공 시, 게시글 불러오기
// 1. 로그인 확인
// 2. 유저 피드 DB로 부터 불러오기


// 게시글 작성
// 함수: 로그인 성공 시, 게시글 작성
// 1. 로그인 확인
// 2. 게시글 작성 컨트롤러


// 좋아요 누르기
// 함수: 로그인 성공 시, 좋아요 액션
// 1. 로그인 확인
// 2. 좋아요 컨트롤러


// 좋아요 누른 글 내가 쓴 글 필터링
// 함수 : 로그인 성공 시, 필터링 액션 (누른값)
// 1. 로그인 확인
// 2. 누른 값 확인하기 + 맞는거 DB 뽑아주기.


// 파지네이숀
// 함수: 로그인 성공시, 파지네이션 (GPT야 도와줘)
// 문제점 = 회원의 좋아요, 내글 필터링 어떻게 포함할거임? 해당 함수에 분기별로 다 넣을거임? 별로일 거 같은데?



export default postsRoutes;




