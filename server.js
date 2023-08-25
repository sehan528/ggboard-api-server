import dotenv from "dotenv";
dotenv.config();
import { createClient } from '@supabase/supabase-js';
import express from "express";
import { fileURLToPath } from "url";


const app = express();
const port = process.env.PORT || 3000;
app.use(express.json()); // 바디파서 대신

const __dirname = fileURLToPath(new URL(".", import.meta.url));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// (async () => {
//     // 'countries' 테이블에서 데이터 가져오기
//     const { data, error } = await supabase
//         .from('countries')
//         .select('*');

//     if (error) {
//         console.error('Error fetching data:', error);
//         return;
//     }

//     if (data) {
//         console.log('Fetched data:', data);
//         // 여기에서 데이터를 처리하거나 응답으로 보내는 등의 작업을 수행할 수 있습니다.
//     }
// })();

// -----------------

app.post('/user', async (req, res) => {
    // console.log(req.body);
    const { user_id, name, pw, profile_picture_url, email } = req.body;

    const { data, error } = await supabase
        .from('users')
        .insert([
            { user_id, name, pw, profile_picture_url, created_date: new Date(), email }
        ]);

    if (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'User creation failed' });
    } else {
        res.json({ message: 'User created successfully' });
    }
});

// 2. POST 요청 /login
app.post('/login', async (req, res) => {
    console.log(req.body);
    const { input_id, input_pw } = req.body;

    // 'users' 테이블에서 user_id와 일치하는 레코드 조회
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', input_id);

    if (error) {
        console.error('Error fetching data:', error);
        res.json({ message: 'Error occurred' });
        return;
    }

    if (data && data.length > 0) {
        const userRecord = data[0];
        if (userRecord.pw === input_pw) {
            res.json({ message: 'Login successful' });
        } else {
            res.json({ message: 'Incorrect password' });
        }
    } else {
        res.json({ message: 'User not found' });
    }
});

// 3. GET /posts
app.get('/posts', async (req, res) => {
    // 게시물 목록 조회 작업 수행
    res.json({ posts: [] }); // 실제 데이터로 대체
});

// 4. GET /posts/:id
app.get('/posts/:id', async (req, res) => {
    const postId = req.params.id;
    // 특정 게시물 조회 작업 수행
    res.json({ post: {} }); // 실제 데이터로 대체
});

// 5. POST "/upload_post"
app.post('/upload_post', async (req, res) => {
    const postData = req.body;
    // 게시물 업로드 작업 수행
    res.json({ message: 'Post uploaded successfully' });
});