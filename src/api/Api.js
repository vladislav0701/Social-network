import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "467a0b90-5d62-46af-9300-417ab8395ae7"
    }
});

export const getUsers = (currentPage = 1, pageSize = 5) => {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(response => {
            return response.data;
        })
}

export const queryUnfollow = (id) => {
    return instance.delete(`follow/${id}`
    )
}

export const queryFollow = (id) => {
    return instance.post(`follow/${id}`)
}
      
export const authUser = () => {
    return instance.get(`auth/me`)
    .then(response => {
            return response.data;
        }
    )
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
    },
    updateUserStatus(status) {
        return instance.put(`profile/status`, { status: status })
    }
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, { email, password, rememberMe})
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}