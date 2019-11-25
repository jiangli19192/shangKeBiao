// pages/detail/detail.js
let datas = require('../../datas/list_data.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj: {},
    isCollected: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
  }
})