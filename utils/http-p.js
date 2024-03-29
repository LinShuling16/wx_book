import { config } from '../config.js'

const tips = {
  0: 'OK, 成功',
  1: '抱歉，出现了错误',
  1000: '输入参数错误',
  1001: '输入的json格式不正确',
  1002: '找不到资源',
  1003: '未知错误',
  1004: '禁止访问',
  1005: '不正确的开发者key',
  1006: '服务器内部错误',
  2000: '你已经点过赞了',
  2001: '你还没点过赞',
  3000: '该期内容不存在'
}
class HTTP {
  request({url, data = {}, method = 'GET'}) {
     return new Promise((resolve, reject) => {
     this. _request(url, resolve, reject, data, method);
    })
  }
  _request(url, resolve, reject, data = {}, method = 'GET') {
    // url,data,method
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: (res) => {
        const code = res.statusCode.toString();
        if (code.startsWith('2')) {
          resolve(res.data);
        } else {
          reject();
          const error_code = res.data.error_code;
          this._show_error(error_code);
        }
      },
      fail: (err) => {
        reject();
        wx.showToast({
          title: '错误',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
  // 显示错误信息
  _show_error(error_code) {
    if (!error_code) {
      error_code = 1;
    }
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 2000
    })
  }
}
export { HTTP }