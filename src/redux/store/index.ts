
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import customSlice   from '../slices/customSlice/customSlice'
export const store  = configureStore({
  reducer: {
    custom:customSlice
  },
  
})

export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => AppDispatch = useDispatch 
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch