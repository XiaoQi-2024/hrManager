import request from '@/utils/request'

export function getDepartmentInfo() {
  return request({
    url: '/company/department'
  })
}
