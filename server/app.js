/*
* @Author: 汪锦
* @Date: 2020-06-19 09:54:14
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-09-08 12:04:47
* @Description: node-server
*/
const express = require('express')
const app = express()
const routes = require("./router");
const path = require('path')
const logger = require('./models/logger')

// body解析中间件---------------------start
const bodyParser = require('body-parser');

var jsonParser = bodyParser.json(); // 创建application/json解析
var urlencodedParser = bodyParser.urlencoded({ extended: false }); // 创建application/x-www-form-urlencoded

app.use(jsonParser)
app.use(urlencodedParser)
// body解析中间件---------------------end


// 日志中间件-------------------------start
app.use((req, res, next) => {
  console.log(req.body);
  let paramsStr
  switch (req.method) {
    case 'GET':
      paramsStr = req.query
      break;
    case 'POST':
      paramsStr = req.body
      break;
    default:
      paramsStr = {}
      break;
  }
  logger.info(` ${req.method} - ${req.url} - ${JSON.stringify(paramsStr)} `)
  next()
})
// 日志中间件-------------------------end


app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public'), {
  maxAge: '2h'
}))

app.use(routes)


const PORT = 3000
app.listen(PORT, () => {
  console.log(`running http://localhost:${PORT} ...`);
})
