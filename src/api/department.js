import request from '@/utils/request'

export function getDepartmentInfo() {
  return request({
    url: '/company/department'
  })
}

export function getManagerList() {
  return request({
    url: '/sys/user/simple'
  })
}
