module.exports = {
  title: "vue-template", // 项目名称
  auth: false, // 是否校验登录
  sign: false, // 是否开启签名
  sso: true, // 是否开启单点登录
  storate: {
    expireTime: 1000 * 60 * 60 * 3,
    sessionStorageKey: "SESSION",
    localStorageKey: "LOCAL"
  },
  ras: {
    open: true,
  }
}
