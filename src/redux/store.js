import { configureStore, createSlice } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // This would default to localStorage for web
import { combineReducers } from '@reduxjs/toolkit';
//import persistReducer from 'redux-persist/es/persistReducer';

// Create user slice for managing login state
const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        isLoggedIn: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
        },
    },
});

export const { setUser, logout } = userSlice.actions;

// Persist Configuration
const persistConfig = {
    key: 'root',
    storage, // To default to storage
    whitelist: ['user'], // Only persist 'user' state 
};

// Combine Reducers (in case you have more slices in the future)
const rootReducer = combineReducers({
    user: userSlice.reducer,
});
/*const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    },
});*/

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure Store with Persisted Reducer
const store = configureStore({
    reducer: persistedReducer,

});

export const persistor = persistStore(store);

export default store;
