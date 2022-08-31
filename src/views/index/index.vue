<template>
  <div class="index-container">
    <PageHeader title="首页" />
    <div class="search-content">
      <el-form ref="searchForm" class="search-form" :model="listQuery" :inline="true">
        <el-form-item label="查询条件：">
          <el-input v-model="listQuery.nameKeyword" class="input-width" placeholder="资源名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="查询条件：">
          <el-input v-model="listQuery.nameKeyword" class="input-width" placeholder="资源名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="查询条件：">
          <el-input v-model="listQuery.nameKeyword" class="input-width" placeholder="资源名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="查询条件：">
          <el-input v-model="listQuery.nameKeyword" class="input-width" placeholder="资源名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="查询条件：">
          <el-input v-model="listQuery.nameKeyword" class="input-width" placeholder="资源名称" clearable></el-input>
        </el-form-item>
      </el-form>
      <div class="search-btn">
        <el-button type="primary" @click="handleSearchList"> 查询 </el-button>
        <el-button @click="handleResetSearch"> 重置 </el-button>
      </div>
    </div>
    <div class="mian-table">
      <el-table ref="resourceTable" class="custom-table" :data="list" style="width: 100%">
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="帐号" align="center">
          <template slot-scope="scope">
            <span class="add-edit" @click="openDialog">{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">{{ scope.row.nickName }}</template>
        </el-table-column>
        <el-table-column label="手机" align="center">
          <template slot-scope="scope">{{ scope.row.phone }}</template>
        </el-table-column>
        <el-table-column label="添加时间" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.createTime | formatDateTime }}</template>
        </el-table-column>
        <el-table-column label="最后登录" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.loginTime | formatDateTime }}</template>
        </el-table-column>
        <el-table-column label="是否启用" width="140" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              @change="handleStatusChange(scope.$index, scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        class="custom-pagination"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="listQuery.pageSize"
        :current-page.sync="listQuery.pageNum"
        :total="total"
        :page-sizes="[10, 20, 30, 40]"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <el-drawer :size="'50%'" append-to-body :visible.sync="dialogFlag" :with-header="false">
      <div></div>
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatTime } from '@/utils/time'

const defaultListQuery = {
  pageNum: 1,
  pageSize: 20,
  nameKeyword: null,
  urlKeyword: null,
  categoryId: null,
}

export default {
  name: 'Index',
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      categoryOptions: [],
      dialogFlag: false,
      total: 100,
      list: [
        {
          id: 43,
          username: 'admin1',
          password: '$2a$10$Ru4G6vTjgWHrT/zb4B/87eshorSis95IuseIxXrE.b5EofPlAToxu',
          icon: null,
          email: null,
          nickName: '雾非花',
          note: null,
          createTime: '2020-12-28T09:47:37.000+0000',
          loginTime: '2020-12-31T05:51:12.000+0000',
          status: 1,
          phone: '15765432188',
          state: 1,
        },
        {
          id: 42,
          username: 'admin2',
          password: '$2a$10$xG0e5w2bps57fcQzUsrSmOpTSVREhx0oLhXte5CI8/90i3XTw..tu',
          icon: null,
          email: null,
          nickName: '雾非花',
          note: null,
          createTime: '2020-12-28T09:46:59.000+0000',
          loginTime: '2021-01-04T06:31:04.000+0000',
          status: 1,
          phone: '15765432188',
          state: 1,
        },
        {
          id: 41,
          username: 'admin3',
          password: '$2a$10$XMVAanAlU6s0Mq6MF1slY.if45pM8u23Cg5QK0G3q4UefvEQZNuk.',
          icon: null,
          email: null,
          nickName: '雾非花',
          note: null,
          createTime: '2020-12-24T01:53:33.000+0000',
          loginTime: '2021-01-04T01:40:51.000+0000',
          status: 1,
          phone: '15765432188',
          state: 1,
        },
        {
          id: 40,
          username: 'admin4',
          password: '$2a$10$tvJbXY3kVqxnC6i3/NKJMOi6YHYbs0bWmLu4ObfUq5pPBTXt.ai9i',
          icon: null,
          email: null,
          nickName: '雾非花',
          note: null,
          createTime: '2020-12-16T07:38:10.000+0000',
          loginTime: '2020-12-16T07:41:34.000+0000',
          status: 1,
          phone: '15765432188',
          state: 1,
        },
        {
          id: 39,
          username: 'admin5',
          password: '$2a$10$7DZ5AyKao0/axS6BdDSpB.E5fAt0Bh/o1KkNbx02qBrtTOsJrdgsi',
          icon: null,
          email: null,
          nickName: '雾非花',
          note: null,
          createTime: '2020-12-14T07:47:17.000+0000',
          loginTime: '2020-12-29T09:24:43.000+0000',
          status: 1,
          phone: '15765432188',
          state: 1,
        },
        {
          id: 38,
          username: 'admin6',
          password: '$2a$10$4yfynhKn.14qSYhqGrURFOxhk5tKOBQSWlqSVNKOQZtHP9cHUHsxS',
          icon: null,
          email: null,
          nickName: '雾非花',
          note: null,
          createTime: '2020-12-01T08:01:32.000+0000',
          loginTime: null,
          status: 1,
          phone: '15765432188',
          state: 1,
        },
        {
          id: 37,
          username: 'admin7',
          password: '$2a$10$b6vBXvXtFfLmx2xLdE5gMucyXHtM/GeZSh629/9Gg5gH.//gPbtnu',
          icon: null,
          email: null,
          nickName: '雾非花',
          note: null,
          createTime: '2020-11-25T09:49:18.000+0000',
          loginTime: '2020-12-15T01:52:04.000+0000',
          status: 1,
          phone: '15765432188',
          state: 1,
        },
        {
          id: 24,
          username: 'admin8',
          password: '$2a$10$sqfqEEI9XKsTVVUwust9TutYKfir1f1oqa5y8SPhAf6bqspOM.4du',
          icon: null,
          email: null,
          nickName: '雾非花',
          note: null,
          createTime: '2020-09-28T02:10:28.000+0000',
          loginTime: '2020-09-30T04:53:43.000+0000',
          status: 1,
          phone: '15765432188',
          state: 1,
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['roles']),
  },
  created() {},
  filters: {
    formatDateTime(time) {
      if (time == null || time === '') {
        return 'N/A'
      }
      return formatTime(new Date(time))
    },
  },
  methods: {
    openDialog() {
      this.dialogFlag = true
    },
    handleSearchList() {
      this.listQuery.pageNum = 1
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery)
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
    },
    handleStatusChange() {},
  },
}
</script>
<style lang="scss">
.index-container {
  min-width: 1250px;
  .add-edit {
    cursor: pointer;
    color: #00cd96;
  }
}
</style>
