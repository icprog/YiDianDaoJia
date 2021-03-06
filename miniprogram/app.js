App({
  onLaunch: function () {
    let app = this
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
    wx.getStorage({
      key: 'user',
      success: function (res) {
        let data = JSON.parse(res.data)
        console.log(data)
        app.globalData.openid = data.openid
        app.globalData.hasLogin = data.hasLogin
        app.globalData.wxtx = data.wxtx
        app.globalData.wxnc = data.wxnc
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    openid: "",
    hasLogin: false,
    wxtx: "/image/nologin.png",
    wxnc: "未登录",
    region: ['', '', '选择地区'],
    position: [0, 0]
  },
  getPosition: function () {
    return new Promise((resolve, reject) => {
      let app = this;
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success(ress) {

          var getAddressUrl = "https://apis.map.qq.com/ws/geocoder/v1/?location=" + ress.latitude + "," + ress.longitude + "&key=3G2BZ-YAT3F-4CJJP-NYDUW-G5KXH-EZFT5";
          wx.request({
            url: getAddressUrl,
            success: res => {
              if (res.statusCode != 200) {
                reject(res);
              } else {
                let reg = [
                  res.data.result.address_component.province,
                  res.data.result.address_component.city,
                  res.data.result.address_component.district
                ];
                resolve({ position: [ress.longitude, ress.latitude], region: reg });
              }
            },
            fail(res) {
              reject({ position: [0, 0], region: ["", "选择地区"] });
            }
          });
        }
      })
    });
  },
});