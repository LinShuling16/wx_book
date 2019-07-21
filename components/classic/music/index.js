// components/classic/music/index.js
import { classicBeh } from '../classic-beh.js'

const mMgr = wx.getBackgroundAudioManager();
Component({
  // 使用behaviors
  behaviors: [classicBeh],
  /**
   * 组件的属性列表
   */
  properties: {
    src: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },
  // 在组件实例进入页面节点树时执行
  attached: function () {
    this._recoverStatus();
    this._monitorSwitch();
  },
  // detached - 在组件实例被从页面节点树移除时执行
  detached:  function () {
    // mMgr.stop();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 点击播放音乐 or 暂停
    onPlay: function(event) {
      this.setData({
        playing: !this.data.playing
      })
      if (this.data.playing) {
        mMgr.src = this.properties.src;
        mMgr.title = this.properties.src;
      } else {
        mMgr.pause();
      }
    },

    // 判断当前播放的音乐
    _recoverStatus: function() {
      if(mMgr.paused) {
        this.setData({
          playing: false
        })
        return;
      }
      if(mMgr.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },

    // 监听音乐总控开关
    _monitorSwitch: function() {
      mMgr.onPlay(() => {
        this._recoverStatus();
      })

      mMgr.onPause(() => {
        this._recoverStatus();
      })

      mMgr.onStop(() => {
        this._recoverStatus();
      })

      mMgr.onEnded(() => {
        this._recoverStatus();
      })
    }
  }
})
