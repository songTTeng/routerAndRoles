<!-- 角色管理 -->
<template>
    <div class="app-container roleManage">
        <el-form ref="form" :model="formDoc" label-width="80px">
            <el-row :gutter="24">
                <el-col :span="8">
                    <el-form-item label="角色名称">
                        <el-input
                            placeholder="请输入角色名称"
                            @keyup.enter.native="_getRoleList"
                            v-model="formDoc.roleName"
                            class="inputWid">
                        </el-input>
                   </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="角色别名">
                        <el-input
                            placeholder="请输入角色别名"
                            @keyup.enter.native="_getRoleList"
                            v-model="formDoc.roleAlias"
                            class="inputWid">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-button @click="_getRoleList" type="primary" icon="el-icon-search">查询</el-button>
                <el-button @click="resetRolerList" type="info">重置</el-button>
              </el-row>
        </el-form>
       <div class="showTable">
            <el-table
              :data="tableData"
              border
              row-key="id"
              style="width: 100%">
              <el-table-column type="expand">
                  <template slot-scope="scope">
                      <el-card class="box-card">
                          <el-form label-position="left" inline>
                              <el-row :gutter="24">
                                <el-col :span="12">
                                  <el-form-item label="角色名称：">
                                    <span>{{scope.row.roleName}}</span>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                  <el-form-item label="角色别名：">
                                    <span>{{ scope.row.roleAlias}}</span>
                                  </el-form-item>
                                </el-col>
                              </el-row>
                              <el-row :gutter="24">
                                  <el-col :span="12">
                                    <el-form-item label="上级角色：">
                                      <span>{{ scope.row.parentName }}</span>
                                    </el-form-item>
                                  </el-col>
                                  <el-col :span="12">
                                    <el-form-item label="角色排序：">
                                      <span>{{ scope.row.sort }}</span>
                                    </el-form-item>
                                  </el-col>
                              </el-row>
                          </el-form>
                      </el-card>
                  </template>
              </el-table-column>
              <el-table-column
                  label="ID"
                  header-align="center"
                  min-width="50"
                  :show-overflow-tooltip="true"
                  prop="tenantId">
              </el-table-column>
              <el-table-column
                  label="角色名称"
                  header-align="center"
                  min-width="60"
                  :show-overflow-tooltip="true"
                  prop="roleName">
              </el-table-column>
              <el-table-column
                  label="角色别名"
                  header-align="center"
                  min-width="60"
                  :show-overflow-tooltip="true"
                  prop="roleAlias">
              </el-table-column>
              <el-table-column
                  label="排序"
                  header-align="center"
                  min-width="80"
                  :show-overflow-tooltip="true"
                  prop="sort">
              </el-table-column>
               <el-table-column
                    label="操作"
                    header-align="center"
                    align="center"
                    width="120">
                    <template slot-scope="scope">
                    <div>
                        <el-button type="text" @click.native="handleEdit('check',scope.row)" size="small">查看</el-button>
                        <el-button type="text" @click.native="handleEdit('edit',scope.row)" size="small">编辑</el-button>
                    </div>
                    </template>
                </el-table-column>
          </el-table>
       </div>
       <show-menu ref="getAllMenu"></show-menu>
    </div>
</template>

<script>
import showMenu from "@/components/menuDig/index"
import {getRoleList} from '@/api/user'
export default {
    components:{
        showMenu
    },
    data() {
        return {
          formDoc:{
            roleName:"",
            roleAlias:""
          },
          tableData: []
        }
    },
    created() {
      this._getRoleList()
      let str = '{"title": "执法依据维护", "icon": "form" }'
      console.log("JSON.parse",JSON.parse(str))
    },
    methods: {
      _getRoleList(){
        getRoleList(this.formDoc).then(res =>{
          if(res.code == 200){
            this.tableData = res.data || []
          }
        })
      },
      handleEdit(type,row){
        let obj = {
            id:row.id,
            type:type,
            flag:type == 'check' ? true : false
        }
        this.$refs.getAllMenu.show(obj)
      },
      resetRolerList(){
        this.formDoc = {
          roleName:"",
          roleAlias:""
        }
        this._getRoleList()
      }
    }
    
}
</script>
<style lang='scss' scoped>
.roleManage{

}

</style>