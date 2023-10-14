const id = /^[a-zA-Z0-9]{3,8}$/;
const passWord = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,15}$/;
const nickName = /^[a-zA-Z0-9]{3,12}$/;
const e_mail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function validationLogin(userId, password) {
    return id.test(userId) && passWord.test(password);
}

export function validationRegister(userId, password, nickname, email) {
    return id.test(userId) 
        && passWord.test(password) 
        && nickName.test(nickname) 
        && e_mail.test(email);
}
