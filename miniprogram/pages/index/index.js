let app = getApp();
Page({
  data: {
    //自营模块
    zymk: [{
      img: '/image/UI/kfkh.png',
      title: '空房开荒',
      nav: '/pages/nav/fw?title=空房开荒'
    }, {
      img: '/image/UI/zycbl1.png',
      title: '专业擦玻璃',
      nav: ''
    }, {
      img: '/image/UI/dbdl.png',
      title: '地板打蜡',
      nav: ''
    }, {
      img: '/image/UI/czmf.png',
      title: '瓷砖美缝',
      nav: ''
    }, {
      img: '/image/UI/dlsjm.png',
      title: '大理石晶面',
      nav: ''
    }, {
      img: '/image/UI/sfqx.png',
      title: '沙发清洗',
      nav: ''
    }, {
      img: '/image/UI/cdqx.png',
      title: '床垫清洗',
      nav: ''
    }, {
      img: '/image/UI/dtqx.png',
      title: '地毯清洗',
      nav: ''
    }, {
      img: '/image/UI/clqx1.png',
      title: '窗帘清洗',
      nav: ''
    }, {
      img: '/image/UI/gdfw.png',
      title: '更多服务',
      nav: ''
    }, ],
    zszy: [{
      img: '/image/UI/bmys.png',
      title: '保姆月嫂',
      nav: ''
    }, {
      img: '/image/UI/gdst.png',
      title: '管道疏通',
      nav: ''
    }, {
      img: '/image/UI/jdwx.png',
      title: '家电维修',
      nav: ''
    }, {
      img: '/image/UI/kshs.png',
      title: '开锁换匙',
      nav: ''
    }, {
      img: '/image/UI/smhs.png',
      title: '上门回收',
      nav: ''
    }, {
      img: '/image/UI/xhlz.png',
      title: '鲜花绿植',
      nav: ''
    }, {
      img: '/image/UI/bjhy.png',
      title: '搬家货运',
      nav: ''
    }, {
      img: '/image/UI/qtfw.png',
      title: '其他服务',
      nav: ''
    }],
    region: ["", "选择地区"],
    zytext: "1.平台服务商严选入驻服务安心\n2.平台五抽成服务商服务用心\n3.平台提供交易资金担保放心\n4.平台服务商一键对比省心",
    notice: "示例消息",
  },
  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value
    });
    app.globalData.region = e.detail.value;
  },
  directNav:function(e)
  {
    wx.switchTab({ url:'../direct/direct' })
  },
  onLoad: function() {
    if (app.globalData.region[1] === "选择地区") {
      app.getPosition().then(res => {
        app.globalData.region = res;
        this.setData({
          region: app.globalData.region
        })
      });
    } else {
      this.setData({
        region: app.globalData.region
      })
    }
    let that = this
    wx.request({
      url: 'http://www.panzongyan.cn/wxchat/module2/gdt',
      method: 'get',
      success: function(res) {
        if (res.statusCode === 200) {
          console.log(res.data)
          if(res.data.status === "success")
          {
            that.setData({
              notice: res.data.gdgg
            });
          }
        }
      }
    })
  }
});