// components/book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book: Object,
    showLike: {
      type: Boolean,
      value: true
    }
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
    // 点击了书籍
    onTap: function(event) {
      const bId = this.properties.book.id;
      // 微信页面跳转
      this.triggerEvent('onTap', {
        bId
      })
      // wx.navigateTo({
      //   url: `/pages/book-detail/book-detail?bId=${bId}`
      // })
    }
  }
})
