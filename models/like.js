import {HTTP} from '../utils/http.js'
class LikeModel extends HTTP {
  // 点赞
  like(behavior, artId, category) {
    let url = behavior ? '/like' : '/like/cancel'
    this.request({
      url: url,
      method: 'POST',
      data: {
        art_id: artId,
        type: category
      }
    })
  }
  // 获取点赞信息
  getClassicLikeStatus(artID, categorg, sCallback) {
    this.request({
      url: `classic/${categorg}/${artID}/favor`,
      success: sCallback
    })
  }
}
export {LikeModel}