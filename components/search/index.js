// components/search/index.js
import { KeywordModel } from '../../models/keyword.js'
import { BookModel } from '../../models/book.js'
import {paginationBev} from '../behaviors/pagination.js'
const keywordModel = new KeywordModel();
const bookModel = new BookModel();
Component({
  behaviors: [paginationBev],
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type:String,
      observer: "loadMore"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    hotWords: [],
    historyWords: [],
    // dataArray:[],
    searching: false,
    q: '',
    // loading: false,
    loadingCenter: false,
  },

  async attached(){
    // 获取历史搜索
    const historyWords = keywordModel.getHistory();
    // 获取热门搜索
    const hotWords = await keywordModel.getHot();
    this.setData({
      historyWords,
      hotWords:hotWords.hot
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 加载更多
    loadMore: function() {
      if (!this.data.q) {
        return;
      }
      // 锁的概念-未请求完不重复发
      if (this.isLocked()) {
        return;
      }
      if (this.hasMore()) {
        this.locked();
        bookModel.search(this.getCurrentStart(), this.data.q).then((res) => {
          this.setMoreData(res.books);
          this.unLocked();
        }, ()=>{
          this.unLocked();
        })
      }
      
    },
    // 取消
    onCancel: function(event) {
      this.initialize();
      this.triggerEvent('cancel');
    },
    // 提交搜索
    onConfirm: function(event) {
      // this.initialize();
      const keyword = event.detail.value || event.detail.text;
      this.setData({
        q: keyword,
      })
      this._showResult();
      this._showLoadingCenter();
      bookModel.search(0, keyword).then((res) => {
        this._hideLoadingCenter();
        keywordModel.addHistory(keyword);
        this.setMoreData(res.books);
        this.setTotal(res.total);
      })
    },
    // xx
    onDelete: function() {
      this.initialize();
      this._closeResult();
    },
    // 跳转到书籍详情
    onTapBook: function(event) {
      const bId = event.detail.bId;
      wx.navigateTo({
        url: `/pages/book-detail/book-detail?bId=${bId}`
      })
    },
    // 展示搜索
    _showResult: function() {
      this.setData({
        searching: true
      })
    },
    // 关闭搜索
    _closeResult() {
      this.setData({
        searching: false,
        q: ''
      })
    },
    // 展示中间的loading
    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },
    // 隐藏中间的loading
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    }, 
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log(12)
  }
})
