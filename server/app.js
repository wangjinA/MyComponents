/*
 * @Author: 汪锦
 * @Date: 2020-06-19 09:54:14
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-08-31 14:15:27
 * @Description: node-server
 */
const express = require('express')
const app = express()
const routes = require("./router");
const path = require('path')


// body解析中间件-------------------------
const bodyParser = require('body-parser');

var jsonParser = bodyParser.json(); // 创建application/json解析
var urlencodedParser = bodyParser.urlencoded({ extended: false }); // 创建application/x-www-form-urlencoded

app.use(jsonParser)
app.use(urlencodedParser)
// body解析中间件-------------------------


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