-- CreateTable
CREATE TABLE "countries" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes" (
    "like_id" BIGSERIAL NOT NULL,
    "user_id" VARCHAR(100),
    "post_id" BIGINT,
    "created_date" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("like_id")
);

-- CreateTable
CREATE TABLE "post_files" (
    "file_id" BIGSERIAL NOT NULL,
    "post_id" BIGINT,
    "file_url" TEXT,
    "file_name" TEXT,
    "delete_date" TIMESTAMPTZ(6),
    "created_date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "post_files_pkey" PRIMARY KEY ("file_id")
);

-- CreateTable
CREATE TABLE "posts" (
    "post_id" BIGINT NOT NULL,
    "user_id" VARCHAR(100),
    "content" TEXT,
    "created_date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" VARCHAR(100) NOT NULL,
    "name" VARCHAR(15) NOT NULL,
    "pw" TEXT NOT NULL,
    "profile_picture_url" TEXT,
    "created_date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT,
    "delete_date" TIMESTAMPTZ(6),
    "ban_date" TIMESTAMPTZ(6),

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("post_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "post_files" ADD CONSTRAINT "post_files_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("post_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

