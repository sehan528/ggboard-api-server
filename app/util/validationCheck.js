const idPattern = /^[a-zA-Z0-9]{3,8}$/;
const pwPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,15}$/;
const nickNamePattern = /^[a-zA-Z0-9]{3,12}$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function validationLoginCheck(userId, password) {
    console.log(userId, password);
    return idPattern.test(userId) && pwPattern.test(password);
}

export function validationRegisterCheck(userId, password, nickname, email) {
    return idPattern.test(userId) 
        && pwPattern.test(password) 
        && nickNamePattern.test(nickname) 
        && emailPattern.test(email);
}
