<!-- src/views/admin/ViewingManageView.vue -->
<script setup>
import { ref } from 'vue'
import SidebarAdmin from '@/components/shared/sidebar/admin/SidebarAdmin.vue'



// ================= 필터 상태 =================

// 드롭다운 옵션
const sportOptions = [
  { value: 'ALL', label: '전체' },
  { value: 'SOCCER', label: '축구' },
  { value: 'BASKETBALL', label: '농구' },
  { value: 'BASEBALL', label: '야구' }
]

const priceOptions = [
  { value: 'ALL', label: '전체' },
  { value: '100000', label: '100,000원 이하' },
  { value: '300000', label: '300,000원 이하' },
  { value: '500000', label: '500,000원 이하' }
]

const peopleOptions = [
  { value: 'ALL', label: '전체' },
  { value: '10', label: '10명 이하' },
  { value: '30', label: '30명 이하' },
  { value: '50', label: '50명 이하' }
]

// 선택된 값 (객체 그대로 저장)
const selectedSport = ref(sportOptions[1])   // 기본값: 축구
const selectedPrice = ref(priceOptions[1])   // 100,000원 이하
const selectedPeople = ref(peopleOptions[1]) // 10명 이하

// 관람 날짜 (달력으로 선택)
const selectedDate = ref('') // "YYYY-MM-DD" 형식


// ✅ 달력 input DOM 참조
const dateInputRef = ref(null)

// ✅ 박스 전체 클릭 시 달력 띄우기
const openDatePicker = () => {
  if (dateInputRef.value?.showPicker) {
    // 크롬/엣지 등 지원 브라우저
    dateInputRef.value.showPicker()
  } else if (dateInputRef.value) {
    // showPicker 없으면 최소한 클릭/포커스
    dateInputRef.value.focus()
    dateInputRef.value.click()
  }
}

// 드롭다운 열림 상태
const isSportOpen = ref(false)
const isPriceOpen = ref(false)
const isPeopleOpen = ref(false)

// 선택 함수
const selectSport = (opt) => {
  selectedSport.value = opt
  isSportOpen.value = false
}

const selectPrice = (opt) => {
  selectedPrice.value = opt
  isPriceOpen.value = false
}

const selectPeople = (opt) => {
  selectedPeople.value = opt
  isPeopleOpen.value = false
}

