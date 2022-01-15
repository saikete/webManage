import Element from './index.vue'
import create from '../utils/create'
import {
  isString
} from '../utils/data-type'

function loadingCreate(content) {
  
  if (!isString(content) && content == '') {
    return
  }

  let props = {
    content: content
  }
  const loading = create(Element, props)
  loading.$on('onClose', loading.remove)
  return loading
}


export default loadingCreate