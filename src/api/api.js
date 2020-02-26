import * as role from '@/modules/role/api'
import * as department from '@/modules/department/api'
import * as manager from '@/modules/manager/api'
import * as special from '@/modules/special/api'
import * as productCategory from '@/modules/category/api'

import * as upload from '@/components/common-upload/api'

const api = {
  ...role,
  ...department,
  ...manager,
  ...special,
  ...productCategory,
  ...upload
}

export default api
