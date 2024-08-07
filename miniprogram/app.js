// app.js
App({})
App({
  onLaunch: function() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'wxc7b7668fcd4280b1', // 替换为你的云环境ID
        traceUser: true,
      })
    }
  },
  globalData: {
    userInfo: null
  }
})
