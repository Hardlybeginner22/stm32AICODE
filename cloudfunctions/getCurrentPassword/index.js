const cloud = require('wx-server-sdk')
cloud.init()

exports.main = async (event, context) => {
  const db = cloud.database()
  const tempPasswordsCollection = db.collection('tempPasswords')

  const currentPasswordRecord = await tempPasswordsCollection.orderBy('createdAt', 'desc').limit(1).get()

  if (currentPasswordRecord.data.length > 0) {
    return {
      password: currentPasswordRecord.data[0].password
    }
  } else {
    return {
      password: ''
    }
  }
}
