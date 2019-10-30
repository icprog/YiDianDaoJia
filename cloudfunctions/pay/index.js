//云开发实现支付
const cloud = require('wx-server-sdk')
cloud.init()

//1，引入支付的三方依赖
const tenpay = require('tenpay');
//2，配置支付信息
const config = {
  appid: 'wx79cf3cf2c20617a9',
  mchid: '1486667722',
  partnerKey: 'yddj458sdf8g5er8f5z5x5v9w3h4b8y6',
  notify_url: 'http://www.panzongyan.cn/wxchat/wxx/notify',
  spbill_create_ip: '127.0.0.1'
};

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let {
    orderid,
    money,
    bodyInfo
  } = event;
  //3，初始化支付
  const api = tenpay.init(config);

  let result = await api.getPayParams({
    out_trade_no: orderid,
    body: bodyInfo,
    total_fee: money, //订单金额(分),
    openid: wxContext.OPENID //付款用户的openid
  });
  return result;
}