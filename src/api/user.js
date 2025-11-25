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

// // 권한 별 회원 목록 조회
// export const fetchUsersByRole = (page, size, subMenuName) => {
//     return axios.get(`/api/admin/users-by-role`, {
//         params: { page, size, subMenuName },
//         headers: {
//             Authorization: `Bearer ${token}`    // Authorization 헤더에 토큰 추가
//         }
//     });
// };

// 회원 검색
export const searchUsers = (page, size, searchQuery) => {
    const token = sessionStorage.getItem('adminToken'); // 저장된 토큰 가져오기
    return axios.get('/api/admin/users-search', {
        params: {
            page,
            size,
            userEmail: searchQuery.userEmail || null,
            userName: searchQuery.userName || null,
            userPhoneNumber: searchQuery.userPhoneNumber || null,
        },
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