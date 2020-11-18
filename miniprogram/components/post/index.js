// components/post/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /*
    text:{
      type:String,
      value:'123'
    },
    text1:String
    */
   res:Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    /*
    onGoToDetail(event){
        const pid = event.currentTarget.dataset.postId
        wx.navigateTo({
          url: '/pages/post-datail/post-datail?pid='+pid
        })
      },*/
    onTap(event){
      //const pid = event.currentTarget.dataset.postId
      const pid = this.properties.res.postId
      this.triggerEvent('posttap',{
        pid
      })
      //抛出自定义事件
    },
  },

  
})
