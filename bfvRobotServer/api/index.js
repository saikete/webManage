import express from 'express'
import knex from '../mysql/index.js'
const router = express.Router()
import crypto from 'crypto'
import axiosRequest from '../axios/index.js'

// 初始化服务器，机器人获取code， 绑定服务器
router.post('/initServer', async (req,res) =>{
  const query = req.query
  const { serverName, gameAdminPid, gameAdminName } = query
  const servers = await knex('server').select().where({ gameAdminPid })
  if(servers.length) {
    res.send({
      status: 0,
      message: 'error, server is already exists, please update at admin page'
    })
  }else {
    const code = crypto.randomUUID()
    const result = await knex('server').insert({ code, serverName, gameAdminName, gameAdminPid })
    console.log(result)
    res.send({
      status: 1,
      message: 'successful',
      data: {code}
    })
  }
})

// 获取服务器信息
router.get('/getRobotServers', async(req, res)=>{
  let { servers } = await axiosRequest.getServers({ name: '[BFV ROBOT]', limit: 100 })
  let result = await knex.select('*').from('server').innerJoin('server_group', 'server.groupId', 'server_group.groupId')
  result = result.filter(item => item.isValid == 1)
  servers = servers.map(item => {
    const robotServer = result.find(i => i.serverName == item.prefix) || {}
    delete robotServer.code
    delete robotServer.gameAdminPid
    return { ...item, ...robotServer }
  })
  res.send({
    status: 1,
    message: 'successful',
    data: servers
  })
})

// 机器人服务器验证
router.get('/serverValid', async (req, res)=> {
  const { serverName, code, gameAdminPid } = req.query
  const servers = await knex('server').select().where({ gameAdminPid, code, serverName, isValid: 1, ban: 0 })
  console.log(servers)
  if(servers.length) {
    res.send({
      status: 1,
      message: 'successful'
    })
  }else {
    res.send({
      status: 0,
      message: 'error, server is not verified or created'
    })
  }
})

// 创建用户和群组，用户绑定服务器
router.post('/createdUser', async (req, res) => {
  const { serverName, code, gameAdminPid, name, password, qq, shortName, qqGroup = '' } = req.query
  const result = await knex('server').where({ gameAdminPid }).andWhere({ code }).andWhere({ serverName })
  if(result.length) {
    const user = await knex('user').select().where({ qq }).orWhere({ name })
    if(user.length) {
      res.send({
        status: 0,
        message: 'error, user name or user qq already exists'
      })
    }else {
      const group = await knex('server_group').select().where({ shortName }).orWhere({ qqGroup })
      if(group.length) {
        res.send({
          status: 0,
          message: 'error, server group already exists'
        })
      }else {
        const user = await knex('user').insert({ name, password, qq })
        const groupId = await knex('server_group').insert({ shortName, qqGroup, userId: user[0] })
        await knex('server').where({ code }).update({ groupId: groupId[0]})
        res.send({
          status: 1,
          message: 'successful'
        })
      }
    }
  } else {
    res.send({
      status: 0,
      message: 'error, server is not verified or created'
    })
  }
})

// 管理员验证服务器
router.post('/validServer', async (req, res) => {
  const { serverId, serverName = '' } = req.query
  const result = await knex('server').where({ serverId }).orWhere({ serverName }).update({ isValid: 1})
  res.send({
    status: 1,
    message: 'successful'
  })
})

// 获取普通服务器列表
router.post('/getServers', async (req, res) => {
  const { name } = req.query
  let { servers } = await axiosRequest.getServers({ name, limit: 30 })
  res.send({
    status: 1,
    message: 'successful',
    data: servers
  })
})

// 登录
router.post('/login', async (req, res) => {
  const { name, password } = req
  // const resulte = await knex('server').select().where({ password }).andWhere({ name }).orWhere()
  console.log(resulte)
  res.send({
    status: 1,
    message: 'successful',
    data: { name, password }
  })
})

export default router



/**
 *  机器人第一次打开 初始化 initServer
 *  去网页登录 根据返回的code 进行服务器绑定 createdUser
 *  管理员 对 绑定的服务器验证 validServer
 *  认证完成以后 机器人来服务器验证是否可以使用 serverValid
 * 
 *  qq机器人获取服务器列表 getServers
 */

/**
 * 
 *    踢人：
 *      机器人请求api 获取 玩家列表 然后在服务端直接做了白名单黑名单这些权限筛选，处理完结果以后发送给机器人， 然后机器人拿到踢人名单。
 *      网页发送请求到网页服务端然后转发给socket服务端，再通过socket 转发给机器人本地
 *      qq机器人监听qq群 拿到q群在判断指令对应机器人， 再通过socket 转发给机器人本地
 *      机器人本地拿到线上的名单本地 把本地拿到的玩家数据通过白名单和规则对比逻辑处理
 *      
 *    名单，机器人限制规则：
 *      机器人启动拿一次 socket 也请求刷新一次
 *      网页操作，或者qq群操作以后更新数据库在通过socket通知机器人去刷新本地名单 socket服务端那边只需要留一个通知的接口负责转发就行了。甚至通知的类型都不用自己做，给调用那边自定义
 * 
 *    
 * 
 */
