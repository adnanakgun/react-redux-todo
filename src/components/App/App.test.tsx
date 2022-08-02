import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import reducers from '../../store/reducers';
import { configureStore } from '@reduxjs/toolkit'
import userEvent from '@testing-library/user-event';

const store = configureStore({
  reducer: reducers
});

const renderApp = () => {
  render(<Provider store={store}>
    <App />
  </Provider>);
}

const addItem = (postText: string) => {
  const textElement = screen.getAllByPlaceholderText('Enter new ToDo')[0];
  userEvent.type(textElement, postText);
  const buttonElement = screen.getByRole('button', {name: /Post ToDo/i});
  userEvent.click(buttonElement);
}

describe('<App />', () => {

  it('should post item to list', async () => {

    renderApp()
    addItem('post test');
    const addedTodo = await screen.findByText(/post test/i);
    expect(addedTodo).toBeInTheDocument();
  });

  it('should remove item from list', () => {

    renderApp()
    addItem('post test');
    const deleteButtonElement = screen.getByRole('button', {name: /Delete ToDo/i});
    userEvent.click(deleteButtonElement);
    const addedTodo = screen.queryByText(/post test/i);
    expect(addedTodo).not.toBeInTheDocument();
  });

  it('should mark item as done', () => {

    renderApp()
    addItem('post test');
    const checkBoxElement = screen.getByLabelText(/Done!/i);
    userEvent.click(checkBoxElement);
    expect(checkBoxElement).toBeTruthy();
  });
});
