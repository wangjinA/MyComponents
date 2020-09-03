const mysql = require('mysql');
const conf = require('./config');

function getConnection(sql) {
  const pool = mysql.createPool(conf.mysql);
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        return reject('连接数据库出错')
      }
      connection.query(sql, (err, result) => {
        // console.log(result);
        // console.log(sql);
        if (err) {
          console.log(err);
          return reject('查询出错')
        }
        resolve(result)
        pool.end();
      })
    })
  })
}

function isRes(res) {
  return res && res.length
}

module.exports = {
  // 登录
  login({ userName, password }) {
    let loginSql = `select * FROM  users WHERE userName='${userName}' AND password='${password}'`
    return getConnection(loginSql)
  },
  // 注册
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

  },
  // 获取echarts列表
  getEcharts({ pageNum = 1, pageSize = 20 }) {
    let SQL = `select * from echarts WHERE isRemove is null`
    return getConnection(SQL)
      .then(list => {
        return list.splice(pageSize * (pageNum - 1), pageSize).reverse()
      })
  },
  // 添加echarts
  addEcharts({ options, userName, id, bg }) {
    options = options.replace(/'/g, '"')
    let SQL = `insert into echarts (options, userName, bg) VALUES ('${options}', '${userName}', '${bg}')`
    if (id) {
      console.log(id);
      SQL = `UPDATE echarts set options='${options}',bg='${bg}' WHERE id=${id}`
    }
    return getConnection(SQL)
  },
  // 删除echarts
  deleteEcharts({ id, userName }) {
    let SQL = `UPDATE echarts set isRemove='${userName}' WHERE id=${id}`
    return getConnection(SQL)
  }
}