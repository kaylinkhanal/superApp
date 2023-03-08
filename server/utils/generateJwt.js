const jwt = require('jsonwebtoken')

const GenerateJwt = async (key, value) => {
  try {
    const token = await jwt.sign({ [key]: value }, process.env.SECRET_KEY)
    return token
  } catch (err) {
    console.log(err)
  }
}

module.exports = GenerateJwt
