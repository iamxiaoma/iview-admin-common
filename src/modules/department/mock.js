import Mock from 'mockjs'

/**
 * 部门模块的接口模拟请求
 */

const nameArr = ['市场部', '开发部', '财务部', '会计部', '销售部', '采购部', '客服中心', '产品部']
const introArr = ['所有权限', '产品模块', '财务模块', '销售统计', '问答模块', '推广模块', '平台设置', '内容模块']
const statusArr = [1, 2]
const statusNameArr = ['启用', '禁用']

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: 100 - 500
})

/**
 * 获取列表
 */
Mock.mock(/\/department\/list/, req => {
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
    'name|1': nameArr,
    'intro|1': introArr,
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
Mock.mock(/\/department\/add/, req => {
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
Mock.mock(/\/department\/edit/, req => {
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
Mock.mock(/\/department\/del/, req => {
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
Mock.mock(/\/department\/detail/, req => {
  req = JSON.parse(req.body)
  console.log('req', req)
  let template = {
    'errcode': 200,
    'errmsg': 'ok',
    'data': {
      'id|1-1000': 1,
      'name|1': nameArr,
      'intro|1': introArr,
      'status|1': statusArr,
      'status_name|1': statusNameArr,
      'create_time': '@datetime'
    }
  }
  console.log('template', template)
  return Mock.mock(template)
})

export default Mock
