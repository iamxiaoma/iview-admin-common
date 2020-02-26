import Mock from 'mockjs'

/**
 * 模块的接口模拟请求
 */

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: 100 - 500
})

/**
 * 获取列表
 */
Mock.mock(/\/role\/list/, req => {
  req = JSON.parse(req.body)
  console.log('req', req)
  let list = `list|${req['pageSize']}`
  console.log('list', list)

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
    'name|1': ['开发者', '管理员', '财务', '会计', '销售', '采购', '产品', '客服', '业务员', '运维', '其他'],
    'intro|1': ['所有权限', '产品模块', '财务模块', '销售统计', '问答模块', '推广模块', '平台设置', '内容模块'],
    'status|1': [1, 2],
    'status_name|1': ['启用', '禁用'],
    'create_time': '@datetime'
  }]

  console.log('template', template)

  return Mock.mock(template)
})

/**
 * 新增角色
 */
Mock.mock(/\/role\/add/, req => {
  req = JSON.parse(req.body)
  console.log('req', req)
  let template = {
    'errcode': 200,
    'errmsg': 'ok'

  }
  console.log('template', template)
  return Mock.mock(template)
})

Mock.mock(/\/role\/edit/, req => {
  req = JSON.parse(req.body)
  console.log('req', req)
  let template = {
    'errcode': 200,
    'errmsg': 'ok'

  }
  console.log('template', template)
  return Mock.mock(template)
})

Mock.mock(/\/role\/del/, req => {
  req = JSON.parse(req.body)
  console.log('req', req)
  let template = {
    'errcode': 200,
    'errmsg': 'ok'

  }
  console.log('template', template)
  return Mock.mock(template)
})

Mock.mock(/\/role\/detail/, req => {
  req = JSON.parse(req.body)
  console.log('req', req)
  let template = {
    'errcode': 200,
    'errmsg': 'ok',
    'data': {
      'id|1-1000': 1,
      'name|1': ['开发者', '管理员', '财务', '会计', '销售', '采购', '产品', '客服', '业务员', '运维', '其他'],
      'intro|1': ['所有权限', '产品模块', '财务模块', '销售统计', '问答模块', '推广模块', '平台设置', '内容模块'],
      'status|1': [1, 2],
      'status_name|1': ['启用', '禁用'],
      'create_time': '@datetime'
    }
  }
  console.log('template', template)
  return Mock.mock(template)
})

export default Mock
