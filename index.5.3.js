const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

// MySQL 연결 설정
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'asdf1234',
  database: 'train_reservation'
});

// GET /fare - 사용자의 총 요금 조회
app.get('/fare', async (req, res) => {
    try {
        const { uid } = req.query;
        // 사용자가 예매한 모든 티켓의 요금 합계 계산
        const [rows] = await pool.query(`
            SELECT SUM(ROUND(trains.distance * types.fare_rate / 1000)) AS total_fare
            FROM tickets
            JOIN trains ON tickets.train = trains.id
            JOIN types ON trains.type = types.id
            WHERE tickets.user = ?`, [uid]);
        // 결과가 없는 경우 (예매한 티켓이 없는 경우)
        const totalFare = rows[0].total_fare || 0;
        return res.send(`Total fare is ${totalFare} Won.`);
    } 
    catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// GET /train/status - 열차의 매진 여부 확인
app.get('/train/status', async (req, res) => {
    try {
        const { tid } = req.query;
    
        // 해당 열차의 예매된 좌석 수와 최대 좌석 수 조회
        const [rows] = await pool.query(`
            SELECT 
                COUNT(tickets.id) AS booked_seats,
                types.max_seats AS max_seats
            FROM trains
            JOIN types ON trains.type = types.id
            LEFT JOIN tickets ON trains.id = tickets.train
            WHERE trains.id = ?
            GROUP BY trains.id, types.max_seats`, [tid]);
            
    // 결과가 없는 경우 (존재하지 않는 열차 ID)
        if (rows.length === 0) {
            res.status(404).send('Train not found');
            return;
        }
    
        const { booked_seats, max_seats } = rows[0];
    
        // max_seats는 문자열로 저장되어 있으므로 정수로 변환
        const isSoldOut = parseInt(booked_seats, 10) >= parseInt(max_seats, 10);
        res.send(isSoldOut ? 'Sold out' : 'Not sold out');
    } 
    catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// 서버 시작
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});