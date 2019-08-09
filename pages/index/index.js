Page({
  data: {
    //自营模块
    zymk: [
      {
        img: '/pages/image/UI/kfkh.png',
        title: '空房开荒',
        nav: ''
      }, {
        img: '/pages/image/UI/zycbl1.png',
        title: '专业擦玻璃',
        nav: ''
      }, {
        img: '/pages/image/UI/dbdl.png',
        title: '地板打蜡',
        nav: ''
      }, {
        img: '/pages/image/UI/czmf.png',
        title: '瓷砖美缝',
        nav: ''
      }, {
        img: '/pages/image/UI/dlsjm.png',
        title: '大理石晶面',
        nav: ''
      }, {
        img: '/pages/image/UI/sfqx.png',
        title: '沙发清洗',
        nav: ''
      }, {
        img: '/pages/image/UI/cdqx.png',
        title: '床垫清洗',
        nav: ''
      }, {
        img: '/pages/image/UI/dtqx.png',
        title: '地毯清洗',
        nav: ''
      }, {
        img: '/pages/image/UI/clqx1.png',
        title: '窗帘清洗',
        nav: ''
      }, {
        img: '/pages/image/UI/gdfw.png',
        title: '更多服务',
        nav: ''
      },
    ],
    zszy: [
      {
        img: '/pages/image/UI/bmys.png',
        title: '保姆月嫂',
        nav: ''
      }, {
        img: '/pages/image/UI/gdst.png',
        title: '管道疏通',
        nav: ''
      }, {
        img: '/pages/image/UI/jdwx.png',
        title: '家电维修',
        nav: ''
      }, {
        img: '/pages/image/UI/kshs.png',
        title: '开锁换匙',
        nav: ''
      }, {
        img: '/pages/image/UI/smhs.png',
        title: '上门回收',
        nav: ''
      }, {
        img: '/pages/image/UI/xhlz.png',
        title: '鲜花绿植',
        nav: ''
      }, {
        img: '/pages/image/UI/bjhy.png',
        title: '搬家货运',
        nav: ''
      }, {
        img: '/pages/image/UI/qtfw.png',
        title: '其他服务',
        nav: ''
      }
    ],
    zytext: "1.平台服务商严选入驻服务安心\n2.平台五抽成服务商服务用心\n3.平台提供交易资金担保放心\n4.平台服务商一键对比省心",
    region: ["广东省", "广州市", "荔湾区"]
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  }
});