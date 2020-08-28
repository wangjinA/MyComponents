const { SuccessModel, ErrorModel } = require('../model/resModel')
const express = require('express');
const router = express.Router()
const path = require('path')
const fs = require('fs')
const { login, register } = require('../db')
const { sign, verify } = require('../config/token')
const compressing = require('compressing')
// 登录
router.post('/api/login', (req, res) => {
  if (!req.body.userName || !req.body.password) {
    res.send({
      msg: '用户名或密码不能为空',
      status: 0
    })
  } else {
    login(req.body).then(result => {
      if (result && result.length)
        res.send(new SuccessModel({
          userName: req.body.userName,
          ...sign(req)
        }, '登陆成功',
        ))
      else
        res.send(new ErrorModel('用户名或密码错误'))
    }).catch(err => {
      res.send(new ErrorModel(err))
    })
  }
})
// 验证token中间件
// router.use((req, res, next) => {
//   verify(req.headers.token).
//     then(code => {
//       next();
//     }).catch(err => {
//       res.status(304).send(new ErrorModel(err)).end()
//     })
// });
router.get('/api/getCode', (req, res) => {
  if (!req.query.cName && !req.query.uName) {
    return res.send(new ErrorModel('cName和cName至少有一个！'))
  }
  let html = ''
  if (req.query.cName)
    html = fs.readFileSync(path.resolve(__dirname, `../../src/hyComponentsDemo/${req.query.cName}.vue`)).toString()
  else if (req.query.uName)
    html = fs.readFileSync(path.resolve(__dirname, `../../src/utilsDemo/${req.query.uName}.js`)).toString()
  res.send(new SuccessModel({
    code: html
  }))
})

// /api/download?cName=hyButton
router.get('/api/download', (req, res) => {
  if (!req.query.cName) {
    return res.send({
      msg: 'cName不能为空！',
      status: 0
    })
  }
  let cName = req.query.cName.substring(0, req.query.cName.indexOf(".")) // 去除后缀
  const tarStream = new compressing.tar.Stream();
  // tarStream.addEntry('dir/path/to/compress');
  tarStream.addEntry(path.resolve(__dirname, `../../src/hyComponents/${cName}`));
  // res.send(`1`)
  tarStream.
    on('data', data => {
      res.write(data)
    }).on('end', () => {
      res.end()
    }).
    on('error', (err) => {
      res.send(new ErrorModel(err))
    })
  // .on('error', (err) => {
  //   console.log(err);
  // })
  // .pipe(fs.createWriteStream(path.resolve(__dirname, `../../src/hyComponents/${req.query.cName}.tar`)))
  // res.download(path.resolve(__dirname, `../../src/hyComponents/${req.query.cName}/${req.query.cName}.vue`))
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