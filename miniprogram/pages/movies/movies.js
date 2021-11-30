const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters:[],
    comingSoon:[],
    top250:[],
    searchResult:false,
    searchData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    db.collection("movie_in_theaters_three").get().then(res=>{
      //console.log(res.data[0].subjects)
      this.setData({
        inTheaters:res.data[0].subjects
      })
    })

    db.collection("movie_coming_soon_three").get().then(res=>{
      //console.log(res.data[0].subjects)
      this.setData({
        comingSoon:res.data[0].subjects
      })
    })

    db.collection("movie_top250_three").get().then(res=>{
      //console.log(res.data[0].subjects)
      this.setData({
        top250:res.data[0].subjects
      })
    })
    
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

  },

  onGotoMore(event){
    const type = event.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/more-movie/more-movie?type=' + type,
    })
  },

  onConfirm(event){
    //console.log(event)
    this.setData({
      searchResult:true,
      searchData:[]
    })
    const search = event.detail.value
    db.collection("all_movies").get().then(res=>{
      //console.log(res.data[0].subjects)
      const movies = res.data[0].subjects
      for(var i in movies){
        if(movies[i].title.indexOf(search)!=-1){
          console.log(i)
          this.setData({
            searchData:this.data.searchData.concat(movies[i])
          })
          //console.log(this.data.searchData)
        }
      }
    })
  },

  onSearchCancel(event){
    this.setData({
      searchResult:false
    })
  }

})