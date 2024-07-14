<template>
  <!-- element-ui级联组件 -->
  <el-cascader
    :value="value"
    :options="treeData"
    :props="props"
    separator="-"
    @change="handleChange"
  />
</template>

<script>
import { getDepartmentInfo } from '@/api/department'
import { transListToTreeData } from '@/utils'

export default {
  // 接收父组件传过来的value属性，v-model双向绑定两个步骤之一
  props: {
    value: {
      type: Number, // 存储的是部门的id  3 4 5
      default: null
    }
  },
  data() {
    return {
      treeData: [], // 赋值给 级联组件的options
      props: {
        expandTrigger: 'hover', // hover 触发子菜单
        value: 'id', // 要存储的字段
        label: 'name' // 要展示的字段
      }
    }
  },
  created() {
    this.getDepartmentInfo()
  },
  methods: {
    async getDepartmentInfo() {
      this.treeData = transListToTreeData(await getDepartmentInfo(), 0)
    },
    // 子组件值改变，通知父组件，触发父组件input事件，v-model双向绑定两个步骤之一
    handleChange(list) {
      // 取到数组的最后一次
      if (list.length > 0) {
        // 监听input事件
        this.$emit('input', list[list.length - 1]) // 将最后一位的id取出来 传出去
      } else {
        this.$emit('input', null) // 如果长度为0 说明值为空
      }
    }
  }
}
</script>
