<!--  -->
<template>
  <div class="showDig">
    <el-dialog
      title="编辑路由"
      :visible.sync="dialogMenuVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :before-close="cancel"
      width="40%"
    >
      <div class="getTree">
        <el-tree
          :data="treeData"
          show-checkbox
          node-key="id"
          ref="tree"
          :props="defaultProps"
          default-expand-all
          highlight-current
        ></el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="save" :loading="saveFlag" :disabled="saveFlag || disabledFlag">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {getAllRoutes,setGrant,getRoleTreeKeys} from "@/api/user"
export default {
  name: "getAllMenu",
  computed: {
    ...mapGetters(["roles"])
  },
  data() {
    return {
      dialogMenuVisible: false,
      disabledFlag:false,
      saveFlag:false,
      id:"", //查询使用
      treeData: [
        // {
        //   id:1,
        //   path: "/dataMaintain",
        //   component: 'Layout',
        //   redirect: "/dataMaintain/lawBasic",
        //   name: "数据维护",
        //   meta: { title: "数据维护", icon: "form" },
        //   children: [
        //     {
        //       id:11,
        //       path: "lawBasic",
        //       name: "执法依据维护",
        //       component: "dataMaintain/lawBasic",
        //       meta: { title: "执法依据维护", icon: "form" }
        //     },
        //     {
        //       id:12,
        //       path: "addLaw",
        //       name: "新增执法依据",
        //       hidden: true, 
        //       component: "dataMaintain/addLaw",
        //       meta: { title: "新增执法依据" }
        //     },
        //     {
        //       id:13,
        //       path: "lawDoc",
        //       name: "执法文书维护",
        //       component: "dataMaintain/lawDoc",
        //       meta: { title: "执法文书维护", icon: "form" }
        //     },
        //     {
        //       id:14,
        //       path: "lawProof",
        //       name: "执法证维护",
        //       hidden: true, 
        //       component: "dataMaintain/lawProof",
        //       meta: { title: "执法证维护", icon: "form" }
        //     },
        //     {
        //       id:15,
        //       path: "lawPeople",
        //       name: "执法人员信息库",
        //       hidden: false,
        //       component: "dataMaintain/people",
        //       meta: { title: "执法人员信息库", icon: "form" }
        //     },
        //     {
        //       id:16,
        //       path: "lawList",
        //       name: "权责清单库",
        //       hidden: false,
        //       component:"dataMaintain/lawList",
        //       meta: { title: "权责清单库", icon: "form" }
        //     },
        //     {
        //       id:17,
        //       path: "addLawList",
        //       name: "新增权责清单",
        //       hidden: true, 
        //       component:"dataMaintain/addLawList",
        //       meta: { title: "新增权责清单" }
        //     },
        //     {
        //       id:18,
        //       path: "basicLaw",
        //       name: "法律法规库",
        //       hidden: false,
        //       component:"dataMaintain/basicLaw",
        //       meta: { title: "法律法规库", icon: "form" }
        //     },
        //     {
        //       id:19,
        //       path: "discretionList",
        //       name: "裁量标准库",
        //       hidden: false,
        //       component:"dataMaintain/discretionList",
        //       meta: { title: "裁量标准库", icon: "form" }
        //     },
        //     {
        //       id:20,
        //       path: "addDiscretion",
        //       name: "新增裁量标准",
        //       hidden: true, 
        //       component:"dataMaintain/addDiscretion",
        //       meta: { title: "新增裁量标准" }
        //     }
        //   ]
        // },
        // {
        //   id: 2,
        //   path: "/auxiliary",
        //   component: "Layout",
        //   redirect: "noRedirect",
        //   name: "附属功能",
        //   alwaysShow: true, // 如果只有一个路由 是否显示下拉箭头
        //   meta: { title: "附属功能", icon: "form" },
        //   children: [
        //     {
        //       id: 21,
        //       path: "invoice",
        //       name: "发票分配",
        //       component: "auxiliary/invoice",
        //       meta: { title: "发票分配", icon: "form" }
        //     },
        //     {
        //       id: 22,
        //       path: "orderChange",
        //       name: "责改分配",
        //       component: "auxiliary/orderChange",
        //       meta: { title: "责改分配", icon: "form" }
        //     }
        //   ]
        // },
        // {
        //   id:3,
        //   path: '/documentManage',
        //   component: 'Layout',
        //   redirect: 'documentManage/document',
        //   name: '文书管理',
        //   hidden: false, 
        //   alwaysShow: true, // 如果只有一个路由 是否显示下拉箭头
        //   meta: { title: '文书管理', icon: 'form' },
        //   children: [
        //     {
        //       id:31,
        //       path: 'document',
        //       name: '文书模版',
        //       component:'documentManage/document',
        //       meta: { title: '文书模版', icon: 'form' }
        //     }
        //   ]
        // },
        // {
        //   id:4,
        //   path: '/myWork',
        //   component: 'Layout',
        //   redirect: '/myWork/index',
        //   name: '我的事务',
        //   alwaysShow: true,
        //   meta: { title: '我的事务', icon: 'form' },
        //   children: [
        //     {
        //       id:41,
        //       path: 'index',
        //       name: '待办事务',
        //       component: "myWork/index",
        //       meta: { title: '待办事务', icon: 'form' }
        //     },
        //     {
        //       id:42,
        //       path: 'overWork',
        //       name: '已办事务',
        //       hidden: true, 
        //       component: "myWork/overWork",
        //       meta: { title: '已办事务', icon: 'form' }
        //     },
        //     {
        //       id:43,
        //       path: 'startWork',
        //       name: '发起事务',
        //       component: "myWork/startWork",
        //       meta: { title: '发起事务', icon: 'form' }
        //     },
        //     {
        //       id:44,
        //       path: 'detail',
        //       name: '事务详情',
        //       hidden: true, 
        //       component: "myWork/detail",
        //       meta: { title: '事务详情' }
        //     },
        //     {
        //       id:45,
        //       path: 'caseDetail',
        //       name: '案件登记详情',
        //       hidden: true, 
        //       component: "myWork/caseDetail",
        //       meta: { title: '案件登记详情'}
        //     },
        //     {
        //       id:46,
        //       path: 'openBillDetail',
        //       name: '申请开票详情',
        //       hidden: true, 
        //       component: "myWork/openBillDetail",
        //       meta: { title: '申请开票详情'}
        //     },
        //     {
        //       id:47,
        //       path: 'abolishBillDetail',
        //       name: '废除发票详情',
        //       hidden: true, 
        //       component: "myWork/abolishBillDetail",
        //       meta: { title: '废除发票详情'}
        //     },
        //     {
        //       id:48,
        //       path: 'abolishOrderDetail',
        //       name: '废除责改号详情',
        //       hidden: true, 
        //       component: "myWork/abolishOrderDetail",
        //       meta: { title: '废除责改号详情'}
        //     }
        //   ]
        // },
        // {
        //   id:5,
        //   path: '/caseManage',
        //   component: 'Layout',
        //   redirect: '/caseManage/generalCase',
        //   name: '案件管理',
        //   meta: { title: '案件管理', icon: 'form' },
        //   children: [
        //     {
        //       id:51,
        //       path: 'generalCase',
        //       name: '一般程序案件',
        //       component: "caseManage/generalCase",
        //       meta: { title: '一般程序案件', icon: 'form' }
        //     },
        //     {
        //       id:52,
        //       path: 'summaryCase',
        //       name: '简易程序案件',
        //       hidden: true,
        //       component: "caseManage/summaryCase",
        //       meta: { title: '简易程序案件', icon: 'form' }
        //     },
        //     {
        //       id:53,
        //       path: 'caseRegister',
        //       name: '案件登记',
        //       component: "caseManage/caseRegister",
        //       meta: { title: '案件登记', icon: 'form' }
        //     },
        //     {
        //       id:54,
        //       path: 'case',
        //       name: '立案上报',
        //       hidden: true,
        //       component: "caseManage/caseReport",
        //       redirect: 'case/index',
        //       meta: { title: '立案上报', icon: 'form' },
        //       children: [
        //         {
        //           id:541,
        //           path: 'index',
        //           name: '文书信息',
        //           hidden: true,
        //           component: "caseManage/caseFlow/index"
        //         },
        //         {
        //           id:542,
        //           path: 'base',
        //           name: '基本信息',
        //           hidden: true,
        //           component: "caseManage/caseFlow/baseInfo"
        //         },
        //         {
        //           id:543,
        //           path: 'proFlow',
        //           name: '办理流程',
        //           hidden: true,
        //           component: "caseManage/caseFlow/proFlow"
        //         },
        //         {
        //           id:544,
        //           path: 'proSpeed',
        //           name: '办理进度',
        //           hidden: true,
        //           component: "caseManage/caseFlow/proSpeed"
        //         },
        //         {
        //           id:545,
        //           path: 'editHistory',
        //           name: '修改记录',
        //           hidden: true,
        //           component: "caseManage/caseFlow/editHistory"
        //         },
        //       ]
        //     },
        //     {
        //       id:55,
        //       path: 'willCase',
        //       name: '待立案',
        //       component: "caseManage/willCase",
        //       meta: { title: '待立案', icon: 'form' },
        //     },
        //     {
        //       id:56,
        //       path: 'detailCase',
        //       name: '待立案详情',
        //       component: "caseManage/detailCase",
        //       meta: { title: '待立案详情', icon: 'form' },
        //       hidden: true,
        //     },
        //     {
        //       id:57,
        //       path: 'reportCase',
        //       name: '上会案件',
        //       hidden: false,
        //       component: "caseManage/reportCase",
        //       meta: { title: '上会案件', icon: 'form' }
        //     },
        //   ]
        // },
        // {
        //   id:6,
        //   path: '/filesManage',
        //   component: 'Layout',
        //   redirect: '/filesManage/volumeManage',
        //   name: '档案管理',
        //   alwaysShow: true,
        //   meta: { title: '档案管理', icon: 'xitongguanli'},
        //   children: [
        //     {
        //       id:61,
        //       path: 'volumeManage',
        //       name: '卷库管理',
        //       component: "filesManage/volumeManage",
        //       meta: { title: '卷库管理', icon: 'form' }
        //     },
        //     {
        //       id:62,
        //       path:"volumList",
        //       name:"卷宗目录",
        //       hidden:true,
        //       component: "filesManage/volumList",
        //       meta: { title: '卷宗目录',icon: 'form' }
        //     },
        //     {
        //       id:63,
        //       path: 'noVolum',
        //       name: '未归档卷宗',
        //       component: "filesManage/noVolum",
        //       meta: { title: '未归档卷宗', icon: 'form' }
        //     },
        //     {
        //       id:64,
        //       path: 'volum',
        //       name: '已归档卷宗',
        //       component: "filesManage/volum",
        //       meta: { title: '已归档卷宗', icon: 'form' }
        //     }
        //   ]
        // },
        // {
        //   id:7,
        //   path: '/leaderCockpit',
        //   component: 'Layout',
        //   redirect: 'noRedirect',
        //   name: '领导驾驶舱',
        //   alwaysShow: true, 
        //   meta: { title: '领导驾驶舱', icon: 'form'},
        //   children: [
        //     {
        //       id:71,
        //       path: 'leader',
        //       name: '领导指挥中心',
        //       component: "leaderCockpit/index",
        //       meta: { title: '领导指挥中心', icon: 'form' }
        //     }
        //   ]
        // },
        // {
        //   id:8,
        //   path: '/classRoom',
        //   component: 'Layout',
        //   redirect: 'noRedirect',
        //   name: '城管课堂',
        //   alwaysShow: true, 
        //   meta: { title: '城管课堂', icon: 'form' },
        //   children: [
        //     {
        //       id:81,
        //       path: 'resourceManage',
        //       name: '资源管理',
        //       component: "classRoom/resourceManage/index",
        //       meta: { title: '资源管理', icon: 'form' }
        //     },
        //     {
        //       id:82,
        //       path: 'colManage',
        //       name: '栏目管理',
        //       component: "classRoom/colManage/index",
        //       meta: { title: '栏目管理', icon: 'form' }
        //     },
        //     {
        //       id:83,
        //       path: 'courseManage',
        //       name: '课程管理',
        //       component: "classRoom/courseManage/index",
        //       meta: { title: '课程管理', icon: 'form' }
        //     },
        //     {
        //       id:84,
        //       path: 'addCourse',
        //       name: '新建课程',
        //       component: "classRoom/courseManage/addCourse",
        //       meta: { title: '新建课程' },
        //       hidden: true
        //     },
        //     {
        //       id:85,
        //       path: 'detailCourse',
        //       name: '课程管理-详情',
        //       component: "classRoom/courseManage/detailCourse",
        //       meta: { title: '课程管理-详情' },
        //       hidden: true
        //     },
        //     {
        //       id:86,
        //       path: 'examManage',
        //       name: '考试管理',
        //       component: "classRoom/examManage/index",
        //       meta: { title: '考试管理', icon: 'form' }
        //     },
        //     {
        //       id:87,
        //       path: 'examAnalysis',
        //       name: '成绩分析',
        //       hidden: true, // 不在侧边栏线上
        //       component: "classRoom/examManage/examAnalysis",
        //       meta: { title: '成绩分析' }
        //     },
        //     {
        //       id:88,
        //       path: 'resultDetail',
        //       name: '成绩分析详情',
        //       hidden: true, // 不在侧边栏线上
        //       component: "classRoom/examManage/resultDetail",
        //       meta: { title: '成绩分析详情' }
        //     },
        //     {
        //       id:89,
        //       path: 'examDetail',
        //       name: '考试详情',
        //       hidden: true, // 不在侧边栏线上
        //       component: "classRoom/examManage/examDetail",
        //       meta: { title: '考试详情' }
        //     },
        //     {
        //       id:890,
        //       path: 'taskManage',
        //       name: '任务管理',
        //       component: "classRoom/taskManage/index",
        //       meta: { title: '任务管理', icon: 'form' }
        //     },
        //     {
        //       id:891,
        //       path: 'taskManage/check',
        //       name: '任务详情',
        //       hidden: true, // 不在侧边栏线上
        //       component: "classRoom/taskManage/check",
        //       meta: { title: '任务详情' }
        //     },
        //     {
        //       id:892,
        //       path: 'taskManage/checkDetail',
        //       name: '任务列表详情',
        //       hidden: true, // 不在侧边栏线上
        //       component: "classRoom/taskManage/checkDetail",
        //       meta: { title: '任务列表详情' }
        //     },
        //   ]
        // },
        // {
        //   id:9,
        //   path: '/performanceAssess',
        //   component: 'Layout',
        //   redirect: 'noRedirect',
        //   name: '绩效考核',
        //   alwaysShow: true, // 如果只有一个路由 是否显示下拉箭头
        //   meta: { title: '绩效考核', icon: 'form' },
        //   children: [
        //     {
        //       id:91,
        //       path: 'assessProject',
        //       name: '考核项目',
        //       component: "performanceAssess/assessProject/index",
        //       meta: { title: '考核项目', icon: 'form' }
        //     },
        //     {
        //       id:92,
        //       path: 'addProject',
        //       name: '考核项目类型',
        //       component: "performanceAssess/assessProject/addProject",
        //       meta: { title: '考核项目类型' },
        //       hidden: true
        //     },
        //     {
        //       id:93,
        //       path: 'assessTask',
        //       name: '考核任务',
        //       component: "performanceAssess/assessTask/index",
        //       meta: { title: '考核任务', icon: 'form' },
        //     },
        //     {
        //       id:94,
        //       path: 'taskAddOrEdit',
        //       name: '考核任务类型',
        //       hidden: true, // 不在侧边栏线上
        //       component: "performanceAssess/assessTask/addOrEdit",
        //       meta: { title: '考核任务类型' },
        //     },
        //     {
        //       id:95,
        //       path: 'startAssess',
        //       name: '进行考核',
        //       component: "performanceAssess/startAssess/index",
        //       meta: { title: '进行考核', icon: 'form' }
        //     },
        //     {
        //       id:96,
        //       path: 'startAssessDetail',
        //       name: '考核内容',
        //       hidden: true, // 不在侧边栏线上
        //       component: "performanceAssess/startAssess/startAssessDetail",
        //       meta: { title: '考核内容' }
        //     },
        //     {
        //       id:97,
        //       path: 'assessResult',
        //       name: '考核结果',
        //       component: "performanceAssess/assessResult/index",
        //       meta: { title: '考核结果', icon: 'form' }
        //     },
        //     {
        //       id:98,
        //       path: 'resultDetail',
        //       name: '考核详情',
        //       hidden: true, // 不在侧边栏线上
        //       component: "performanceAssess/assessResult/resultDetail",
        //       meta: { title: '考核详情' }
        //     },
        //   ]
        // },
        // {
        //   id:10,
        //   path: '/dataAnalysis',
        //   component: 'Layout',
        //   redirect: '/dataAnalysis/dataStats',
        //   name: '数据分析',
        //   alwaysShow: true, // 如果只有一个路由 是否显示下拉箭头
        //   meta: { title: '数据分析', icon: 'form'},
        //   children: [
        //     {
        //       id:101,
        //       path: 'dataStats',
        //       name: '数据统计',
        //       component: "dataAnalysis/dataStats",
        //       meta: { title: '数据统计', icon: 'form' }
        //     }
        //   ]
        // },
        // {
        //   id:11,
        //   path: '/systemManage',
        //   component: 'Layout',
        //   redirect: '/systemManage/roleManage',
        //   name: '系统管理',
        //   meta: { title: '系统管理', icon: 'form' },
        //   children: [
        //     {
        //        id:111,
        //       path: 'roleManage',
        //       name: '角色管理',
        //       component: "systemManage/roleManage",
        //       meta: { title: '角色管理', icon: 'form' }
        //     },
        //     {
        //        id:112,
        //       path: 'userManage',
        //       name: '用户管理',
        //       component: "systemManage/userManage",
        //       meta: { title: '用户管理', icon: 'form' }
        //     },
        //     {
        //        id:113,
        //       path: 'userDetail',
        //       name: '编辑用户',
        //       hidden: true, // 不在侧边栏线上
        //       component: "systemManage/userDetail",
        //       meta: { title: '编辑用户', icon: 'form' }
        //     },
        //     {
        //        id:114,
        //       path:"menuManage",
        //       name:"菜单管理",
        //       hidden: true, // 不在侧边栏线上
        //       component: "systemManage/menuManage",
        //       meta: { title: '菜单管理',icon: 'form' }
        //     },
        //   ]
        // },
      ],
      defaultProps: {
        children: "children",
        label: "title"
      }
    };
  },
  created() {
    this._getAllRoutes()
  },
  mounted() {},
  methods: {
    _getAllRoutes(){
     getAllRoutes().then((res)=>{
        if(res.code == 200){
          this.treeData = res.data || []
        }else{
          this.treeData = []
          this.$message.error({message:res.msg})
        }
     })
    },
    _getRoleTreeKeys(roles){
      getRoleTreeKeys({roleIds:roles}).then((res)=>{
        if(res.code == 200){
          let arr = res.data || []
          this.$refs.tree.setCheckedKeys(arr);
        }else{
          this.$refs.tree.setCheckedKeys([]);
          this.$message.error({message:res.msg})
        }
     })
    },
    show(obj) {
      this.disabledFlag = obj.flag
      this.id = obj.id
      this.dialogMenuVisible = true;
      this._getRoleTreeKeys(this.id)
      // this.$nextTick(()=>{
      //   this.$refs.tree.setCheckedKeys([13, 14, 11, 111, 112, 113, 114]);
      // })
    },
    cancel(){
      this.$refs.tree.setCheckedKeys([]);
      this.dialogMenuVisible = false;
    },
    save(){
      let params = {
        dataScopeIds:[],
        apiScopeIds:[],
        roleIds:this.id.split(","), //当前登陆人的角色
        menuIds:this.$refs.tree.getCheckedKeys()
      }
      setGrant(params).then((res)=>{
        if(res.code == 200){
          this.$message.success({message:"菜单设置成功"})
          this.cancel()
        }else{
          this.$message.error({message:res.msg})
        }
      })
    },
      // getCheckedKeys() {
      //   console.log("key",this.$refs.tree.getCheckedKeys());
      // },
      // setCheckedKeys() {
      //   this.$refs.tree.setCheckedKeys([13]);
      // },
      // resetChecked() {
      //   this.$refs.tree.setCheckedKeys([]);
      // }
  }
};
</script>
<style lang='scss' scoped>
.getTree {
  /deep/ .el-tree-node__content {
    height: 32px;
    .el-tree-node__label {
      font-size: 16px;
    }
    .el-checkbox__inner {
      width: 20px;
      height: 20px;
    }
  }

  /deep/ .el-checkbox__inner::after {
    left: 7px;
    top: 2px;
    width: 4px;
    height: 10px;
  }
  /deep/ .el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
    top: 8px;
  }
}
</style>