<template>
  <div>
    <el-form
      :model="teacherForm"
      :rules="rules"
      ref="teacherForm"
      label-width="7em"
      size="mini"
    >
      <el-row>
        <el-col :span="11">
          <h5>教师基本信息</h5>
          <br />
          <el-form-item label="教师姓名" prop="name">
            <el-input v-model="teacherForm.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="tel">
            <el-input v-model="teacherForm.tel" clearable></el-input>
          </el-form-item>
          <el-form-item label="QQ" prop="QQ">
            <el-input v-model="teacherForm.QQ" clearable></el-input>
          </el-form-item>
          <el-form-item label="微信" prop="weChat">
            <el-input v-model="teacherForm.weChat" clearable></el-input>
          </el-form-item>
          <el-form-item label="研究方向" prop="inquiry">
            <el-input v-model="teacherForm.inquiry" clearable></el-input>
          </el-form-item>
          <el-form-item label="职称" prop="title">
            <el-select v-model="teacherForm.title" placeholder="请选择">
              <el-option key="助教" label="助教" value="助教"></el-option>
              <el-option key="讲师" label="讲师" value="讲师"></el-option>
              <el-option key="副教授" label="副教授" value="副教授"></el-option>
              <el-option key="教授" label="教授" value="教授"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <h5>教师登录信息</h5>
          <br />
          <el-form-item label="账号" prop="userName">
            <el-input v-model.trim="teacherForm.userName" clearable></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="password">
            <el-input
              type="password"
              v-model.trim="teacherForm.password"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="checkPassword">
            <el-input
              type="password"
              v-model.trim="teacherForm.checkPassword"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="submitForm('teacherForm')"
          >新增</el-button
        >
        <el-button @click="resetForm('teacherForm')">重置</el-button>
        <el-button @click="$router.push({ name: 'teacherList' })"
          >返回</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
     var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.teacherForm.checkPassword !== "") {
          this.$refs.teacherForm.validateField("checkPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.teacherForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      teacherForm: {
        name: "",
        tel: "",
        QQ: "",
        weChat: "",
        inquiry: "",
        title: "",
        userName: "",
        enableStatus: "",
        password: "",
        checkPassword: "",
      },
      rules: {
        name: [{ required: true, message: "请输入教师姓名" }],
        userName: [{ required: true, message: "请输入账号" }],
        password: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
        checkPassword: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
    }
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // alert("submit!");
          await this.$api.teacher.saveNew({ teacher: this.teacherForm })
          this.$message({ message: '教师新增成功', type: 'success'})
          // 跳转到list页面
          this.$router.push({ name: 'teacherList' })
        } 
      });
    },
  }
};
</script>

<style>
</style>