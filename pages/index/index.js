// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "msg": "jiangli19192",
    userInfo: {},
    isShowAuthButton: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // onLoad函数只执行一次
    this.getUserInfo();
  },

  // 根据用户是否授权，控制'获取用户登陆信息'按钮是否显示
  // 如果用户已经授权，获取用户登陆信息
  getUserInfo() {
    //判断用户是否授权
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          // 用户已授权
          this.setData({
            isShowAuthButton: false
          });
        } else {
          this.setData({
            isShowAuthButton: true
          });
        }

        // 获取用户信息，并初始化Data.userInfo对象
        wx.getUserInfo({
          success: (data) => {
            this.setData({
              userInfo: data.userInfo
            })
          }
        });
      },
      fail: () => {
        console.log('获取用户信息失败!')
      }
    })
  },

  handleGetUserInfo(data) {
    // 未授权回调方法
    if (data.detail.rawData) {
      this.onLoad();
    }
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})