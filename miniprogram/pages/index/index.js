const app = getApp()

Page({
  data: {
    logged: false,
    userInfo: {},
    password: '',
    timeLimit: '12:00',
    currentPassword: '',
    deviceCode: ''
  },

  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        logged: true
      })
    }
  },

  onGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        logged: true
      })
      wx.cloud.callFunction({
        name: 'login',
        data: {
          userInfo: e.detail.userInfo
        }
      })
    }
  },

  onPasswordInput: function(e) {
    this.setData({
      password: e.detail.value
    })
  },

  onTimeChange: function(e) {
    this.setData({
      timeLimit: e.detail.value
    })
  },

  setTemporaryPassword: function() {
    wx.cloud.callFunction({
      name: 'setTemporaryPassword',
      data: {
        password: this.data.password,
        timeLimit: this.data.timeLimit
      },
      success: res => {
        wx.showToast({
          title: '设置成功',
          icon: 'success'
        })
      },
      fail: err => {
        wx.showToast({
          title: '设置失败',
          icon: 'none'
        })
      }
    })
  },

  viewCurrentPassword: function() {
    wx.cloud.callFunction({
      name: 'getCurrentPassword',
      success: res => {
        this.setData({
          currentPassword: res.result.password
        })
      },
      fail: err => {
        wx.showToast({
          title: '获取失败',
          icon: 'none'
        })
      }
    })
  },

  generateDeviceCode: function() {
    wx.cloud.callFunction({
      name: 'generateDeviceCode',
      success: res => {
        this.setData({
          deviceCode: res.result.deviceCode
        })
      },
      fail: err => {
        wx.showToast({
          title: '生成失败',
          icon: 'none'
        })
      }
    })
  }
})
