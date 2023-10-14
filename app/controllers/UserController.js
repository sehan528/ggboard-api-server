import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import {validationLogin, validationRegister} from "../util/Validation.js"; 
import {userExists, compareLogin, createAccount} from "../service/Database.js"


export async function login(req) {
	const {user_id, password} = req;
	console.log(user_id, password);

	if (!validationLogin(user_id, password)) {
		return { result: "failed", message: '유효성검사 만족하지 못함.' };
	}
	const hashedPassword = bcrypt.hash(password, 12);

	const isDuplicate = await compareLogin(user_id, hashedPassword);
	if(isDuplicate) {
		return { result: "success", message: '로그인 성공' };
	}

	return { result: "failed", message: '없는 계정 입니다.' };

	// 1. user_id로 Model에 전달에서 암호화된 비밀번호를 가져온다.
	// 2. DB로 암호화된 password를 받으면, req.password를 암호화한다.
	// 3. 두 암호화된 패스워드 글자가 동일한지 확인.
	// 4. 동일하면 세션에 로그인 정보를 넣는다.
	// 5. resp 로 로그인 성공했다는 메시지를 전송.
}

export async function register (req, res) {
	const {user_id, password, nickname, email} = req;
	// console.log(user_id, password, nickname, email);
	if(!validationRegister(user_id, password, nickname, email)) {
		return { result: "failed", message: '유효성검사 만족하지 못함.' };
	};


	try {
		const duplicateUser  = await userExists(user_id, email);

		if (duplicateUser) {
			return { result: "failed", message: '이미 중복되는 계정이 있음' };
		}
		
		const hashedPassword = await bcrypt.hash(password, 12);
		const result = await createAccount(user_id, nickname, hashedPassword, email);
		return { result: "success", message: '회원가입 성공'};
	} catch (error) {
		console.error('Error creating user:', error);
		return { result: "failed", message: '회원가입 실패' };
	}
}