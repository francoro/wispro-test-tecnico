import { createSlice } from '@reduxjs/toolkit'
import initialState, { IUser } from './initialState'
const users = createSlice({
  name: '/users',
  initialState,
  reducers: {
    getUsersStart: (state: IUser) => {
      state.isFetching = true
    },
    getUsersError: (state: IUser, { payload }: any) => {
      state.isFetching = false
      state.error = true
    },
    getUsersSuccess: (state: IUser, { payload }: any) => {
      state.isFetching = false
      state.error = false
      state.users = payload.users
    },
    setUsersSorted: (state: IUser, {payload}: any) => {
      state.users = payload.users
    },
    editUser: (state: IUser, {payload}: any) => {
      debugger
      const idUser = [...state.users].findIndex(user => user.id === payload.user.id)
      const users = [...state.users]
      users[idUser] = payload.user
      state.users = users
    },
    deleteUser: (state: IUser, {payload}: any) => {
      const users = [...state.users].filter(user => user.id !== payload.user.id)
      state.users = users
    },
  },
})

export const { getUsersStart, getUsersError, getUsersSuccess, setUsersSorted, editUser, deleteUser } = users.actions

export default users.reducer

export const getUsers = (users: any) => {
    return (dispatch: any) => {
      dispatch(getUsersStart())
      try {
        dispatch(getUsersSuccess({users: users}))
      } catch (error) {
        dispatch(getUsersError(error))
      }
    }
  }

  export const setUsersSort = (users: any) => {
    return (dispatch: any) => {
      dispatch(setUsersSorted({users: users}))
    }
  }

  export const editSelectedUser = (user: any) => {
    return (dispatch: any) => {
      dispatch(editUser({user: user}))
    }
  }

  export const deleteSelectedUser = (user: any) => {
    return (dispatch: any) => {
      dispatch(deleteUser({user: user}))
    }
  }