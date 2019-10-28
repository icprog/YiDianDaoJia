const app = getApp()

Page({
  data: {
    statusType: ["全部", "待付款", "已预约", "已完成", "待评价"],
    currentType: '全部',
    currentIndex:0,
    orderList: [
      {
        "ddbh": "11234",//订单唯一编号
        "ddzt": "待付款",//订单状态
        "xdsj": new Date().toDateString(),//下单时间
        "ddlx": "保洁直约",//订单类型
        "fwdz": "朝阳东路xxx",//服务地址
        "fwsj": new Date().toDateString(),//服务时间
        "fws": "服务商",//服务商
        "zfje": 111,//支付金额
      }, {
        "ddbh": "11234",//订单唯一编号
        "ddzt": "已预约",//订单状态
        "xdsj": new Date().toDateString(),//下单时间
        "ddlx": "自营订单",//订单类型
        "fwdz": "朝阳东路xxx",//服务地址
        "fwsj": new Date().toDateString(),//服务时间
        "fws": "服务商",//服务商
        "zfje": 111,//支付金额
      }
    ],
    selected:[]
  },
  statusTap: function (e) {
    const curType = e.currentTarget.dataset.type;
    const curIndex = e.currentTarget.dataset.index;
    this.data.currentType = curType
    this.data.currentIndex = curIndex
    this.update(curType);
   
    this.setData({
      currentIndex: curIndex
    });
  },
  onLoad: function (options) {
    this.show();
    if (options && options.index) {
      this.setData({
        currentIndex: options.index
      });
    }
    let x =["全部", "待付款", "已预约", "已完成", "待评价"]
    this.update(x[parseInt(this.data.currentIndex,10)]);
  },
  show: function () {
    // 获取订单列表
    wx.request(
      {
        url: 'http://www.panzongyan.cn/wxchat/login/orders',
        data:
        {
          openid: app.globalData.openid,//身份验证
          type: "get",//发送数据的类型为获取
          content: "ddxx",//内容
          script: "订单信息",//描述
        },
        success: function (e) {
          console.log(e);
          
        }
      }
    )
  },
  update(curType)
  {
    if(curType==="全部")
    {
      this.setData(
       { selected:this.data.orderList}
      )
    }
    else
    {
      let temp = []
      this.data.orderList.forEach(element => {
        if(element.ddzt===curType)
        {
          temp.push(element)
        }
      });
      this.setData(
        { selected:temp}
       )
    }
  }
})