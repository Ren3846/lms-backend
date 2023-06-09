const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-model');

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
    return {
      accessToken,
      refreshToken,
    };
  }
  // сохраняем refreshToken
  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({ user: userId });

    // в БД под каждого пользователя 1 токен и при попытке зайти на
    //аккаунт с другого устройства поскольку токен перезапишется и в БД сохранится уже новый токен

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await tokenModel.create({ user: userId, refreshToken });
    return token;
  }
}

module.exports = new TokenService();
