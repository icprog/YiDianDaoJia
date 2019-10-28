const app = getApp()
Page({
  data: {
    addressList: [{
      "bh":"1234",//地址唯一编号
      "lxr":"小白",//联系人姓名
      "lxdh":"13412342222",//联系电话
      "fwdz":"河南省郑州市高新区abcde",//地址
      },
      ]
  },

  // selectTap: function(e) {
  //   var id = e.currentTarget.dataset.id;
  //   updateAddress({
  //     token: wx.getStorageSync('token'),
  //     id: id,
  //     isDefault: 'true'
  //   }).then(function(res) {
  //     wx.navigateBack({})
  //   })
  // },

  address: function(e) {
    wx.navigateTo({
      url: "/pages/address-add/index?item=" + JSON.stringify(e.currentTarget.dataset.item)+"&from="+e.currentTarget.dataset.from
    })
  },

  onLoad: function() {
    console.log(app.globalData.openid)
    wx.request({
      url: 'http://www.panzongyan.cn/wxchat/login/hqdz',
      data:
      {
        openid: app.globalData.openid,//身份验证
        //身份验证
        type: "get",
        //发送数据的类型为获取
        content: "dzxx",
        // 内容
        script: "地址信息",//描述
      },
      success:function(e)
      {
      }
    })
  }

})