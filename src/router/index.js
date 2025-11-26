import {createRouter, createWebHistory} from 'vue-router'
import Home from '@/views/Home.vue'
import AdminLogin from '@/views/admin/AdminLogin.vue'
import SignupAdditional from '@/views/auth/SignupAdditional.vue'
import SignupComplete from '@/views/auth/SignupComplete.vue'
import LoginSuccess from '@/views/auth/LoginSuccess.vue'
import AdminUserView from '@/views/admin/AdminUserView.vue'
import AdminEntrepreneurView from '@/views/admin/AdminEntrepreneurView.vue'
import RestaurantRegisterView from '@/views/restaurant/RestaurantRegisterView.vue'
import RestaurantListView from "@/views/restaurant/RestaurantListView.vue";
import RestaurantListDetailedView from "@/views/restaurant/RestaurantListDetailedView.vue";
import ViewingRegisterView from "@/views/viewing/ViewingRegisterView.vue";
import ViewingListView from "@/views/viewing/ViewingListView.vue";
import ViewingListDetailedView from "@/views/viewing/ViewingListDetailedView.vue";
import MyPageViewingLog from "@/views/mypage/MyPageViewingLog.vue";
import MyPageSubscribeCancel from "@/views/mypage/MyPageSubscribeCancel.vue";
import MyPageSubscribeCancelConfirm
  from "@/views/mypage/MyPageSubscribeCancelConfirm.vue";
import MyPageSubscribeLog from "@/views/mypage/MyPageSubscribeLog.vue";
import MyPageReviewLog from "@/views/mypage/MyPageReviewLog.vue";
import MyPageViewingPayLog from "@/views/mypage/MyPageViewingPayLog.vue";
import MyPageEntrepreneurRegister
  from "@/views/mypage/MyPageEntrepreneurRegister.vue";
import MyPageBookMark from "@/views/mypage/MyPageBookMark.vue";
import MyPageReviewEdit from "@/views/mypage/MyPageReviewEdit.vue";
import MyPageSubscribeRegister
  from "@/views/mypage/MyPageSubscribeRegister.vue";
import ComponentSample from "@/views/ComponentSample.vue";
import ViewingManage from "@/views/admin/ViewingManage.vue";
import RestaurantManage from "@/views/admin/RestaurantManage.vue";
import KeywordReport from "@/views/admin/KeywordReport.vue";
import KeywordNotice from "@/views/admin/KeywordNotice.vue";
import Announcement from "@/views/admin/announcement/Annoncement.vue";
import KeywordRestaurant from "@/views/admin/KeywordRestaurant.vue";
import KeywordSports from "@/views/admin/KeywordSports.vue";
const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/admin/login',
      name: 'AdminLogin',
      component: AdminLogin
    },
    {
      path: '/admin/user-view',
      name: 'AdminUserView',
      component: AdminUserView
    },
    {
      path: '/admin/entrepreneur-view',
      name: 'AdminEntrepreneurView',
      component: AdminEntrepreneurView
    },
    {
      path: '/signup/additional',
      name: 'SignupAdditional',
      component: SignupAdditional
    },
    {
      path: '/signup/complete',
      name: 'SignupComplete',
      component: SignupComplete
    },
    {
      path: '/login/success',
      name: 'LoginSuccess',
      component: LoginSuccess
    },
    {path: '/restaurant/register', name: 'RestaurantRegister', component: RestaurantRegisterView},
    {path: '/restaurant', name: 'RestaurantList',component: RestaurantListView},
    {path: '/restaurant/detailed/:id', name: 'RestaurantListDetailed',component: RestaurantListDetailedView},
    {path: '/viewing/register', name: 'ViewingRegister',component: ViewingRegisterView},
    {path: '/viewing', name: 'ViewingList',component: ViewingListView},
    {path: '/viewing/detailed/:id', name: 'ViewingListDetailed',component: ViewingListDetailedView},
    {path:'/MyPage/ProfileEdit',name:'MyPage-ProfileEdit',component:MyPageViewingLog},
    {path:'/MyPage/ViewingLog',name:'MyPage-ViewingLog',component:MyPageViewingLog},
    {path:'/MyPage/Subscribe/Cancel',name:'MyPage-SubscribeCancel',component:MyPageSubscribeCancel},
    {path:'/MyPage/Subscribe/CancelConfirm',name:'MyPage-SubscribeCancelConfirm',component:MyPageSubscribeCancelConfirm},
    {path:'/MyPage/Subscribe/Log',name:'MyPage-SubscribeLog',component:MyPageSubscribeLog},
    {path:'/MyPage/Review/Log',name:'MyPage-ReviewLog',component:MyPageReviewLog},
    {path:'/MyPage/ViewingPay/Log',name:'MyPage-ViewingPayLog',component:MyPageViewingPayLog},
    {path:'/MyPage/Entrepreneur/Register',name:'MyPage-EntrepreneurRegister',component:MyPageEntrepreneurRegister},
    {path:'/MyPage/BookMark',name:'MyPage-BookMark',component:MyPageBookMark},
    {path:'/MyPage/Review/Edit',name:'MyPage-ReviewEdit',component:MyPageReviewEdit},
    {path:'/MyPage/Subscribe/Register',name:'MyPage-SubscribeRegister',component:MyPageSubscribeRegister},
    {
        path: '/ComponentSample',               // http://localhost:5173/ComponentSample
        name: 'ComponentSample',
        component: ComponentSample,   // 예전 App.vue에 있던 메인 화면
    },
    {
        path: '/admin/ViewingManage',    // http://localhost:5173/admin/restaurant
        name: 'ViewingManage',
        component: ViewingManage,  // 관람 관리 페이지
    },
    {
        path: '/admin/RestaurantManage',
        name: 'RestaurantManage',
        component: RestaurantManage, // 가게 관리 페이지
    },
    {
        path: '/admin/KeywordReport',
        name: 'KeywordReport',
        component: KeywordReport,  // 신고 키워드 관리 페이지
    },
    {
        path: '/admin/KeywordNotice',
        name: 'KeywordNotice',
        component: KeywordNotice, // 알림 키워드 관리 페이지
    },
    {
        path: '/admin/KeywordRestaurant',
        name: 'KeywordRestaurant',
        component: KeywordRestaurant,  // 가게 키워드 관리 페이지
    },
    {
        path: '/admin/KeywordSports',
        name: 'KeywordSports',
        component: KeywordSports,  // 스포츠 키워드 관리 페이지
    },
    {
        path: '/admin/announcement/Announcement',
        name: 'Announcement',
        component: Announcement,  // 공지사항 관리 페이지
    },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router



