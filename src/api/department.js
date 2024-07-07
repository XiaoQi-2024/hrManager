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

export function addDepartment(data) {
  return request({
    method: 'post',
    url: '/company/department',
    data
  })
}

export function getDepartmentDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}
