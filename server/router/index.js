const { SuccessModel, ErrorModel } = require('../models/resModel')
const express = require('express');
const router = express.Router()
const path = require('path')
const fs = require('fs')
const { login, register, getEcharts, addEcharts, deleteEcharts } = require('../db')
const { sign, verify } = require('../models/token')
const compressing = require('compressing');
const { setUsers } = require('../models/globalVariable')

/**
 * @api {post} /api/login 用户登录
 * @apiDescription 用户登录
 * @apiName login
 * @apiGroup User
 * @apiParam {string} userName 用户名
 * @apiParam {string} password 密码
 * @apiSuccess {json} data 数据
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "status" : 1,
 *      "data" : {
 *          "name" : "loginName",
 *          "password" : "loginPass"
 *      }
 *  }
 * @apiSampleRequest http://localhost:3000/api/login
 * @apiVersion 1.0.0
 */
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
          userInfo: result[0],
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

// 注册
router.post('/api/register', (req, res) => {
  if (!req.body.userName || !req.body.password) {
    res.send(new ErrorModel('用户名和密码不能为空'))
  } else {
    register(req.body).then(result => {
      if (result && result.affectedRows) {
        res.send(new SuccessModel({}, '注册成功'))
        login(req.body).then(result => {
          if (result && result.length)
            setUsers(result[0]) // 创建用户之后更新一下用户表缓存
        })
      }
      else
        res.send(new ErrorModel('注册失败，用户已存在'))
    }).catch(err => {
      res.send(new ErrorModel('注册失败，多半是后台崩了'))
    })
  }
})
// /api/download?cName=hyButton
router.get('/api/download', (req, res) => {
  console.log('download');
  let cName = req.query.cName
  if (!cName) {
    return res.send(new ErrorModel('cName不能为空！'))
  }
  cName = cName.substring(0, cName.indexOf(".")) // 去除后缀
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

// 验证token中间件
router.use('/api*', (req, res, next) => {
  console.log('checkToken');
  verify(req.headers.token).
    then(code => {
      next();
    }).catch(err => {
      console.log(err);
      res.status(304).send(new ErrorModel(err)).end()
    })
});
// 获取示例代码
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
// 获取echarts列表
router.get('/api/getEcharts', (req, res) => {
  console.log(req.query);
  getEcharts(req.query)
    .then(list => {
      res.send(new SuccessModel(list))
    }).catch(err => {
      res.send(new ErrorModel(err))
    })
})
// 添加echarts
router.post('/api/addEcharts', async (req, res) => {
  // console.log(req.body);
  let userName = (await verify(req.headers.token)).userName
  addEcharts({ ...req.body, userName })
    .then(result => {
      if (result && result.affectedRows)
        res.send(new SuccessModel({}, '保存成功'))
      else
        res.send(new ErrorModel('保存失败'))
    }).catch(err => {
      res.send(new ErrorModel(err.toString()))
    })
})
// 删除echarts
router.post('/api/deleteEcharts', async (req, res) => {
  let userName = (await verify(req.headers.token)).userName
  deleteEcharts({ ...req.body, userName })
    .then(result => {
      if (result && result.affectedRows)
        res.send(new SuccessModel({}, '删除成功'))
      else
        res.send(new ErrorModel('删除失败'))
    }).catch(err => {
      res.send(new ErrorModel(err.toString()))
    })
})
// 获取socket在线成员
router.get('/api/socketOnline', (req, res) => {
  res.send(new SuccessModel(
    Object.keys(global.arrAllSocket).map(userId => global.users[userId])
  ))
})
module.exports = router