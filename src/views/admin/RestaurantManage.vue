<!-- src/views/admin/RestaurantManage.vue -->
<script setup>
import { ref } from 'vue'
import SidebarAdmin from '@/components/shared/sidebar/admin/SidebarAdmin.vue'



// ================= 필터 상태 =================

// 1) 음식 종류 드롭다운 (한식/양식/중식/일식 등)
const categoryOptions = [
  { value: 'ALL', label: '전체' },
  { value: 'KOREAN', label: '한식' },
  { value: 'WESTERN', label: '양식' },
  { value: 'CHINESE', label: '중식' },
  { value: 'JAPANESE', label: '일식' }
]

// 4) 평점 드롭다운 (1~5점)
const ratingOptions = [
  { value: 'ALL', label: '전체' },
  { value: '1', label: '1점' },
  { value: '2', label: '2점' },
  { value: '3', label: '3점' },
  { value: '4', label: '4점' },
  { value: '5', label: '5점' }
]

// 5) 블랙리스트 여부 (승인/거부)
const blacklistOptions = [
  { value: 'ALL', label: '전체' },
  { value: 'APPROVED', label: '승인' },
  { value: 'REJECTED', label: '거부' }
]

// 선택된 값
const selectedCategory = ref(categoryOptions[0])
const selectedRating = ref(ratingOptions[0])
const selectedBlacklist = ref(blacklistOptions[0])

// 텍스트 입력 필터 (가게 이름 / 사업자 이름)
const storeName = ref('')
const ownerName = ref('')

// 드롭다운 열림 상태
const isCategoryOpen = ref(false)
const isRatingOpen = ref(false)
const isBlacklistOpen = ref(false)

// 선택 함수
const selectCategory = (opt) => {
  selectedCategory.value = opt
  isCategoryOpen.value = false
}

const selectRating = (opt) => {
  selectedRating.value = opt
  isRatingOpen.value = false
}

const selectBlacklist = (opt) => {
  selectedBlacklist.value = opt
  isBlacklistOpen.value = false
}

// ================= 더미 데이터 =================
// 가게번호, 가게이름, 사업자이름, 수용인원, 이용횟수, 누적신고횟수
const stores = ref([
  { id: 1, name: '오스카펍', owner: '김사장', capacity: 120, usageCount: 1422, reportCount: 5 },
  { id: 2, name: '동까스집', owner: '박사장', capacity: 80, usageCount: 323, reportCount: 2 },
  { id: 3, name: '황제집', owner: '이사장', capacity: 60, usageCount: 12351, reportCount: 9 }
])

const currentPage = ref(1)
</script>

