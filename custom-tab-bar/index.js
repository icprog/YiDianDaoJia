Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [
      {
        pagePath: "index",
        text: "首页",
        iconPath: "/pages/image/UI/sy.png",
        selectedIconPath: "/pages/image/UI/sy.png"
      },
      {
        pagePath: "direct",
        text: "保洁直约",
        iconPath: "/pages/image/UI/bjzy.png",
        selectedIconPath: "/pages/image/UI/bjzy.png"
      },
      {
        pagePath: "my",
        text: "我的",
        iconPath: "/pages/image/UI/wd.png",
        selectedIconPath: "/pages/image/UI/wd.png"
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      console.log(data)
      const url = data.path
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    }
  }
})