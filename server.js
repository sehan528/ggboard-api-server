import dotenv from "dotenv";
dotenv.config();
import { createClient } from '@supabase/supabase-js';
import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

(async () => {
    // 'countries' 테이블에서 데이터 가져오기
    const { data, error } = await supabase
        .from('countries')
        .select('*');

    if (error) {
        console.error('Error fetching data:', error);
        return;
    }

    if (data) {
        console.log('Fetched data:', data);
        // 여기에서 데이터를 처리하거나 응답으로 보내는 등의 작업을 수행할 수 있습니다.
    }
})();
