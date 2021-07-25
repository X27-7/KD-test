<template>
  <div class="sideMenu">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      text-color="#4e5bf8"
      ref="sideMenu"
      active-text-color="red"
      :collapse="$store.state.isCollapse"
    >
      <h1 class="logo">logo</h1>

      <qf-sub-menu :sideMenu="$store.state.userMenu"></qf-sub-menu>
    </el-menu>
  </div>
</template>

<style>
.logo{
  height: 60px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

