const paginationBev = Behavior({
  data: {
    dataArray: [],
    total: null,
    noneResult: false,
    loading: false
  },

  methods: {
    // 添加数据
    setMoreData(dataArray) {
      const tempArray =
        this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: tempArray
      })
    },
    // 获取当前的数据长度
    getCurrentStart() {
      return this.data.dataArray.length
    },
    // 共有多少数据
    setTotal(total) {
      this.data.total = total
      // 没有搜索到
      if (total == 0) {
        this.setData({
          noneResult: true
        })
      }
    },
    // 是否有更多的数据
    hasMore() {
      if (this.data.dataArray.length >= this.data.total) {
        return false
      } else {
        return true
      }
    },
    // 初始化数据
    initialize() {
      this.setData({
        dataArray: [],
        noneResult: false,
        loading: false
      })
      this.data.total = null
    },
    
    isLocked() {
      return this.data.loading ? true : false
    },

    locked() {
      this.setData({
        loading: true
      })
    },

    unLocked() {
      this.setData({
        loading: false
      })
    },

  }
})

export {
  paginationBev
}