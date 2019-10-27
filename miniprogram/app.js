App({
  onLaunch: function () {
  
    wx.cloud.init(
      {
        env: "yddj-rc9br"
      }
    )
    wx.setTabBarStyle({
      color: 'black',
      selectedColor: '3157F0',
      backgroundColor: 'white',
      borderStyle: 'white'
    });
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    openid:"",
    hasLogin: false,
    wxtx:"",
    wxnc:""
  },

});