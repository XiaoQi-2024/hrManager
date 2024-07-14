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

export function getExportTemplate() {
  return request({
    url: '/sys/user/import/template',
    responseType: 'blob' // 二进制文件流
  })
}

export function uploadExcel(data) {
  return request({
    url: '/sys/user/import',
    method: 'post',
    data // form-data类型 因为要上传文件类型
  })
}

export function delEmployee(id) {
  return request({
    method: 'delete',
    url: `/sys/user/${id}`
  })
}

export function addEmployee(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}

/**
 *  获取员工详情
 * **/

export function getEmployeeDetail(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

export function updateEmployee(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
