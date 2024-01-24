const express = require('express');
const { Company, User } = require('../models');// index는 파일 이름 생략 가능 

const router = express.Router();

// 자기 회사 입력하기
router.post('/', async (req,res) => {
  try {
    const company = await Company.create(req.body);
    return res.status(201).json({ "id" : company.dataValues.id, "message": "회사 추가에 성공하였습니다." })
  } catch(err) {
    console.error(err);
    return res.status(500).json({
      "message": "회사 추가에 실패하였습니다."
    })
  }
})

// 회사 list (ranking)
router.get('/', async (req, res) => {
  try {
    const companies = await Company.findAll({
      order: [
        ['total_good_state_count', 'DESC']
      ]
    });
    return res.status(200).json(companies);
  } catch(err) {
    return res.status(501).json({ "message": "회사 불러오기에 실패하였습니다." });
  }
})

// 회사 하나 반환 (ranking)
router.get('/:company_id', async (req, res) => {
  try {
    const company = await Company.findOne({
      where: {
        id : req.params.company_id
      }
    });
    
    return res.status(201).json(company)
  } catch(err) {
    console.error(err);
    return res.status(500).json( { "message" : "회사 조회에 실패하였습니다." })
  }
})


module.exports = router;