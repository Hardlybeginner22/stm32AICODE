const cloud = require('wx-server-sdk')
cloud.init()

exports.main = async (event, context) => {
  const { userInfo } = event
  const db = cloud.database()
  const usersCollection = db.collection('users')

  const userRecord = await usersCollection.where({
    openId: userInfo.openId
  }).get()

  if (userRecord.data.length === 0) {
    await usersCollection.add({
      data: userInfo
    })
  }

  return {
    message: '登录成功'
  }
}
