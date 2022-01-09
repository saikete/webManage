import config from '../config.js'
import knex from 'knex'

export default knex({
  client: 'mysql', //指定knex要操作的数据库为MySQL
  connection: config.mysql
});