const express = require('express');
const { SelfTestResults } = require('../models');

const router = express.Router();

// Self Test Result 저장하기
router.post('/:diary_id', async (req, res) => {
  try {
    const selfTestResult = await SelfTestResults.create({
      diaryId: req.params.diary_id,
      ...req.body
    });
    return res.status(201).json(selfTestResult.dataValues);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ "message": "셀프 체크 테스트 결과 저장에 실패했습니다." });
  }
})

// Self Test Result 불러오기
router.get('/:diary_id', async (req, res) => {
  try {
    const selfTestResult = await SelfTestResults.findOne({
      where: {
        diaryId: req.params.diary_id
      }
    });
    return res.status(200).json(selfTestResult.dataValues);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ "message": "셀프 체크 테스트 결과 불러오기에 실패했습니다." });
  }
})

// self test result 수정하기
router.put('/:diary_id', async (req, res) => {
  const { st_answer1, st_answer2, st_answer3, st_answer4 } = req.body;

  try {
    const [updated] = await SelfTestResults.update({
      st_answer1,
      st_answer2,
      st_answer3,
      st_answer4,
      updatedAt: new Date(),
    }, {
      where: {
        diaryId: req.params.diary_id,
      }
    });

    if (updated) {
      const editedSelfTestResult = await SelfTestResults.findOne({
        where: {
          diaryId: req.params.diary_id,
        }
      });
      return res.status(200).json(editedSelfTestResult);
    } else {
      return res.status(404).json({ "message": "self_test_results 수정에 실패하였습니다." });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ "message": "글 수정하기에 실패하였습니다." });
  }
})

module.exports = router;
