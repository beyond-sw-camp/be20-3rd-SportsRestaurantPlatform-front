import axios from './axios'

// 회원 목록 조회 API
export const fetchUsers = (page = 1, size = 10) => {
    const token = sessionStorage.getItem('adminToken'); // 저장된 토큰 가져오기
    return axios.get('/api/admin/users-view', { 
        params: { page, size },
        headers: {
            Authorization: `Bearer ${token}`    // Authorization 헤더에 토큰 추가
        }
    });
};

// 회원 상세 조회 API
export const fetchUserDetail = (userCode) => {
    const token = sessionStorage.getItem('adminToken'); // 저장된 토큰 가져오기
    return axios.get(`/api/admin/users/${userCode}`, {
        headers: {
            Authorization: `Bearer ${token}`    // Authorization 헤더에 토큰 추가
        }
    });
};