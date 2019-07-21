import { HTTP } from '../utils/http-p.js'
class KeywordModel extends HTTP{
  key = 'q'
  maxLength = 10
  // 获取历史搜索
  getHistory() {
    const words = wx.getStorageSync(this.key);
    if(!words) {
      return [];
    }
    return words;
     
  }
  // 获取热门搜索
  getHot() {
    return this.request({
      url: '/book/hot_keyword'
    })
  }
  // 添加历史搜索
  addHistory(keyword){
    if (!keyword || !keyword.trim()){
      return;
    }
    let words = this.getHistory(this.key);
    const has = words.includes(keyword);
    if(!has) {
      // 队列实现
      const length = words.length;
      if (length >= this.maxLength){
        words.pop()
      }
      words.unshift(keyword);
      wx.setStorageSync(this.key, words)
    }
  }
}
export {KeywordModel}