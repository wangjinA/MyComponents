const mysql = require('mysql');
const conf = require('./config');
const pool = mysql.createPool(conf.mysql);
function getConnection(sql) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        return reject('连接数据库出错')
      }
      connection.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          console.log(sql);
          return reject('查询出错')
        }
        resolve(result)
      })
    })
  })
}

function isRes(res) {
  return res && res.length
}

module.exports = {
  login({ userName, password }) {
    let loginSql = `select * FROM  users WHERE userName='${userName}' AND password='${password}'`
    console.log(loginSql);
    return getConnection(loginSql)
  },
  register({ userName, password }) {
    let judgeSql = `select userName from users WHERE userName='${userName}'`
    return getConnection(judgeSql).then(res => {
      if (isRes(res)) {
        return ''
      } else {
        let registerSql = `insert into users (userName, password) VALUES ('${userName}', '${password}')`
        return getConnection(registerSql)
      }
    })

  }
}