const express = require('express');
const app = express();
const port = 3000;

// body 데이터를 파싱하기 위한 미들웨어 설정
app.use(express.urlencoded({ extended: true }));

// 객체를 문자열로 변환하는 함수
const stringifyObj = (obj) => {
    return Object.keys(obj).map(k => `${k}: ${obj[k]}`).join('\n');
};

// GET 요청 처리
app.get('/', (req, res) => {
    res.send(stringifyObj(req.query));
});

// POST 요청 처리
app.post('/', (req, res) => {
    res.send(stringifyObj(req.body));
});

// PUT 요청 처리
app.put('/', (req, res) => {
    res.send(stringifyObj(req.body));
});

// DELETE 요청 처리
app.delete('/', (req, res) => {
    res.send(stringifyObj(req.body));
});

// 서버 시작
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});