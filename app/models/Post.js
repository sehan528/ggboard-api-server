import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function generatePost(user_id, content, photo, callback) {
    let post_id;

    try {
        // 마지막 글의 post_id를 찾아옵니다.
        const lastPost = await prisma.posts.findFirst({
            orderBy: {
                post_id: "desc"
            }
        });

        if (lastPost) {
            post_id = BigInt(lastPost.post_id) + 1n;
        } else {
            post_id = 0n;
        }

        // 새로운 글을 생성합니다.
        const post = await prisma.posts.create({
            data: {
                post_id: post_id,
                user_id: user_id,
                content: content,
                created_date: new Date(),
            },
        });

        if (photo.length > 0) {
            for (const fileUrl of photo) {
                await prisma.post_files.create({
                    data: {
                        post_id: post_id,
                        file_url: fileUrl,
                        delete_date: null,
                        created_date: new Date(),
                    },
                });
            }
        }

        callback({
            success: true,
            message: "업로드 성공",
        });
    } catch (error) {
        console.error('업로드 실패:', error);
        callback({
            success: false,
            message: "업로드 실패",
        });
    }
}

