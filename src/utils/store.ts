import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice'; // Importa el reductor raíz de tu aplicación
import bloodTestReducer from './counter/bloodTestSlice'
import authReducer from './counter/authSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    bloodTest: bloodTestReducer,
    auth: authReducer
  },
  // Otros opciones de configuración
});

console.log('store config', store);


// export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
