const db = wx.cloud.database()
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[],
    postList:[]
  },

  getPostsData(num=4, page=0){
    db.collection("postslist").skip(page).limit(num).get().then(res=>{
      var oldData = this.data.dataList
      var newData = oldData.concat(res.data)
      this.setData({
        postList:newData,
        dataList:newData
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载1
   */
  onLoad: function (options) {
    this.getPostsData(4,0)
  },

    /**
   * 生命周期函数--监听页面初次渲染完成3
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示2
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
    this.setData({
      dataList:[]
    })
    this.getPostsData()
    wx.showNavigationBarLoading() //在标题栏中显示加载
    setTimeout(function()
    {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    },1500);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var page = this.data.dataList.length
    console.log(page)
    this.getPostsData(4,page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onGoToDetail(event){
    const pid = event.detail.pid | event.currentTarget.dataset.postId
    //this.upDate(pid)
    wx.navigateTo({
      url: '/pages/post-datail/post-datail?pid='+pid
    })
  },
})