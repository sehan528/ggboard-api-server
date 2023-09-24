export function validationLoginCheck(req, res, next) {
    const { user_id, password } = req.body;
    console.log(user_id, password);

    const idPattern = /^[a-zA-Z0-9]{3,8}$/;
    const pwPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,15}$/;

    if (!idPattern.test(user_id) || !pwPattern.test(password)) {
        req.validationError = true; 
    }
    next();
}

export function validationRegisterCheck(req, res, next) {
    const { user_id, password, nickname, email } = req.body;

    const idPattern = /^[a-zA-Z0-9]{3,8}$/;
    const pwPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,15}$/;
    const nmPattern = /^[a-zA-Z0-9]{3,12}$/;
    const emPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    if (!idPattern.test(user_id) || !pwPattern.test(password) || !nmPattern.test(nickname) || !emPattern.test(email)) {
        req.validationError = true; 
    }
    next();
}
