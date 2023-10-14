import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/** 중복되는 데이터가 있을 경우, True를 반환합니다. */
export async function userExists(user_id, email) {
    // user_id 또는 email이 중복되는 사용자를 조회합니다.
    const result = await prisma.users.findFirst({
        where: {
            OR: [
                {
                    user_id: user_id,
                },
                {
                    email: email,
                },
            ],
        },
    });
    return result;
}

/** 중복되는 데이터가 있을 경우, True를 반환합니다. */
export async function compareLogin(user_id, password) {
    console.log(user_id, password);
    // user_id 또는 password가 중복되는 사용자를 조회합니다.
    const result = await prisma.users.findFirst({
        where: {
            OR: [
                {
                    user_id: user_id,
                },
                {
                    pw: password,
                },
            ],
        },
    });
    return result;
}

export async function createAccount(user_id, nickname, hashedPassword, email) {
    try {
        const user = await prisma.users.create({
            data: {
                user_id: user_id,
                name: nickname,
                pw: hashedPassword,
                profile_picture_url: 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg',
                created_date: new Date(),
                email: email,
                delete_date: null,
                ban_date: null,
            },
        });
        return { success: true, message: '회원가입 성공' };
    } catch (error) {
        console.error('Error creating user:', error);
        return { success: false, message: '회원가입 실패' };
    }
}