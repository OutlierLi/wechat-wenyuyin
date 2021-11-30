const db = wx.cloud.database()
const _ = db.command
const app = getApp()


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
    postList:[]
  },

  getData(event){
    var id = parseInt(event)
    console.log(id)
    db.collection("postslist").where({
      postId:_.eq(id)
    }).get().then(res=>{
      console.log(res.data)
      this.setData({
        postList:res.data,
        postData:res.data[0]
      })
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(options.pid)
    this.data._pid = options.pid

    const postsCollected = wx.getStorageSync('posts_collected')

    if(postsCollected){
      this.data._postsCollected = postsCollected
    }

    let collected = postsCollected[this.data._pid]

    if(collected === undefined){
      collected = false
    }

    this.setData({
      collected,
      isPlaying:this.currentMusicIsPlaying()
    })

    const mgr = wx.getBackgroundAudioManager()
    this.data._mgr = mgr
    // if(app.gIsPlayingMusic){
    //mgr.onPlay(this.onMusicStart)
    // }
    // else{
    //console.log(1)
    //mgr.onPause(this.onMusicPause)
    // }
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

    const music = this.data.postData.music

    mgr.src = music.url
    mgr.title = music.title
    mgr.coverImgUrl = music.coverImg

    //mgr.play()
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
  },

  onShare(event){
    wx.showActionSheet({
      itemList: ['分享到QQ','分享到微信','分享到朋友圈','分享到微博'],
      // success(res){
      //   console.log(res)
      // }
    })
  },

  async onCollect(event){

    const postsCollected = this.data._postsCollected
    postsCollected[this.data._pid] = !this.data.collected
    wx.setStorageSync('posts_collected', postsCollected)
    
    wx.showToast({
      title: this.data.collected?'取消收藏':'收藏成功',
      duration:3000
    })

    this.setData({
      collected:!this.data.collected
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