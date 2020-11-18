// pages/post-datail/post-datail.js
import {postList} from '../../data/data.js'
const app = getApp()
//console.log(app.test)
//缓存 localstorage 与全局变量相比永久存在
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postData:{},
    _pid:null,
    collected:false,
    isPlaying:false,
    _postsCollected:{},
    _mgr:null,
    //做数据绑定不加下划线
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //wx.setStorageSync('posts_collected', undefined)
    const postData = postList[options.pid]
    this.data._pid = options.pid

    const postsCollected = wx.getStorageSync('posts_collected')
    //this.data._postsCollected = postsCollected

    if(postsCollected){
      this.data._postsCollected = postsCollected
    }

    let collected = postsCollected[this.data._pid]

    if(collected === undefined){
      //如果为undefined代表文章从来没有被收藏过
      collected = false
    }

    this.setData({
      postData,
      collected,
      isPlaying:this.currentMusicIsPlaying()
    })

    const mgr = wx.getBackgroundAudioManager()
    this.data._mgr = mgr
    mgr.onPlay(this.onMusicStart)
    //mgr.onStop(this.onMusicStop)
    mgr.onPause(this.onMusicPause)
  },

  currentMusicIsPlaying(){
    if(app.gIsPlayingMusic){
      if(app.gIsPlayingPostId === this.data._pid){
        return true
      }
      return false
    }
    return false
  },

  onMusicStart(event){
    const mgr = this.data._mgr
    //mgr.onPlay(()=>{
      //console.log(123)
    //})
    const music = postList[this.data._pid].music

    mgr.src = music.url
    mgr.title = music.title
    mgr.coverImgUrl = music.coverImg

    app.gIsPlayingMusic = true
    app.gIsPlayingPostId = this.data._pid

    this.setData({
      isPlaying:true
    })
  },

  onMusicPause(event){
    const mgr = this.data._mgr
    mgr.pause()
    app.gIsPlayingMusic = false
    app.gIsPlayingPostId = -1
    this.setData({
      isPlaying:false
    })
    //
  },

  onShare(event){
    wx.showActionSheet({
      itemList: ['分享到QQ','分享到微信','分享到朋友圈','分享到微博'],
      success(res){
        console.log(res)
      }
    })
  },

  async onCollect(event){
    //假设未收藏 -> 收藏
    //哪篇文章被收藏
    //数据结构 可以表示多篇文章被收藏
    const postsCollected = this.data._postsCollected
    postsCollected[this.data._pid] = !this.data.collected
    wx.setStorageSync('posts_collected', postsCollected)
    //this.data.collected = true
    
    wx.showToast({
      title: this.data.collected?'取消收藏':'收藏成功',
      duration:3000
    })//轻提示
/*
//模态提示
    const result = await wx.showModal({
      title:this.data.collected?'是否取消收藏':'是否收藏文章',
    })
    if(result.confirm){
      const postsCollected = this.data._postsCollected
      postsCollected[this.data._pid] = !this.data.collected
      wx.setStorageSync('posts_collected', postsCollected)
      this.setData({
        collected:!this.data.collected
        //该处的顺序很重要
      })
    }
*/
    this.setData({
      collected:!this.data.collected
      //该处的顺序很重要
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

  }
})