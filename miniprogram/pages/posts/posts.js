// pages/welcome/posts/posts.js

//var postData = require("../../data/data.js")
//console.log(postData)
import{postList} from '../../data/data.js'
//console.log(postList)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //a:"2020LPL夏季季后赛观赛指南",
    //flag:true,
    
  },

  /**
   * 生命周期函数--监听页面加载1
   */
  onLoad: async function (options) {
    //this.setData({
      //b:"2021"
    //})
    //this.setData(postList)

    //wx.setStorageSync('flag', true)
    //设置缓存
    //wx.setStorageSync('flag', false)
    //wx.removeStorageSync('flag')//删除缓存
    //wx.setStorageSync('flag1', 1)
    //wx.clearStorageSync()
    //即使把该段代码注释，依旧存在缓存，相当于前端数据库

    //wx.setStorageSync('flag', 1)
    //const flag = wx.getStorageSync('flag')
    
    //const flag = await wx.getStorage({
      //key: 'flag',
      //success(value){
      //  console.log(value.data)
      //}

    //})

    //flag.then((value)=>{
    //  console.log(value)
    //})

    //console.log(flag)


    this.setData({
      //posts:postList
      postList
      //posts
    })
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

  onGoToDetail(event){
    const pid = event.detail.pid | event.currentTarget.dataset.postId
    wx.navigateTo({
      url: '/pages/post-datail/post-datail?pid='+pid
    })
  },

  /*onGoToDetail1(event){
    const pid = event.currentTarget.dataset.postId
    wx.navigateTo({
      url: '/pages/post-datail/post-datail?pid='+pid
    })
  },*/

})