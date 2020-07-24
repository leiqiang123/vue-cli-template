
//将接口的请求参数添加到path上去
export function addParamsForPath(path, data) {
  let index = 0
  for (let item in data){
    if(index === 0){
      path = path + `?${item}=${data[item]}`
      index += 1
    }else{
      path = path + `&${item}=${data[item]}`
    }
  }
  return path
}
