// 第一个参数为日期，第二个参数为年月日分割格式 '/'或'-'
export const formatDate = (value, str) => {
  const date = new Date(value)
  let obj = {
    Y: date.getFullYear(),
    M: date.getMonth() + 1,
    D: date.getDate()
  }
  // yyyy-mm-dd
  if (str.indexOf('-') > -1) {
    return obj.Y + '-' + supplement(obj.M) + '-' + supplement(obj.D)
  }
  // yyyy/mm/dd
  if (str.indexOf('/') > -1) {
    return obj.Y + '/' + supplement(obj.M) + '/' + supplement(obj.D)
  }
}

// 位数不足两位补全0
function supplement(params) {
  const value = params < 10 ? '0' + params : params
  return value
}
