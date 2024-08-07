const cloud = require('wx-server-sdk')
cloud.init()

exports.main = async (event, context) => {
  const db = cloud.database()
  const deviceCodesCollection = db.collection('deviceCodes')

  const deviceCode = Math.random().toString(36).substring(2, 8).toUpperCase()

  await deviceCodesCollection.add({
    data: {
      deviceCode,
      createdAt: new Date()
    }
  })

  return {
    deviceCode
  }
}
