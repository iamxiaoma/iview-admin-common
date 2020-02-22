import * as role from '@/modules/role/api'
import * as department from '@/modules/department/api'
import * as manager from '@/modules/manager/api'

const api = {
  ...role,
  ...department,
  ...manager
}

export default api
