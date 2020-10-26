const 公司 = {
  host: '10.44.50.21',
  port: 3306,
}
const 外网 = {
  host: '112.94.13.13',
  port: 29336,
}
module.exports = {
  mysql: {
    user: 'wj_test',
    password: 'wj_test',
    database: 'wjtest',
    ...公司
  }
};
