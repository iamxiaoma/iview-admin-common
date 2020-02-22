import * as role from '@/modules/role/api'
import * as department from '@/modules/department/api'

const api = {
  ...role,
  ...department
}

export default api
