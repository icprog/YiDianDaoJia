App({
  onLaunch: function () {
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
    this.globalData.scroll_height = windowHeight * 750 / windowWidth - 800;
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
    hasLogin: false,
    region: ["", "选择地区"],
    scroll_height: 0,
    yhxx: {},//用户信息
  },
  getPosition: function () {
    return new Promise((resolve, reject) => {
      let app = this;
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success(res) {
          const latitude = res.latitude
          const longitude = res.longitude
          var getAddressUrl = "https://apis.map.qq.com/ws/geocoder/v1/?location=" + res.latitude + "," + res.longitude + "&key=3G2BZ-YAT3F-4CJJP-NYDUW-G5KXH-EZFT5";
          wx.request({
            url: getAddressUrl,
            success: res => {
              if (res.statusCode != 200) {
                reject(res);
              }
              else {
                let reg = [
                  res.data.result.address_component.province,
                  res.data.result.address_component.city,
                  res.data.result.address_component.district
                ];
                resolve(reg);
              }
            },
            fail(res) {
              reject(["", "选择地区"]);
            }
          });
        }
      })
    });
  }
});