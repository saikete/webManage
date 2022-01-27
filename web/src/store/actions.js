import request from '@/utils/request'
import apiConfig from '@/utils/config'
import toast from '@/components/ui/toast/'
const actions = {
  setGlobalLoading({ state }, globalLoading) {
    state.globalLoading = globalLoading
  },
  servers({ commit }, { name }) {
    return request.get(`${apiConfig.gametools.url}bfv/servers?name=${name}&region=all&platform=pc&limit=100&lang=zh-cn`)
  },
  players({ commit }, { name, gameid }) {
    return request.get(`${apiConfig.gametools.url}bfv/players?gameid=${gameid}&region=all&platform=pc&lang=zh-cn`)
  },
  detailedserver({ commit }, { name, gameid }) {
    return request.get(`${apiConfig.gametools.url}bfv/detailedserver?gameid=${gameid}&region=all&platform=pc&lang=zh-cn`)
  },
  checkban({ commit }, data) {
    return request.post(`${apiConfig.gametools.url}bfban/checkban`, data )
  },
  getCheckban({ commit }, { id }) {
    return request.get(`${apiConfig.gametools.url}bfban/checkban?personaids=${id}`)
  },
  playersAllData({ commit }, { name = '', playerid = '', oid = '' }) {
    return request.get(`${apiConfig.gametools.url}bfv/all/?format_values=true&name=${name}&platform=pc&lang=zh-cn` ).catch(res => {
      toast('查询玩家出错，请检查玩家名称或者重试', 1.5)
    })
  }
}
 
export default actions
