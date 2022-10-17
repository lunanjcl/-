<template>
  <div class="login">
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      class="login-form"
    >
      <el-form-item prop="userName">
        <el-input
          v-model.trim="loginForm.userName"
          placeholder="账号"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model.trim="loginForm.password"
          placeholder="密码"
          clearable
          @keyup.enter.native="submitForm('loginForm')"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="loginForm.userType" @change="typeChange()">
          <el-radio label="registrar">教务员</el-radio>
          <el-radio label="teacher">教师</el-radio>
          <el-radio label="student">学生</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="submitForm('loginForm')"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        userName: '',
        password: '',
        userType: 'registrar',
      },
      rules: {
        userName: [
          { require: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { require: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // alert('submit!');
          await this.$api.login(this.loginForm)
          window.location.hash = "";  //#login
          // reload()是将服务端数据重新载入
          window.location.reload()
        } 
        return valid
      });
    },
    typeChange() {
      console.log(this.loginForm.userType);
    }
  }
};
</script>
<style lang="scss">
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .login-form {
    width:360px;
    .login-btn {
      width: 100%;
      border-color: $--color-primary;
      background-color: $--color-primary;
    }
  }
}
</style>