import { generateUser } from '../models/User.js';
import { generatePost } from '../models/Post.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function searchUser(user_id, password, callback) {
    try {
        const user = await prisma.users.findFirst({
            where: {
                user_id: user_id,
                pw: password,
            },
        });

        if (user) {
            callback(null, true); // 사용자 정보 일치
        } else {
            callback(null, false); // 사용자 정보 불일치
        }
    } catch (error) {
        callback(error, false); // 에러가 발생하면 false를 반환합니다.
    }
}

export async function createUser(req, callback) {
    const { user_id, password, nickname, email } = req;
    const result = await generateUser(user_id, password, nickname, email);
    callback(result); // 결과를 콜백으로 전달
}

export async function updateProfile(user_id, nickname, profile_picture_url, callback) {
    try {
        // user_id로 사용자를 찾아서 업데이트
        const user = await prisma.users.update({
            where: {
                user_id: user_id,
            },
            data: {
                name: nickname,
                profile_picture_url: profile_picture_url,
            },
        });
        if (user) {
            callback({
                success: true,
                message: "프로필 업데이트 성공",
            });
        } else {
            callback({
                success: false,
                message: "사용자를 찾을 수 없음",
            });
        }
    } catch (error) {
        console.error('프로필 업데이트 실패:', error);
        callback({
            success: false,
            message: "프로필 업데이트 실패",
        });
    }
}

export function uploadPost(user_id, content, photo, callback) {
    generatePost(user_id, content, photo, (result) => {
        callback(result);
    });
}