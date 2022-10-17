<template>
  <div class="app">
    <el-container class="app-container">
      <el-header class="app-header">
        <div class="app-header_left">
          <el-tooltip
            placement="bottom"
            :content="isCollapse ? '展开侧边栏' : '收起侧边栏'"
          >
            <i
              class="iconfont icon-caidan fs-20 cursor-pointer"
              @click="isCollapse = !isCollapse"
            ></i>
          </el-tooltip>
        </div>
        <div class="app-header_center fs-20">毕业设计选题系统</div>
        <div class="app-header_right cursor-pointer">
          <el-dropdown :hide-on-click="false">
            <span class="el-dropdown-link">
              {{ user.name }}<i class="iconfont icon-bussiness-man fs-18"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <i class="iconfont icon-component"></i
                >我的信息</el-dropdown-item
              >
              <el-dropdown-item>
                <i class="iconfont icon-password"></i>
                修改密码</el-dropdown-item
              >
              <el-dropdown-item>
                <i class="iconfont icon-history"></i>
                退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside
          class="app-aside"
          :width="isCollapse ? '64px' : '200px'"
          v-auto-windows-height="101"
        >
          <vue-scroll>
            <el-menu
              :default-active="$route.name"
              class="app-menu"
              :collapse="isCollapse"
              text-color="#485a6a"
              active-text-color="#5c9acf"
              router
            >
              <el-menu-item index="graduate">
                <i class="app-menu-icon iconfont icon-data"></i>
                <span slot="title">毕业设计启动</span>
              </el-menu-item>
              <el-menu-item index="teacher" :route="{ name: 'teacherList' }">
                <i class="app-menu-icon iconfont icon-apparel"></i>
                <span slot="title">教师信息管理</span>
              </el-menu-item>
            </el-menu>
          </vue-scroll>
        </el-aside>
        <el-main>
          <section v-if="$route.name !== 'login'" class="app-page">
            <div class="app-page-header">
              <el-row class="app-page-header_row">
                <el-col :span="12">
                  <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }"
                      >首页</el-breadcrumb-item
                    >
                    <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{ item }}</el-breadcrumb-item
                    >
            
                  </el-breadcrumb>
                </el-col>
                <el-col :span="12" class="app-page-tools">
                  <div>
                    <template v-for="item in appPageTools">
                      <el-button
                        :type="item.type"
                        :icon="item.icon"
                        :key="item.content"
                        @click="item.callback"
                        size="mini"
                        >{{ item.content }}</el-button
                      >
                    </template>
                  </div>
                </el-col>
              </el-row>
            </div>
            <vue-scroll>
              <keep-alive>
                <router-view class="app-view" v-auto-windows-height="170">
                </router-view>
              </keep-alive>
            </vue-scroll>
          </section>
          <section v-else class="app-page app-login">
            <router-view></router-view>
          </section>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "App",
  data() {
    return {
      isCollapse: false,
    };
  },
  created() {
    this.initUser();
  },
  methods: {
    initUser() {
      const name = this.$cookies.get("name");
      const userType = this.$cookies.get("userType");
      const userUuid = this.$cookies.get("userUuid");
      const userName = this.$cookies.get("userName");

      this.$store.commit("setUser", {
        name,
        userType,
        userUuid,
        userName,
      });
    },
  },
  computed: {
    appPageTools() {
      // console.log('$route.name:', this.$route.name)
      // console.log('appPageToolsMap[this.$route.name]::', this.appPageToolsMap[this.$route.name])
      return this.appPageToolsMap[this.$route.name] || {};
    },
    ...mapState({
      user: "user",
      appPageToolsMap: "appPageToolsMap",
    }),
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
}
* :not(input, textarea) {
  -webkit-touch-callout: none;
  // -webkit-user-select: none;
  // -webkit-user-select: none;
}
a {
  color: $--color-primary;
}
input {
  border: 0;
  outline: none;
  -webkit-appearance: none;
}
html,
body {
  height: 100%;
  width: 100%;
  min-width: 1200px;
  font-size: 26px;
  color: #333333;
  background-color: #e9ecf3;
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.app {
  height: 100%;
}
.app-container {
  width: 100%;
}
.app-header {
  display: flex;
  z-index: 10;
  align-items: center;
  font-size: 12px;
  background-color: $--color-white;
  box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.5);
  .app-header_left {
    flex: 0 0 100px;
    text-align: center;
  }
  .app-header_center {
    flex: 1;
    overflow-x: auto;
  }
  .app-header_right {
    text-align: right;
  }
}
.myicon {
  font-size: 18px;
}

//页面部分
.app-page {
  position: relative;
  padding: 10px 5px 15px;
  border-radius: 6px;
  background-color: $--color-white;
  .app-page-header {
    padding: 0px 15px;
    margin-bottom: 10px;
    .app-page-header_row {
      display: flex;
      align-items: center;
      border-bottom: 1px solid $--color-primary;
      padding-bottom: 10px;
    }
  }
  &.app-login {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 100;
    border-radius: 0;
    overflow: hidden;
    background: linear-gradient(to bottom right, #fe9, rgb(115, 149, 184));
  }
  .app-view {
    position: relative;
    padding: 5px 15px;
  }
}
.app-page-tools {
  position: relative;
  height: 28px;
  text-align: right;
}

//侧边栏
.app-aside {
  margin: 20px 0px 20px 20px;
  border-radius: 6px;
  background-color: $--color-white;
  overflow: hidden !important;
  transition: all 0.2s ease-in-out;
  .app-menu {
    min-width: 100%;
    border-right: 0 !important;
    .app-menu-icon {
      margin-right: 5px;
      width: 24px;
      text-align: center;
      font-size: 18px;
      vertical-align: middle;
    }
  }
}
</style>
