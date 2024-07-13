import request from '@/utils/request'

export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}

export function exportEmployeeInfo() {
  return request({
    url: '/sys/user/export',
    responseType: 'blob' // 使用blob接收二进制文件流
  })
}
