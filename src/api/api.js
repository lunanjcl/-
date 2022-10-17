import { post, get } from './http'

export default {
  //公共
  login: (params) => post('user/login',params),//登录
  // logout: (params) => post('user/logout',params),//注销
  // passwordEdit: (params) => post('user/savePasswordModify',params),
  // //教师信息管理
  teacher: {
    query: (params) => post('teacherinfo/query',params),//显示教师列表
    get: (params) => get('teacherinfo/get', params), //查找指定id的教师
    saveModify: (params) => post('teacherinfo/saveModify', params), //更新教师信息
    saveNew: (params) => post('teacherinfo/saveNew',params),//新增教师信息
  //   queryAll: (params) => post('teacherinfo/queryAll',params),//查询所有老师
    delModify: (params) =>('teacherinfo/delModify', params) //删除一条教师信息（更新字段deleted值为1）

  //   gradTeacher: (params) => post('teacherinfo/gradTeacherBind',params),//绑定教师和毕业设计
  //   getGradTeacher: (params) => post('teacherinfo/getGradTeacher',params),//显示某个毕业设计参加的教师
  }

  // //毕业设计启动管理
  // graduation: {
  //   query: (params) => post('graduationproj/query',params),//显示毕业设计启动列表
  //   get: (params) => get('graduationproj/get',params),//获取uuid的毕业设计信息
  //   saveModify: (params) => post('graduationproj/saveModify',params),// 保存毕业设计信息
  //   saveNew: (params) => post('graduationproj/add',params),//新增毕业设计启动列表
  //   delModify: (params) => post('graduationproj/delModify',params),//删除一条记录（更新deleted字段为1）
  // },

  // //学生信息相关
  // student: {
  //   stuExcel: (params) => post('student/excel',params),//批量上传学生信息
  //   query: (params) => post('student/query',params),//查询某届毕业设计学生信息
  //   updatePass: (params) => post('student/updatePass',params),// 把学生的密码重置为学号
  // }

}