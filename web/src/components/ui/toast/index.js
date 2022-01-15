import Element from './index.vue'
import create from '../utils/create'
import {
  isString,
  isNumber
} from '../utils/data-type'

function toastCreate(content, duration) {
  if (!isString(content) && content == '') {
    return
  }

  let props = {
    content: content
  }

  if (isNumber(duration)) {
    props.duration = duration
  }

  const toast = create(Element, props)
  toast.$on('onClose', toast.remove)

  return toast.hide.bind(this)
}

// const methods = Object.keys(Element.data().iconType)
// const Toast = {}

// methods.forEach((key) => {
//   Toast[key] = (content, duration) => toastCreate(content, key, duration)
// })

export default toastCreate