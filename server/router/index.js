const { SuccessModel, ErrorModel } = require('../model/resModel')
const express = require('express');
const router = express.Router()
const path = require('path')
const fs = require('fs')
const { login, register } = require('../db')
router.get('/api/getCode', (req, res) => {
  if (!req.query.cName && !req.query.uName) {
    return res.send({
      msg: 'cName和cName至少有一个！',
      status: 0
    })
  }
  let html = ''
  if (req.query.cName)
    html = fs.readFileSync(path.resolve(__dirname, `../../src/hyComponentsDemo/${req.query.cName}.vue`)).toString()
  else if (req.query.uName)
    html = fs.readFileSync(path.resolve(__dirname, `../../src/utilsDemo/${req.query.uName}.js`)).toString()
  res.send({
    data: html,
    status: 1
  })
})

// /api/download?cName=hyButton
router.get('/api/download', (req, res) => {
  if (!req.query.cName) {
    return res.send({
      msg: 'cName不能为空！',
      status: 0
    })
  }
  res.download(path.resolve(__dirname, `../../src/hyComponents/${req.query.cName}/${req.query.cName}.vue`))
})

router.post('/api/login', (req, res) => {
  if (!req.body.userName || !req.body.password) {
    res.send({
      msg: '用户名或密码不能为空',
      status: 0
    })
  } else {
    login(req.body).then(result => {
      if (result && result.length)
        res.send({
          status: 1,
          msg: '登陆成功'
        })
      else
        res.send({
          msg: '用户名或密码错误',
          status: 0
        })
    })
  }
})
router.post('/api/register', (req, res) => {
  if (!req.body.userName || !req.body.password) {
    res.send({
      msg: '用户名或密码不能为空',
      status: 0
    })
  } else {
    register(req.body).then(result => {
      if (result && result.affectedRows)
        res.send({
          msg: '注册成功',
          status: 1
        })
      else
        res.send({
          msg: '注册失败，用户已存在',
          status: 0
        })
    }).catch(err => {
      res.send({
        msg: '注册失败，多半是后台崩了',
        status: 0
      })
    })
  }
})
module.exports = router