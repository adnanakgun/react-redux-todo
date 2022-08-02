import { combineReducers } from '@reduxjs/toolkit';
import toDoReducer from './toDoReducer';

export default combineReducers ({
    todo: toDoReducer
});