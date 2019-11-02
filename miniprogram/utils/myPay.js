export async function myPay(orderInfo) { //(this.data.sl * this.data.zdg.jg) * 100
 return new Promise((reslove,reject)=>
 {
  wx.request({
    url: orderInfo.url,
    method: 'post',
    data: orderInfo.data,
    success: function (res) {
      if (res.statusCode === 200) {
        console.log(res)
        orderWX(orderInfo.money, orderInfo.info,res.data.data.ddbh).then(ress => {
          pay(ress.result).then((res) => {
            reslove({ code: 0, reason: "支付成功", res:res })
          }).catch((res) => {
            reject({ code: -1, reason: "支付失败", res: res })
          })
        }).catch((res) => reslove({ code: -1, reason: "云调用错误", res: res }))
      }
      else
        reject({ code: -1, reason: "状态码错误", res: res })
    },
    fail(res) {
      reject({ code: -1, reason: "wx请求错误", res: res })
    }
  })
 })
}
export async function pay(payData) {
  return new Promise((reslove, reject) => {
  //官方标准的支付方法
  wx.requestPayment({
    timeStamp: payData.timeStamp,
    nonceStr: payData.nonceStr,
    package: payData.package, //统一下单接口返回的 prepay_id 格式如：prepay_id=***
    signType: 'MD5',
    paySign: payData.paySign, //签名
    success(res) {
      reslove(res)
    },
    fail(res) {
      reject(res)
    }
  })
  })
}
export async function orderWX(money, info,orderid){
  return new Promise((reslove, reject) => {
  wx.cloud.callFunction({
    name: "pay",
    data: {
      orderid: orderid,
      money: money,
      bodyInfo: info
    },
    success: function (res) {
      reslove(res)
    },
    fail(res) {
      reject(res)
    }
  })}
  )
}
export default myPay