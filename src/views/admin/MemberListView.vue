<template>
    <div class="member-list-view">
        <div class="search-bar">
            <el-input v-model="searchQuery.userEmail" placeholder="이메일" class="search-input" />
            <el-input v-model="searchQuery.userName" placeholder="이름" class="search-input" />
            <el-input v-model="searchQuery.userPhoneNumber" placeholder="전화번호" class="search-input" />
            <el-button type="primary" @click="() => searchMembers(1)">검색</el-button>
        </div>
        <el-table :data="members" style="width: 100%">
            <el-table-column prop="userCode" label="회원번호" width="100" />
            <el-table-column prop="userEmail" label="이메일" />
            <el-table-column prop="userName" label="이름" />
            <el-table-column prop="userPhoneNumber" label="전화번호" />
            <el-table-column label="상세보기">
                <template #default="scope">
                    <el-button type="text" @click="viewDetails(scope.row.id)">보기</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="bottom-pagination">
            <el-pagination
                v-if="pageInfo"
                @current-change="fetchMembers"
                :current-page="pageInfo?.page"
                :page-size="pageInfo?.size"
                :total="pageInfo?.totalElements"
                layout="prev, pager, next"
            />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { fetchUsers, searchUsers } from '@/api/user'

const members = ref([])
const pageInfo = ref({
    page: 1,
    size: 10,
    totalElements: 0
})
const searchQuery = ref({
    userEmail: '',
    userName: '',
    userPhoneNumber: ''
})

const fetchMembers = async (page = 1) => {
  try {
    const response = await fetchUsers(page, pageInfo.value.size);
    members.value = response.data.data.users;
    console.log('members : ', members.value);

    const apiPageInfo = response.data.data.pageInfo || {};
    pageInfo.value = {
        page: apiPageInfo.page || 1,
        size: apiPageInfo.size || 10,
        totalElements: apiPageInfo.totalElements || 0
    };
    console.log('pageInfo : ', pageInfo.value);
  } catch (error) {
    console.error('회원 목록을 가져오는 중 오류 발생:', error);
  }
}

const searchMembers = async (page = 1) => {
    try {
        const response = await searchUsers(page, pageInfo.value.size, searchQuery.value);
        members.value = response.data.data.users;
        console.log('members : ', members.value);

        const apiPageInfo = response.data.data.pageInfo || {};
        pageInfo.value = {
            page: apiPageInfo.page || 1,
            size: apiPageInfo.size || 10,
            totalElements: apiPageInfo.totalElements || 0
        };
        console.log('pageInfo : ', pageInfo.value);
    } catch (error) {
        console.error('회원 검색 중 오류 발생:', error);
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

.bottom-pagination {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}
</style>