import Button from './button'
import Icon from './icon'
import Checkbox from './checkbox'
import CheckboxGroup from './checkbox/group'
import Card from './card'
import Dialog from './dialog'
import Tree from './tree'
import Input from './input'
import Tag from './tag'
import Avatar from './avatar'
import ListItem from './list'
import ListGroup from './list/group'
import Table from './table'
import Transfer from './transfer'
import Toast from './toast'
import Loading from './loading'
import Timeline from './timeline'
import TimelineItem from './timeline/item'

const components = {
  Button, Icon, Checkbox, CheckboxGroup, Card, Dialog, Tree, Input, Tag, Avatar, ListItem, ListGroup, Table, Transfer, Timeline, TimelineItem
}

const install = (Vue) => {
  Object.keys(components).map((key) => {
    const component = components[key]
    Vue.component(component.name, component)
  })
  Vue.prototype.$loading = Loading
  Vue.prototype.$toast = Toast
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

const ui = {
  install
}

Object.keys(components).map((key) => {
  const component = components[key]
  ui[component.name] = component
})

export default ui