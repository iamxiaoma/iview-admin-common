import Mock from 'mockjs'

/**
 * 模块的接口模拟请求
 */

/**
 * 单个文件上传
 */
Mock.mock(/\/upload\/single/, req => {
  // req = JSON.parse(req)
  console.log('upload single req', req)
  let template = {
    'errcode': 200,
    'errmsg': 'ok',
    'data': {
      'url': '@image(\'200x200\')'
    }
  }
  console.log('template', template)
  return Mock.mock(template)
})

Mock.mock(/\/upload\/ueditor/, req => {
  // req = JSON.parse(req)
  console.log('upload ueditor req', req)
  let template = {
    'errcode': 200,
    'errmsg': 'ok',
    'data': {
      'url': '@image(\'200x200\')'
    }
  }
  console.log('template', template)
  return Mock.mock(template)
})

export default Mock
