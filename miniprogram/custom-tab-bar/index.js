Component({
  data: {
    selected: 0,
    color: "black",
    selectedColor: "#0080ff",
    list: [
      {
        pagePath: "index",
        text: "首页",
        iconPath: "/image/UI/sy.png",
        selectedIconPath: "/image/UI/sy.png"
      },
      {
        pagePath: "direct",
        text: "保洁直约",
        iconPath: "/image/UI/bjzy.png",
        selectedIconPath: "/image/UI/bjzy.png"
      },
      {
        pagePath: "my",
        text: "我的",
        iconPath: "/image/UI/wd.png",
        selectedIconPath: "/image/UI/wd.png"
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    }
  }
})