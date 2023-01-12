import { login, logout, getInfo } from '@/api/user' //登陆 退出 获取用户信息
import { getToken, setToken, removeToken } from '@/utils/auth' //获取token 设置 删除
import {  resetRouter,asyncRoutes,constantRoutes,anyRoutes } from '@/router' //重置路由
import router from  '../../router' ;
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    routes:[],
    roles:[],
    buttons:[],
    //对比后已有的异步路由 最终要展示的
    resultAsyncRoutes:[],
    //最终需要展示的
    resultAllRoutes:[]

  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // SET_NAME: (state, name) => {
  //   state.name = name
  // },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // }
  //存储用户的信息
  SET_USERINFO:(state,userInfo)=>{
  state.name=userInfo.name;
  state.avatar=userInfo.avatar;
  state.routes=userInfo.routes;
  state.buttons=userInfo.buttons;
  state.roles=userInfo.roles;
 
  },
  //最终计算出的异步路由
    SET_RESULTASYNCROUTES:(state,asyncRoutes)=>{
      state.resultAsyncRoutes=asyncRoutes;
      //计算当前用户需要展示所有路由
    state. resultAllRoutes=  constantRoutes.concat(state.resultAsyncRoutes,anyRoutes);
    //给路由器添加新的路由
   router.addRoutes(state.resultAllRoutes)
    }
    
}
const computedAsyncroutes=(asyncRoutes,routes)=>{
//过滤用户 超级和普通 需要展示的异步路由
return asyncRoutes.filter(item=>{
  if(routes.indexOf(item.name)!=-1){
    if(item.children&&item.children.length){
      item.children=computedAsyncroutes(item.children,routes);
    }
    return true;
  }
})
}
const actions = {
  // user login
  async login({ commit }, userInfo) {
   const { username, password } = userInfo
     let result =await login({ username: username.trim(), password: password });
     if(result.code===20000){
      commit('SET_TOKEN', result.data.token);
      setToken(result.data.token);
      return 'ok';
     }else{
      return Promise.reject(new Error('faile'))
     }
    // return new Promise((resolve, reject) => {
    //   login({ username: username.trim(), password: password }).then(response => {
    //     const { data } = response
    //     commit('SET_TOKEN', data.token)
    //     setToken(data.token)
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
commit('SET_USERINFO',data);

commit('SET_RESULTASYNCROUTES',computedAsyncroutes(asyncRoutes,data.routes))
        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        // const { name, avatar } = data

        // commit('SET_NAME', name)
        // commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

