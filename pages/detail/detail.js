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
  onLoad: function (options) {
    // 获取参数index值
    let index = options.index;
    this.setData({
      detailObj: datas.list_data[index],
      index: null
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
  }
})