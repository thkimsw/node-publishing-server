const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// 메인 페이지
router.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../../public/pages/search.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('파일을 읽는 중 오류가 발생했습니다.');
      return;
    }
    res.send(data);
  });
});

// 다른 페이지
router.get('/report_view', (req, res) => {
  const filePath = path.join(__dirname, '../../public/pages/report_view.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('파일을 읽는 중 오류가 발생했습니다.');
      return;
    }
    res.send(data);
  });
});

module.exports = router; 