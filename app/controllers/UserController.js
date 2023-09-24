import {validationLoginCheck} from "../util/validationCheck.js"; 
import {validationRegisterCheck} from "../util/validationCheck.js"; 

export function login(req) {
	validationLoginCheck();

	const {user_id, password} = req;
	if (validationLoginCheck(user_id, password)) {
		console.log("아이디나 비밀번호의 형식이 맞지 않습니다.");
	}

	// 1. user_id로 Model에 전달에서 암호화된 비밀번호를 가져온다.
	// 2. DB로 암호화된 password를 받으면, req.password를 암호화한다.
	// 3. 두 암호화된 패스워드 글자가 동일한지 확인.
	// 4. 동일하면 세션에 로그인 정보를 넣는다.
	// 5. resp 로 로그인 성공했다는 메시지를 전송.
	return { result: "success", };
}

function register (req, res) {
	// 회원가입하는 로직들
}