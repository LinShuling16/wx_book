// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean,
      value: false,
      observer: function () {
        // console.log('like改变了');
      }
    },
    count: {
      type: Number,
      value: 0,
      observer: function () {
        // console.log('count改变了');
      }
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: "images/like.png",
    noSrc: "images/like@dis.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击点赞
    onlike: function(event) {
      let count = this.properties.count;
      let like = this.properties.like;
      count = like ? count - 1 : count + 1;
      this.setData({
        count: count,
        like: !like
      })

      // 激活自定义事件
      let behavior = this.properties.like;
      this.triggerEvent('like', {
        behavior
      })
    }
  }
})
