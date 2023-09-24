import { searchUser } from "../controllers/Database.js";

export default function loginSessionCheck(req, res, next) {

    const { user_id, password } = req.body;
    console.log(user_id);

    // 이전 단계 (유효성) 확인.
    if (req.validationError == true) {
        console.log("유효성 문제로 빠져나감.");
        next();
    }

    // 세션 체크 하는 함수
    // 이미 세션이 유효하여 True하다면 next() 그렇지 않다면 searchUser() 를 실행한다.

    searchUser(user_id, password, (error, isValid) => {
        if (isValid) {
            console.log("계정 유효함. & 이후로 해당 계정에 대한 세션 생성 구현하세요.");
            // 여기서 세션을 생성해주세요.
            next();
        } else {
            console.log("존재하지 않는 계정입니다.");
            req.loginSessionError = true;
            next();
        }
    });
}