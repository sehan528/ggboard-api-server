import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function checkDuplicateUser(user_id, email) {
    // user_id 또는 email이 중복되는 사용자를 조회합니다.
    const existingUser = await prisma.users.findFirst({
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
    return existingUser;
}

export async function generateUser(user_id, password, nickname, email) {
    try {
        // 중복 사용자 확인
        const existingUser = await checkDuplicateUser(user_id, email);

        if (existingUser) {
            console.log('이미 중복되는 계정이 있음');
            return { success: false, message: '이미 중복되는 계정이 있음' };
        }

        // 중복 사용자가 없으면 사용자 생성
        const user = await prisma.users.create({
            data: {
                user_id: user_id,
                name: nickname,
                pw: password,
                profile_picture_url: 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg',
                created_date: new Date(),
                email: email,
                delete_date: null,
                ban_date: null,
            },
        });
        console.log('User created:', user);
        return { success: true, message: '회원가입 완료' };
    } catch (error) {
        console.error('Error creating user:', error);
        return { success: false, message: '회원가입 실패' };
    }
}
