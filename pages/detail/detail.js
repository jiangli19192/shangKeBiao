// pages/detail/detail.js
let datas = require('../../datas/list_data.js');
let appDatas = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj: {},
    index: null,
    isCollected: false,
    isMusicPlay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取参数index值
    let index = options.index;
    this.setData({
      detailObj: datas.list_data[index],
      index
    });

    // 根据本地缓存的数据判断用户是否收藏当前文章
    let detailStorage = wx.getStorageSync('isCollected');
    // 最开始本地缓存内没有数据情况处理
    if (!detailStorage) {
      // 在缓存中初始化空对象
      wx.setStorageSync('isCollected', {});
    }
    // 判断用户是否收藏
    if (detailStorage[index]) {
      this.setData({
        isCollected: true
      });
    }


    /**
     * 页面音乐播放控制
     */
    // 监听当前页面的音乐播放
    wx.onBackgroundAudioPlay(() => {
      // 修改isMusicPlay的状态值
      this.setData({
        isMusicPlay: true
      });

      // 修改appDatas中的数据
      appDatas.data.isPlay = true;
      appDatas.data.pageIndex = index;
    });

    // 判断当前页面的音乐是否在播放
    if (appDatas.data.isPlay && appDatas.data.pageIndex === index) {
      // 修改isMusicPlay的状态值
      this.setData({
        isMusicPlay: true
      });
    }

    // 监听音乐暂停
    wx.onBackgroundAudioStop(() => {
      // 修改isMusicPlay的状态值
      this.setData({
        isMusicPlay: false
      });

      // 修改appDatas中的数据
      appDatas.data.isPlay = false;
    });

  },

  handleCollected(event) {
    let isCollected = !this.data.isCollected;
    // 更新状态
    this.setData({
      isCollected
    });

    // 提示用户
    let title = isCollected ? '收藏成功' : '取消收藏';
    wx.showToast({
      title,
      icon: 'success'
    });

    // 获取下标值(对象的析构语法)
    // 缓存数据格式如：{'0': true, '1': false}
    let {
      index
    } = this.data;
    // 根据KEY获取缓存本地缓存数据
    wx.getStorage({
      key: 'isCollected',
      success: (datas) => {
        let obj = datas.data;
        obj[index] = isCollected;
        // 缓存数据到本地
        wx.setStorage({
          key: 'isCollected',
          data: obj,
          success: () => {
            // 缓存成功
          }
        })
      }
    });

  },

  handleMusicPlay() {
    // 处理音乐播放
    let isMusicPlay = !this.data.isMusicPlay;
    this.setData({
      isMusicPlay
    });

    // 控制音乐播放
    if (isMusicPlay) {
      let { dataUrl, title } = this.data.detailObj.music;
      // 播放音乐
      wx.playBackgroundAudio({
        dataUrl,
        title
      })
    } else {
      // 暂停音乐
      wx.pauseBackgroundAudio();
    }

  },

  /**
   * 处理点击分享功能
   */
  handleShare() {
    wx.showActionSheet({
      itemList: [
        '分享到朋友圈',
        '分享到QQ空间',
        '分享到微博'
      ],
    })
  }
})