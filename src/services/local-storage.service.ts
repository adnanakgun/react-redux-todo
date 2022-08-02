import { ToDoListModel } from "../domain/to-do-list.model"

const LocalStorageService = {
    getToDoList: (): ToDoListModel => {
        const dummyList: string = `{
            "items": []
        }`;
        const toDoListString: string = localStorage.getItem('toDoList') || dummyList;
        if (!localStorage.getItem('toDoList')) {
            localStorage.setItem('toDoList', dummyList);
        }
        return JSON.parse(toDoListString);
    }

};

export default LocalStorageService;
