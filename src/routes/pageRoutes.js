const express = require('express');
const router = express.Router();
const path = require('path');

// 메인 페이지
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/pages/search.html'));
});

// 다른 페이지
router.get('/report_view', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/pages/report_view.html'));
});

module.exports = router; 