// ================= 더미 데이터 =================
const reviews = ref([
  { id: 1, title: '수업 대비 직관오면서 같이 봅시다!', date: '2025.10.10', price: '500,000', people: 30 },
  { id: 2, title: '월수 밤 축-수업 이전 점심 직관 같이 하실분', date: '2025.12.10', price: '300,000', people: 40 },
  { id: 3, title: '집에서 축소에서 직관 겸수 직관하실분 !!!', date: '2025.10.10', price: '1,000,000', people: 50 },
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
        <h1 class="page-title">관람 관리</h1>

        <!-- 필터 영역 -->
        <section class="filter-section">
          <div class="filter-row">
            <!-- 종목 드롭다운 -->
            <div class="filter-item">
              <label class="filter-label">종목</label>
              <div class="dropdown dropdown-small dropdown-full-width">
                <button
                    type="button"
                    class="dropdown-trigger"
                    @click="isSportOpen = !isSportOpen"
                >
                  <span class="dropdown-text">
                    {{ selectedSport.label }}
                  </span>
                  <span
                      class="dropdown-arrow"
                      :class="{ 'dropdown-arrow-up': isSportOpen }"
                  >
                    ▼
                  </span>
                </button>

                <div v-if="isSportOpen" class="dropdown-menu">
                  <div class="dropdown-options">
                    <button
                        v-for="opt in sportOptions"
                        :key="opt.value"
                        type="button"
                        class="dropdown-option"
                        :class="{
                        'dropdown-option-selected': opt.value === selectedSport.value
                      }"
                        @click="selectSport(opt)"
                    >
                      {{ opt.label }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 관람 날짜 : 달력 -->
            <div class="filter-item">
              <label class="filter-label">관람 날짜</label>
              <div class="dropdown dropdown-small dropdown-full-width date-dropdown">
                <!-- ✅ 이 버튼 아무 데나 클릭해도 openDatePicker 실행 -->
                <button
                    type="button"
                    class="dropdown-trigger date-trigger"
                    @click="openDatePicker"
                >
                  <span class="dropdown-text">
                    {{ selectedDate || '날짜를 선택하세요' }}
                   </span>
                  <span class="dropdown-arrow">📅</span>
                </button>

                <!-- ✅ 실제 date input (눈에 안 보이지만 showPicker로 띄움) -->
                <input
                    ref="dateInputRef"
                    type="date"
                    v-model="selectedDate"
                    class="date-hidden-input"
                />
              </div>
            </div>

            <!-- 관람 예치금 드롭다운 -->
            <div class="filter-item">
              <label class="filter-label">관람 예치금</label>
              <div class="dropdown dropdown-small dropdown-full-width">
                <button
                    type="button"
                    class="dropdown-trigger"
                    @click="isPriceOpen = !isPriceOpen"
                >
                  <span class="dropdown-text">
                    {{ selectedPrice.label }}
                  </span>
                  <span
                      class="dropdown-arrow"
                      :class="{ 'dropdown-arrow-up': isPriceOpen }"
                  >
                    ▼
                  </span>
                </button>

                <div v-if="isPriceOpen" class="dropdown-menu">
                  <div class="dropdown-options">
                    <button
                        v-for="opt in priceOptions"
                        :key="opt.value"
                        type="button"
                        class="dropdown-option"
                        :class="{
                        'dropdown-option-selected': opt.value === selectedPrice.value
                      }"
                        @click="selectPrice(opt)"
                    >
                      {{ opt.label }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 관람 인원 드롭다운 -->
            <div class="filter-item">
              <label class="filter-label">관람 인원</label>
              <div class="dropdown dropdown-small dropdown-full-width">
                <button
                    type="button"
                    class="dropdown-trigger"
                    @click="isPeopleOpen = !isPeopleOpen"
                >
                  <span class="dropdown-text">
                    {{ selectedPeople.label }}
                  </span>
                  <span
                      class="dropdown-arrow"
                      :class="{ 'dropdown-arrow-up': isPeopleOpen }"
                  >
                    ▼
                  </span>
                </button>

                <div v-if="isPeopleOpen" class="dropdown-menu">
                  <div class="dropdown-options">
                    <button
                        v-for="opt in peopleOptions"
                        :key="opt.value"
                        type="button"
                        class="dropdown-option"
                        :class="{
                        'dropdown-option-selected': opt.value === selectedPeople.value
                      }"
                        @click="selectPeople(opt)"
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
              <th>관람번호</th>
              <th>관람제목</th>
              <th>관람 날짜</th>
              <th>관람 예치금</th>
              <th>관람 인원</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="review in reviews" :key="review.id">
              <td>{{ review.id }}</td>
              <td>{{ review.title }}</td>
              <td>{{ review.date }}</td>
              <td>{{ review.price }}</td>
              <td>{{ review.people }}</td>
            </tr>

            <!-- 빈 줄 배경용 -->
            <tr v-for="n in 7" :key="'empty-' + n" class="empty-row">
              <td colspan="6">&nbsp;</td>
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
            </button>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* 드롭다운 공통 스타일 import */
@import "@/assets/shared/form/dropdowns.css";
/* 버튼 공통 스타일 import: 네가 준 .btn, .btn-primary 등 */
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
  align-items: center;
  gap: 16px;
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

/* 날짜 드롭다운 전용 */
.date-dropdown {
  position: relative;
}

.date-trigger {
  position: relative;
}

.date-hidden-input {
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;  /* ✅ 클릭은 버튼이 처리 */
}

/* 검색 버튼: 위치만 오른쪽 끝으로 밀기 */
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

/* prev/next 버튼은 공통 btn 스타일 사용 */
.page-btn {
}

/* 페이지 번호는 공통 btn + active 상태만 따로 강조 */
.page-number {
}

.page-number.active {
  background-color: var(--primary-color);
  color: white;
}
</style>
