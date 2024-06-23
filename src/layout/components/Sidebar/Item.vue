<script>
export default {
  name: 'MenuItem',
  functional: true, // 函数式组件
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  // 渲染函数
  render(h, context) {
    // 获取图标标题信息
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      if (icon.includes('el-icon')) {
        vnodes.push(<i class={[icon, 'sub-el-icon']} />)
      } else {
        // 渲染图标
        vnodes.push(<svg-icon icon-class={icon}/>)
      }
    }

    if (title) {
      // 渲染标题
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes // 返回渲染节点
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
