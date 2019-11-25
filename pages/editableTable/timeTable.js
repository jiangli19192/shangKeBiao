// pages/editableTable/timeTable.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    titles: [],
    cols: [],
    show: false,
    tables: [
      ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      ['内容1', '内容2', '内容3', '内容4', '内容5', '内容6', '内容7'],
      ['内容11', '内容22', '内容33', '内容44', '内容55', '内容66', '内容77'],
      ['内容111', '内容222', '内容333', '内容444', '内容555', '内容666', '内容777'],
    ]
  },

  openModal(e) {
    let id = e.target.dataset.id;
    this.setData({
      titles: this.data.tables[0],
      cols: this.data.tables[id],
      id: id,
      show: true
    });
  },

  dataChange(e) {
    let cols = this.data.cols;
    cols[e.target.dataset.id] = e.detail.value;
    // console.log(cols);
    this.setData({
      cols: cols
    });

  },

  editModel(e) {
    let tables = this.data.tables;
    tables[this.data.id] = this.data.cols;

    this.setData({
      tables: tables,
      show: false
    });

  },

  closeModel() {
    this.setData({
      show: false,
      create: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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