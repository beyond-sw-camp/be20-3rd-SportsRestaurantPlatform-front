<template>
    <div class="dashboard-container">
        <Navbar class="navbar" />
        <div class="main-content">
            <SidebarAdmin class="sidebar" @update-header="updateHeader" />
            <div class="content-area">
                <AdminDashboardHeader :headerText="headerText" />
                <MemberListView />
            </div>
        </div>
    </div>
    
</template>

<script setup>
import Navbar from '@/components/shared/navbar/Navbar.vue'
import SidebarAdmin from '@/components/shared/sidebar/admin/SidebarAdmin.vue';
import AdminDashboardHeader from '@/components/shared/sidebar/admin/AdminDashboardHeader.vue';
import MemberListView from './MemberListView.vue';
import { ref } from 'vue'

const headerText = ref('회원 관리 - 일반')

const updateHeader = (newHeader) => {
    headerText.value = newHeader
}

</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column; /* Navbar를 위에 배치 */
  height: 100vh;
}

.navbar {
  flex-shrink: 0; /* Navbar는 고정 높이 */
}

.main-content {
  display: flex;
  flex: 1; /* Sidebar와 Content를 나란히 배치 */
}

.sidebar {
  flex-shrink: 0; /* Sidebar는 고정 너비 */
  width: 250px; /* Sidebar 너비 설정 */
}

.content-area {
  flex: 1; /* Content 영역은 나머지 공간을 차지 */
  padding: 20px; /* Content 내부 여백 */
}
</style>