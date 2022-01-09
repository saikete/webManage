import request from './request.js'
import config from '../config.js'
const { gametools } = config.axiosApi

export default {
  getServers: (data) => request.get(`${gametools}servers`, { params: data })
}