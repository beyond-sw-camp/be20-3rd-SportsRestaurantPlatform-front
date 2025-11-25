<template>
    <div class="member-list-view">
        <div class="search-bar">
            <el-input v-model="searchQuery.email" placeholder="이메일" class="search-input" />
            <el-input v-model="searchQuery.name" placeholder="이름" class="search-input" />
            <el-input v-model="searchQuery.phone" placeholder="전화번호" class="search-input" />
            <el-button type="primary" @click="fetchMembers">검색</el-button>
        </div>
        <el-table :data="members" style="width: 100%">
            <el-table-column prop="id" label="회원번호" width="100" />
            <el-table-column prop="email" label="이메일" />
            <el-table-column prop="name" label="이름" />
            <el-table-column prop="phone" label="전화번호" />
            <el-table-column label="상세보기">
                <template #default="scope">
                    <el-button type="text" @click="viewDetails(scope.row.id)">보기</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @current-change="fetchMembers"
            :current-page="pageInfo.currentPage"
            :page-size="pageInfo.pageSize"
            :total="pageInfo.totalCount"
            layout="prev, pager, next"
        />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { fetchUsers, fetchUserDetail } from '@/api/user'

const members = ref([])
const pageInfo = ref({
    currentPage: 1,
    pageSize: 10,
    totalCount: 0
})
const searchQuery = ref({
    email: '',
    name: '',
    phone: ''
})

const fetchMembers = async (page = 1) => {
  try {
    const response = await fetchUsers(page, pageInfo.value.pageSize)
    members.value = response.data.data 
    pageInfo.value = response.data.pageInfo
  } catch (error) {
    console.error('회원 목록을 가져오는 중 오류 발생:', error)
  }
}

const viewDetails = async (id) => {
    try {
        const response = await fetchUserDetail(id)
        console.log('회원 상세 정보:', response.data.data)
        // 상세보기 로직 추가
    } catch (error) {
        console.error('회원 상세 정보를 가져오는 중 오류 발생:', error)
    }
}

// 초기 데이터 로드
fetchMembers()
</script>

<style scoped>
.member-list-view {
  margin-top: 20px;
}
.search-bar {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}
.search-input {
  width: 200px;
}
</style>