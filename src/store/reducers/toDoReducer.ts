import { ToDoListModel } from "../../domain/to-do-list.model";

const reducer = (state: ToDoListModel = {items: []}, action: any) => {
    let items;
    switch (action.type) {
        case 'GET_LIST':
            return action.payload;
        case 'ADD_TODO':
            items = state.items.slice();
            items.push(action.payload);
            return {...state, items};
        case 'DELETE_TODO':
            items = state.items.slice();
            items.splice(action.payload, 1);
            return {...state, items};
        case 'CHANGE_TODO':
                items = state.items.slice().map((item, index) => {
                    if (index === action.payload) {
                        item = {
                            ...item,
                            done: !item.done
                        };
                    }
                    return item;
                });
                return {...state, items};
        default:
            return state;
    }
}

export default reducer;
