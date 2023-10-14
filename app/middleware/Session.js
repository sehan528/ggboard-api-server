// import { searchUser } from "../controllers/Database.js";
import { login, register } from "../controllers/UserController.js";

// export function loginSessionCheck(req, res, next) {

//     const { user_id, password } = req.body;
//     console.log(user_id);

//     // 이전 단계 (유효성) 확인.
//     if (req.validationError == true) {
//         console.log("유효성 문제로 빠져나감.");
//         next();
//     }

//     // 세션 체크 하는 함수
//     // 이미 세션이 유효하여 True하다면 next() 그렇지 않다면 searchUser() 를 실행한다.

//     searchUser(user_id, password, (error, isValid) => {
//         if (isValid) {
//             console.log("계정 유효함. & 이후로 해당 계정에 대한 세션 생성 구현하세요.");
//             // 여기서 세션을 생성해주세요.
//             next();
//         } else {
//             console.log("존재하지 않는 계정입니다.");
//             req.loginSessionError = true;
//             next();
//         }
//     });
// }

export default function loginMiddleware(req, res, next) {
    if (req.session && req.session.user) {
        // 세션이 유효하면 다음 미들웨어 또는 핸들러를 호출
        next();
    } else {
        // 세션이 유효하지 않으면 로그인을 실행
        const { result, message } = login(req.body);
        console.log(result);
        if (result === 'success') {
            req.session.user = { user_id: req.body.user_id };
            console.log(message);
            next(); // 다음 미들웨어 또는 핸들러 호출
        } else {
            console.log(message);
            res.send('로그인 실패');
        }
    }
}
