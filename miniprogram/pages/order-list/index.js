const app = getApp()

Page({
  data: {
    statusType: ["全部", "待付款", "待服务", "待评价", "已完成"],
    currentType: '全部',
    currentIndex: 0,
    scroll_height: 0,
    orderList: [],
    selected: [],
    item:{}
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
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
    if (options && options.index) {
      this.setData({
        currentIndex: options.index,
        scroll_height: windowHeight * 750 / windowWidth - (110) - 30
      })
    }
  },
  show: function () {
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    let that = this
    // 获取订单列表
    wx.request({
      url: 'https://yddj.panzongyan.cn/wxchat/login/orders',
      data: {
        openid: app.globalData.openid, //身份验证
        type: "get", //发送数据的类型为获取
        content: "ddxx", //内容
        script: "订单信息", //描述
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode === 200) {
          if (res.data.status == 'success') {
            let data = res.data.data
            data.forEach(
              x => {
                let time = new Date(x.xdsj*1000)
                console.log(time)
                x.xdsj = time.getFullYear() + "-" + (time.getMonth()+1) + "-" + time.getDate() + " " + time.getHours() + ":" + time.getMinutes()
                time = new Date(x.fwsj * 1000)
                x.fwsj = time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate() + " " + time.getHours() + ":" + time.getMinutes()
              }
            )
            that.setData({
              orderList: data
            }

            )
            let x = ["全部", "待付款", "待服务", "待评价", "已完成"]
            that.update(x[parseInt(that.data.currentIndex, 10)]);
          }
          else
          {
          
          }
        }
      },
      fail() {
        wx.showModal({
          title: '提示',
          content: '获取订单失败',
        })
      },
      complete()
      {
        wx.stopPullDownRefresh()
        wx.hideLoading()
      }
    })
  },
  update(curType) {
    if (curType === "全部") {
      this.setData({
        selected: this.data.orderList,
      })
    } else {
      let temp = new Array()
      this.data.orderList.forEach(element => {
        if (element.ddzt === curType) {
          temp.push(element)
        }
      });

      this.setData({
        selected: temp,
      })
    }
  },
  directXq(e) {
    this.data.item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/order-details/index',
    })
  },
  onPullDownRefresh: function () {
    this.show();
  },
  onShow()
  {
    this.show()
  }
})