import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import reducers from './store/reducers';
import { configureStore } from '@reduxjs/toolkit'


const store = configureStore({
  reducer: reducers
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.subscribe(() => {
  const state = store.getState();
  const serializedState = JSON.stringify(state.todo);
  localStorage.setItem('toDoList', serializedState);
});

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
