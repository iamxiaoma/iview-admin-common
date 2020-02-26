import Mock from 'mockjs'

/**
 * 模块的接口模拟请求
 */

const statusArr = [1, 2]
const statusNameArr = ['启用', '禁用']

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: 100 - 500
})

/**
 * 获取列表
 */
Mock.mock(/\/special\/list/, req => {
  req = JSON.parse(req.body)
  console.log('req', req)
  let list = `list|${req['pageSize']}`
  let template = {
    'errcode': 200,
    'errmsg': 'ok',
    'data': {
      'total_rows|100-1000': 100
    }
  }
  template['data'][list] = [{
    // 属性 id 是一个自增数，起始值为 1，每次增 1
    'id|+1': 1,
    'title': '@ctitle',
    'ad_img': '@image(\'200x200\')',
    'status|1': statusArr,
    'status_name|1': statusNameArr,
    'create_time': '@datetime'
  }]
  console.log('template', template)
  return Mock.mock(template)
})

/**
 * 新增
 */
Mock.mock(/\/special\/add/, req => {
  req = JSON.parse(req.body)
  console.log('req', req)
  let template = {
    'errcode': 200,
    'errmsg': 'ok'
  }
  console.log('template', template)
  return Mock.mock(template)
})

/**
 * 编辑
 */
Mock.mock(/\/special\/edit/, req => {
  req = JSON.parse(req.body)
  console.log('req', req)
  let template = {
    'errcode': 200,
    'errmsg': 'ok'
  }
  console.log('template', template)
  return Mock.mock(template)
})

/**
 * 删除
 */
Mock.mock(/\/special\/del/, req => {
  req = JSON.parse(req.body)
  console.log('req', req)
  let template = {
    'errcode': 200,
    'errmsg': 'ok'
  }
  console.log('template', template)
  return Mock.mock(template)
})

/**
 * 详情
 */
Mock.mock(/\/special\/detail/, req => {
  req = JSON.parse(req.body)
  console.log('req', req)
  let template = {
    'errcode': 200,
    'errmsg': 'ok',
    'data': {
      'id|1-1000': 1,
      'title': '@ctitle',
      'ad_img': '@image(\'200x200\')',
      'desc': '@word',
      'status|1': statusArr,
      'create_time': '@datetime'
    }
  }
  console.log('template', template)
  return Mock.mock(template)
})

export default Mock
