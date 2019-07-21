// components/tag/index.js
Component({
  options: {
    // 插槽设置
    multipleSlots: true
  },
  // 外部样式设置
  externalClasses: ['tag-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    text: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event) {
      this.triggerEvent('tapping', {
        text: this.properties.text
      })
    }
  }
})