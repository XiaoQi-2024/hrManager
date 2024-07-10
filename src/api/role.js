import request from '@/utils/request'

export function getRoleInfoList(params) {
  return request({
    url: '/sys/role',
    params
  })
}

export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}
