import express from 'express'
import cors from 'cors'
import router  from './api/index.js'

const app = express()
import config from './config.js'

// 配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }))

// 配置跨域
app.use(cors())

app.use('/api', router)

app.listen(config.port, config.address, ()=> {
  console.log(`App start at ${config.address}:${config.port}`);
});