<template>
  <div class="admin-page">
    <!-- 헤더 아래: 사이드바 + 본문 -->
    <div class="admin-body">
      <aside class="admin-sidebar">
        <SidebarAdmin />
      </aside>

      <main class="admin-content">
        <h1 class="page-title">가게 관리</h1>

        <!-- 필터 영역 -->
        <section class="filter-section">
          <div class="filter-row">
            <!-- 음식 종류 드롭다운 -->
            <div class="filter-item">
              <label class="filter-label">음식 종류</label>
              <div class="dropdown dropdown-small dropdown-full-width">
                <button
                    type="button"
                    class="dropdown-trigger"
                    @click="isCategoryOpen = !isCategoryOpen"
                >
                  <span class="dropdown-text">
                    {{ selectedCategory.label }}
                  </span>
                  <span
                      class="dropdown-arrow"
                      :class="{ 'dropdown-arrow-up': isCategoryOpen }"
                  >
                    ▼
                  </span>
                </button>

                <div v-if="isCategoryOpen" class="dropdown-menu">
                  <div class="dropdown-options">
                    <button
                        v-for="opt in categoryOptions"
                        :key="opt.value"
                        type="button"
                        class="dropdown-option"
                        :class="{
                        'dropdown-option-selected': opt.value === selectedCategory.value
                      }"
                        @click="selectCategory(opt)"
                    >
                      {{ opt.label }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 가게 이름 텍스트 입력 -->
            <div class="filter-item">
              <label class="filter-label">가게 이름</label>
              <input
                  v-model="storeName"
                  type="text"
                  class="filter-text-input"
                  placeholder="가게 이름 입력"
              />
            </div>

            <!-- 사업자 이름 텍스트 입력 -->
            <div class="filter-item">
              <label class="filter-label">사업자 이름</label>
              <input
                  v-model="ownerName"
                  type="text"
                  class="filter-text-input"
                  placeholder="사업자 이름 입력"
              />
            </div>

            <!-- 평점 드롭다운 -->
            <div class="filter-item">
              <label class="filter-label">평점</label>
              <div class="dropdown dropdown-small dropdown-full-width">
                <button
                    type="button"
                    class="dropdown-trigger"
                    @click="isRatingOpen = !isRatingOpen"
                >
                  <span class="dropdown-text">
                    {{ selectedRating.label }}
                  </span>
                  <span
                      class="dropdown-arrow"
                      :class="{ 'dropdown-arrow-up': isRatingOpen }"
                  >
                    ▼
                  </span>
                </button>

                <div v-if="isRatingOpen" class="dropdown-menu">
                  <div class="dropdown-options">
                    <button
                        v-for="opt in ratingOptions"
                        :key="opt.value"
                        type="button"
                        class="dropdown-option"
                        :class="{
                        'dropdown-option-selected': opt.value === selectedRating.value
                      }"
                        @click="selectRating(opt)"
                    >
                      {{ opt.label }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 블랙리스트 여부 드롭다운 -->
            <div class="filter-item">
              <label class="filter-label">블랙리스트 여부</label>
              <div class="dropdown dropdown-small dropdown-full-width">
                <button
                    type="button"
                    class="dropdown-trigger"
                    @click="isBlacklistOpen = !isBlacklistOpen"
                >
                  <span class="dropdown-text">
                    {{ selectedBlacklist.label }}
                  </span>
                  <span
                      class="dropdown-arrow"
                      :class="{ 'dropdown-arrow-up': isBlacklistOpen }"
                  >
                    ▼
                  </span>
                </button>

                <div v-if="isBlacklistOpen" class="dropdown-menu">
                  <div class="dropdown-options">
                    <button
                        v-for="opt in blacklistOptions"
                        :key="opt.value"
                        type="button"
                        class="dropdown-option"
                        :class="{
                        'dropdown-option-selected': opt.value === selectedBlacklist.value
                      }"
                        @click="selectBlacklist(opt)"
                    >
                      {{ opt.label }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 검색 버튼 -->
            <button class="btn btn-primary btn-medium search-btn">
              검색
            </button>
          </div>
        </section>

        <!-- 테이블 영역 -->
        <section class="table-section">
          <table class="review-table">
            <thead>
            <tr>
              <th>가게 번호</th>
              <th>가게 이름</th>
              <th>사업자 이름</th>
              <th>수용 인원</th>
              <th>이용 횟수</th>
              <th>누적 신고 횟수</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="store in stores" :key="store.id">
              <td>{{ store.id }}</td>
              <td>{{ store.name }}</td>
              <td>{{ store.owner }}</td>
              <td>{{ store.capacity }}</td>
              <td>{{ store.usageCount }}</td>
              <td>{{ store.reportCount }}</td>
            </tr>

            <!-- 빈 줄 배경용 -->
            <tr v-for="n in 7" :key="'empty-' + n" class="empty-row">
              <td colspan="7">&nbsp;</td>
            </tr>
            </tbody>
          </table>

          <!-- 페이지네이션 -->
          <div class="pagination">
            <button class="btn btn-outline btn-small page-btn">
              &lt;
            </button>
            <button
                v-for="page in 10"
                :key="page"
                class="btn btn-secondary btn-small page-number"
                :class="{ active: currentPage === page }"
                @click="currentPage = page"
            >
              {{ page }}
            </button>
            <button class="btn btn-outline btn-small page-btn">
              &gt;
            </button>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* 드롭다운 공통 스타일 */
@import "@/assets/shared/form/dropdowns.css";
/* 버튼 공통 스타일 (.btn, .btn-primary 등) */
@import "@/assets/shared/basic/buttons.css";

/* 페이지 전체 래퍼 */
.admin-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}


/* 헤더 아래: 사이드바 + 컨텐츠 */
.admin-body {
  display: flex;
  flex: 1;
}

/* 사이드바 */
.admin-sidebar {
  width: 200px;
  background-color: #ffffff;
  border-right: 1px solid #e9ecef;
}

/* 컨텐츠 */
.admin-content {
  flex: 1;
  padding: 30px 40px 40px;
}

/* 페이지 타이틀 */
.page-title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 20px;
}

/* 필터 영역 */
.filter-section {
  background-color: #f1f3f5;
  padding: 16px 20px;
  border-radius: 8px 8px 0 0;
  border: 1px solid #dee2e6;
  border-bottom: none;
}

.filter-row {
  display: flex;
  align-items: flex-end;
  gap: 16px;
  flex-wrap: wrap;
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 150px;
}

.filter-label {
  font-size: 12px;
  color: #555;
}

/* 텍스트 입력 필터 */
.filter-text-input {
  width: 160px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid #ced4da;
  padding: 0 8px;
  font-size: 13px;
  background-color: #ffffff;
}

/* 검색 버튼: 마지막 필터 옆에 살짝만 간격 */
.search-btn {
  margin-left: 8px;
}

/* 테이블 영역 */
.table-section {
  border: 1px solid #dee2e6;
  border-top: none;
  background-color: #ffffff;
  padding: 0 0 24px;
}

.review-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.review-table thead {
  background-color: #f1f3f5;
}

.review-table th,
.review-table td {
  padding: 10px 12px;
  border-bottom: 1px solid #e9ecef;
  text-align: left;
}

.review-table th {
  font-weight: 600;
}

.review-table tbody tr:nth-child(odd):not(.empty-row) {
  background-color: #f8f9fa;
}

/* 빈 줄 */
.empty-row td {
  background-color: #f8f9fa;
}

/* 페이지네이션 */
.pagination {
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
}

.page-number.active {
  background-color: var(--primary-color);
  color: white;
}
</style>
