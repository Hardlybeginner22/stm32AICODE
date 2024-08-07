const cloud = require('wx-server-sdk')
cloud.init()

exports.main = async (event, context) => {
  const { password, timeLimit } = event
  const db = cloud.database()
  const tempPasswordsCollection = db.collection('tempPasswords')

  await tempPasswordsCollection.add({
    data: {
      password,
      timeLimit,
      createdAt: new Date()
    }
  })

  return {
    message: '临时密码设置成功'
  }
}
