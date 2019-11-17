// miniprogram/pages/sjrz/index.js
const fileManager = wx.getFileSystemManager();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: ['请选择服务分类','空房开荒', '专业擦玻璃','地板打蜡',"瓷砖美缝"],
    index :0,
    scroll_height:0,
    idcardImg:"/image/idcard.png",
    idcardBackImg:"/image/idcard-back.png",
    xm:"",
    lxdh:""

  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
    console.log(this.data.index)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
    this.setData({
      scroll_height: windowHeight * 750 / windowWidth - (100) - 30
    })
  },
  idcard()
  {
    const that = this
    wx.chooseImage(
      {
        count:1,
        sourceType: ['album', 'camera']	,
        success(res)
        {
          console.log(res.tempFiles[0])
          that.setData(
            {
              idcardImg: res.tempFiles[0].path
            }
          )
          console.log(res)
        }
      }
    )
  },
  idcardBack()
  {
    const that = this
    wx.chooseImage(
      {
        count: 1,
        success(res) {
          console.log(res.tempFiles[0])
          that.setData(
            {
              idcardBackImg: res.tempFiles[0].path
            }
          )
          console.log(res)
        }
        , complete() {
        }
      }
    )
  },
  changexm(res)
  {
    console.log(res)
    this.setData(
      {
        xm: res.detail.detail.value
      }
    )
  },
  changedh(res)
  {
    this.setData(
      {
        lxdh: res.detail.detail.value
      }
    )
  },
  submit()
  {
    let that = this
    if(this.data.xm!=="")
    {
     if(this.data.lxdh!=="")
     {
       if (this.data.index != 0) {
         if (this.data.idcardImg != "" && this.data.idcardImg != "/image/idcard.png")
         {
           if (this.data.idcardBackImg != "" && this.data.idcardBackImg != "/image/idcard-back.png") {
             wx.showLoading({
               title: '正在提交',
             })
             wx.request({
               url: 'https://yddj.panzongyan.cn/wxchat/my/sjrz',
               method:'post',
               data:
               {
                 xm:that.data.xm,
                 lxdh:that.data.lxdh,
                 fwlx: that.data.types[that.data.index],
                 idcardImg:'data:image/jpg;base64,'+fileManager.readFileSync(that.data.idcardImg,'base64'),
                 idcardBackImg: 'data:image/jpg;base64,' + fileManager.readFileSync(that.data.idcardBackImg, 'base64')
               },success(res)
               {
                 if(res.statusCode==200)
                 {
                   if(res.data.status = 'success')
                   {
                     wx.showModal({
                       title: '提示',
                       content: res.data.message,
                       showCancel: false,
                       success()
                       {
                        wx.navigateBack({
                          
                        })
                       }
                     })
                   }
                   else
                   {
                     wx.showModal({
                       title: '提示',
                       content: res.data.message,
                       showCancel: false
                     })
                   }
                 }
               },
               complete()
               {
                 wx.hideLoading()
               }
             })
           }
           else
           {
             wx.showModal({
               title: '提示',
               content: '请选择身份证反面照',
               showCancel: false
             })
           }
         }
         else
         {
           wx.showModal({
             title: '提示',
             content: '请选择身份证正面照',
             showCancel: false
           })
         }
       }
       else {
         wx.showModal({
           title: '提示',
           content: '请选择服务分类',
           showCancel: false
         })
       }
     }
     else
     {
       wx.showModal({
         title: '提示',
         content: '请输入联系电话',
         showCancel: false
       })
     }
    }
    else
    {
      wx.showModal({
        title: '提示',
        content: '请输入姓名',
        showCancel:false
      })
    }
  }
})