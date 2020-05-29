<template>
  <div class="app-container">
    <div class="allmenu">
      <el-table
        :data="allMenu"
        style="width: 100%;margin-bottom: 20px;"
        row-key="routeId"
        border
        header-align="center"
        align="center"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="path" label="路径" header-align="center" align="left"></el-table-column>
        <el-table-column prop="component" label="显示路径" header-align="center" align="center"></el-table-column>
        <el-table-column prop="hidden" label="菜单是否显示" header-align="center" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.hidden"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="菜单名称" header-align="center" align="center"></el-table-column>
        <el-table-column prop="redirect" label="菜单重定向">
             <template slot-scope="scope">
                 {{scope.row.redirect ? scope.row.redirect : 'noRedirects'}}
            </template>
        </el-table-column>
        <el-table-column prop="meta.title" label="title" header-align="center" align="center"></el-table-column>
        <el-table-column prop="meta.icon" label="icon" header-align="center" align="center">
            <template slot-scope="scope">
              <svg-icon :icon-class="scope.row.meta ? scope.row.meta.icon : 'link'" />
            </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allMenu: [
        {
          routeId: 0,
          path: "/login",
          component: "login/index",
          name:"登陆页",
          hidden: true
        },
        {
          routeId: 1,
          path: "/",
          component: "Layout",
          redirect: "/dashboard",
          name:"首页",
          hidden:false,
          children: [
            {
              routeId: 11,
              path: "dashboard",
              component: "dashboard/index",
              name: "首页",
               hidden:false,
              meta: { title: "首页", icon: "dashboard", affix: true }
            }
          ]
        },
        {
          routeId: 2,
          path: "/documentation",
          redirect: "noRedirect",
          component: "Layout",
          name: "功能",
           hidden:false,
          alwaysShow: true, // 如果只有一个路由 是否显示下拉箭头
          meta: { title: "功能", icon: "eye" },
          children: [
            {
              routeId: 21,
              path: "index",
              component: "documentation/index",
              name: "Documentation",
               hidden:false,
              meta: {
                title: "Documentation",
                icon: "user",
                affix: true
              }
            }
          ]
        },
        {
          routeId: 3,
          path: "/guide",
          redirect: "/guide/index",
          component: "Layout",
          name: "附属",
           hidden:false,
          alwaysShow: true, // 如果只有一个路由 是否显示下拉箭头
          meta: { title: "附属", icon: "user" },
          children: [
            {
              routeId: 31,
              path: "index",
              component: "guide/index",
               hidden:false,
              name: "Guide",
              meta: { title: "Guide", icon: "eye-open", noCache: true }
            }
          ]
        }
      ]
    };
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.allmenu {
}
</style>

