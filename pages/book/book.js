// pages/book/book.js
import {BookModel} from '../../models/book.js'
import {random} from '../../utils/common.js'
const bookeModel = new BookModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching: false,
    more: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取热门书籍
    bookeModel.getHotList().then((res) => {
      this.setData({
        books: res
      })
    })
    // promise测试
    // const hotList = bookeModel.getHotList();
    // hotList.then((res) => {
    //   console.log(res);
    //   return bookeModel.getBookCount();
    // })
    // .then((res) => {
    //   console.log(res);
    // })
  },

  // async onLoad(options) {
  //   // 获取热门书籍
  //   // bookeModel.getHotList() 返回的是一个promise
  //   const books = await bookeModel.getHotList(); 
  //   this.setData({
  //     books
  //   })
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // promise试用
    // const promise = new Promise((resolve, reject) => {
    //   wx.getSystemInfo({
    //     success:(res) => {
    //       resolve(res);
    //     },
    //     fail: (error) => {
    //       reject(error);
    //     }
    //   })
    // })

    // 调用promise
    // promise.then((res) => {
    //   console.log(res);
    // }, (error) => {
    //   console.log(error);
    // })
  },
  // 点击查询书籍详情
  onTap: function (event) {
    const bId = event.detail.bId;
    wx.navigateTo({
      url: `/pages/book-detail/book-detail?bId=${bId}`
    })
  },
  // 搜索书籍
  onSearching: function(){
    this.setData({
      searching: true
    })
  },
  // 取消
  onCancel: function(){
    this.setData({
      searching: false
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log(12)
    this.setData({
      more: random(16)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})