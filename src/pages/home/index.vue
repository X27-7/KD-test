<template>
  <div class="home">
    <el-container>
      <el-aside width="200">
        <sideMenu> </sideMenu>
      </el-aside>
      <el-container>
        <el-header>
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="6">
              <div class="grid-content side" @click="$store.commit('SET_COLL')">
                <i
                  :class="
                    $store.state.isCollapse
                      ? 'el-icon-s-unfold'
                      : 'el-icon-s-fold'
                  "
                ></i>
              </div>
            </el-col>
            <el-col :span="6"
              ><div class="grid-content">
                <h1>时间管理系统</h1>
              </div></el-col
            >
            <el-col :span="6">
              <div class="grid-content inf">
                <el-avatar
                  shape="square"
                  :size="50"
                  :src="squareUrl"
                ></el-avatar>
                <span>欢迎您:</span>
                <b>{{ userInfo.nickname }}</b>
                <a href="#" @click="leave">退出</a>
              </div>
            </el-col>
          </el-row>
        </el-header>

        <el-main>
          <div class="curmbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item
                v-for="it in crumbs"
                :key="it.path"
                :to="{ path: it.path || '/manage' }"
              >
                {{ it.meta.name || "首页" }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import * as api from "api";
import * as vuex from "vuex";

import sideMenu from "../../components/sideMenu";

export default {
  components: {
    sideMenu,
  },
  computed: {
    ...vuex.mapState(["userInfo", "crumbs"]),
    squareUrl() {
      return this.userInfo.headimgurl
        ? this.userInfo.headimgurl
        : "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png";
    },
  },
  mounted() {
    api.getloginlog().then((res) => {
      console.log(res);
    });
  },
  methods: {
    leave() {
      localStorage.removeItem("DX");
      this.$router.push("/my");
      window.location.reload();
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.home {
  height: 100%;
}

.el-container {
  margin-bottom: 40px;
  height: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

// el-row
.inf {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.el-icon-s-unfold,
.el-icon-s-fold {
  font-size: 30px;
  color: gold;
}
.row-bg {
  padding: 10px 0;
  background-color: #b3c0d1;
  height: 60px;
  padding: 0;
}
.side {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 60px;
  width: 70px;
}
</style>