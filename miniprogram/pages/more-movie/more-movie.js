const app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:[],
    _type:'',
    num:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const type = options.type
    this.data._type = type
    const num = this.data.num
    db.collection("movies_"+type).where({
      pagesnumber:_.eq(num)
    }).get().then(res=>{
      console.log(res)
      this.setData({
        movies:this.data.movies.concat(res.data[0].subjects),
        num:num+1,
        maxpages:res.data[0].maxpages
      })
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let title = '电影'
    switch(this.data._type){
      case 'in_theaters':
        title="正在热映"
        break
      case 'coming_soon':
        title="即将上映"
        break
      case 'top250':
        title="豆瓣Top250"
        break
    }
    wx.setNavigationBarTitle({
      title: title,
    })
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
    db.collection("movies_"+this.data._type).where({
      pagesnumber:_.eq(1)
    }).get().then(res=>{
      this.setData({
        movies:res.data[0].subjects,
        num:2
      })
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const num = this.data.num
    if(num <= this.data.maxpages){
      wx.showNavigationBarLoading()
      db.collection("movies_"+this.data._type).where({
      pagesnumber:_.eq(num)
    }).get().then(res=>{
      console.log(res.data[0].subjects)
      this.setData({
        movies:this.data.movies.concat(res.data[0].subjects),
        num:num+1
      })
      wx.hideNavigationBarLoading()
    })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})