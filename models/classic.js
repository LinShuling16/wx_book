import {
  HTTP
} from '../utils/http.js'
class ClassicModel extends HTTP {
  // 获取最新一起的数据
  getLatest(sCallabck) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        this._setLatestIndex(res.index);
        sCallabck(res);
        let key = this._getKey(res.index);
        wx.setStorageSync(key, res);
      }
    })
  }
  // 切换期刊
  getClassic(nextOrPrevious, index, sCallback) {
    // 缓存 or API 写入到缓存中
    let key = nextOrPrevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1);

    let classic = wx.getStorageSync(key);
    if (!classic) {
      let url = `classic/${index}/${nextOrPrevious}`;
      this.request({
        url: url,
        success: (res) => {
          sCallback(res);
          wx.setStorageSync(this._getKey(res.index), res)
        }
      })
    } else {
      sCallback(classic);
    }

  }
  getMyFavor(success) {
    const params = {
      url: 'classic/favor',
      success: success
    }
    this.request(params)
  }
  // 获取上一期
  // getPrevious(index, sCallback) {
  //   this.request({
  //     url: `classic/${index}/previous`,
  //     success: (res) => {
  //       sCallback(res);
  //     }
  //   })
  // }
  // 获取下一期
  // getNext(index, sCallback) {
  //   this.request({
  //     url: `classic/${index}/next`,
  //     success: (res) => {
  //       sCallback(res);
  //     }
  //   })
  // }

  // 判断是否是第一期
  isFirst(index) {
    return index == 1 ? true : false;
  }

  // 判断是否是最新一期
  isLatest(index) {
    let latestIndex = this._getLatestIndex();
    return index == latestIndex ? true : false;
  }

  // 将最新一起的期刊存入缓存
  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }

  // 获取最新一期的index
  _getLatestIndex() {
    return wx.getStorageSync('latest');
  }

  // 设置期刊缓存的key
  _getKey(index) {
    return 'classic-' + index;
  }

}
export {
  ClassicModel
}