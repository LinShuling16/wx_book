// pages/classic/classic.js
import {
  ClassicModel
} from '../../models/classic.js'
import {
  LikeModel
} from '../../models/like.js'
let classicModel = new ClassicModel();
let likeModel = new LikeModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // test3 - 回调函数的写法
    classicModel.getLatest((res) => {
      // this.setData => 进行数据更新
      this.setData({
        classic: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    });
  },

  // 监听点击事件
  onLike: function(event) {
    // 点赞 or 取消点赞
    let behavior = event.detail.behavior;
    likeModel.like(behavior, this.data.classic.id,this.data.classic.type)
  },

  // 获取下一期
  onNext: function(event) {
    this._upDateClassic('next');
    // classicModel.getNext(this.data.classic.index, (res) => {
    //   this.setData({
    //     classic: res,
    //     latest: classicModel.isLatest(res.index),
    //     first: classicModel.isFirst(res.index)
    //   })
    // })
  },

  // 获取上一期
  onPrevious: function(event) {
    this._upDateClassic('previous');
    // classicModel.getPrevious(this.data.classic.index, (res) => {
    //   this.setData({
    //     classic: res,
    //     latest: classicModel.isLatest(res.index),
    //     first: classicModel.isFirst(res.index)
    //   })
    // })
    // console.log('上一期');
  },

  // 切换期刊
  _upDateClassic(nextPrevious) {
    classicModel.getClassic(nextPrevious, this.data.classic.index, (res) => {
      this._getLikeStatus(res.id, res.type);
      this.setData({
        classic: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },

  // 获取点赞状态
  _getLikeStatus: function(artID, category) {
    likeModel.getClassicLikeStatus(artID, category,
      (res) => {
        console.log(res, 'resresres----');
        this.setData({
          likeCount: res.fav_nums,
          likeStatus: res.like_status
        })
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})