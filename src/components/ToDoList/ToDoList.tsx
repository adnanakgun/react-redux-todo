import React from 'react';
import { connect } from 'react-redux';
import { ToDoListModel } from '../../domain/to-do-list.model';
import { ToDoItemModel } from '../../domain/to-do-item.model';
import * as actions from '../../store/actions';
import ToDoPost from '../ToDoPost/ToDoPost';
import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';

interface ActionProps {
    getList: () => void;
    deleteFromList: (index: number) => void;
    changeStatus: (index: number) => void;
}

interface ToDoProps {
    state: ToDoListModel;
}

class ToDoList extends React.Component<ToDoProps & ActionProps> {

    componentDidMount() {
        this.props.getList();
    }

    deleteItem = (index: number) => {
        this.props.deleteFromList(index);
    };

    changeStatus = (index: number) => {
        this.props.changeStatus(index);
    };


    renderList() {
        return this.props.state.items?.map((item: ToDoItemModel, index: number) => {
            return (
                <div className="item" key={index} id={"toDoItem-"+index}>
                    <div className="ui middle aligned content ">
                        <div className="ui checkbox">
                            <input id={"doneCheck-"+index} type="checkbox" onChange={() => this.changeStatus(index)} checked={item?.done}/>
                            <label htmlFor={"doneCheck-"+index}>Done!</label>
                        </div>
                        <div className="ui clearing segment">
                            <span>{item?.content}</span>
                            <button className="ui button right floated" onClick={() => this.deleteItem(index)}>Delete ToDo</button>
                        </div>
                    </div>
                </div>
            );
        });
    }

    render() {
        
        return (
            <div className="ui relaxed divided list">
                <h2>React Redux To Do List</h2>
                <ToDoPost/>
                {this.renderList()}
            </div>
        );
    }
}

const mapStateToProps = (state: {todo: ToDoListModel}): ToDoProps => {
    return { state: state.todo };
}

const mapDispatchToProps = (dispatch: Dispatch): ActionProps => {
    return bindActionCreators({ 
        getList: actions.getList,
        deleteFromList: actions.deleteFromList,
        changeStatus: actions.changeStatus
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);
