import {HTTP} from '../utils/http-p.js'

class BookModel extends HTTP  {
  // 获取热门书籍
  getHotList(){
    return this.request({
      url: '/book/hot_list'
    });
  }
  // 获取喜欢书籍数量
  getBookCount(){
    return this.request({
      url: '/book/favor/count'
    })
  }
  // 获取书籍详情
  getDetail(bId) {
    return this.request({
      url: `/book/${bId}/detail`
    })
  }

  // 获取书籍点赞信息
  getLikeStatus(bId) {
    return this.request({
      url: `/book/${bId}/favor`
    })
  }

  // 获取书评
  getComments(bId) {
    return this.request({
      url: `/book/${bId}/short_comment`
    })
  }

  // 提交书评
  postComment(bid, comment) {
    return this.request({
      url: 'book/add/short_comment',
      method: 'POST',
      data: {
        book_id: bid,
        content: comment
      }
    })
  }

  // 书籍搜索
  search(start, q) {
    return this.request({
      url: '/book/search?summary=1',
      data: {
        start: start,
        q: q
      }
    })
  }
  // 喜欢书籍的数量
  getMyBookCount() {
    return this.request({
      url: '/book/favor/count'
    })
  }
}

export {BookModel}