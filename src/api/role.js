import request from '@/utils/request'

export function getRoleInfoList(params) {
  return request({
    url: '/sys/role',
    params
  })
}
