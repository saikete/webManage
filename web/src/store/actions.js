import request from '@/utils/request'
import apiConfig from '@/utils/config'
const actions = {
  setGlobalLoading({ state }, globalLoading) {
    state.globalLoading = globalLoading
  },
  servers({ commit }, { name }) {
    return request.get(`${apiConfig.gametools.url}servers?name=${name}&region=all&platform=pc&limit=100&lang=zh-cn`).then(res => {
      return res
    })
  },
  players({ commit }, { name, gameid }) {
    return request.get(`${apiConfig.gametools.url}players?gameid=${gameid}&region=all&platform=pc&lang=zh-cn`).then(res => {
      return res
    })
  },
  detailedserver({ commit }, { name, gameid }) {
    return request.get(`${apiConfig.gametools.url}detailedserver?gameid=${gameid}&region=all&platform=pc&lang=zh-cn`).then(res => {
      return res
    })
  },
  checkban({ commit }, data) {
    return request.post(`${apiConfig.gametools.url}checkban`, data).then(res => {
      return res
    })
  }
}
 
export default actions