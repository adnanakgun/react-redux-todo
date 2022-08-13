import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import React, { FormEvent } from 'react';
import { connect } from 'react-redux';
import { ToDoItemModel } from '../../domain/to-do-item.model';
import * as actions from '../../store/actions';

interface ActionProps {
    addToList: (item: ToDoItemModel) => void;
}

class ToDoPost extends React.Component<ActionProps> {
    handleSubmit = (e: FormEvent) => {
    
        e.preventDefault();
        const toDoValue = (document.getElementById('newToDo') as HTMLInputElement).value;
        this.props.addToList({
            done: false,
            content: toDoValue
        });
        (e.target as HTMLFormElement).reset();
    };

    render() {

        return <form className="ui fluid form post-form" onSubmit={(e) => this.handleSubmit(e)} id="postForm">
            <div className="ui fluid action input">
                <input placeholder="Enter new ToDo" type="text" id="newToDo" name="newToDo"></input>
                <button className="ui button" type="submit" id="postToDo">Post ToDo</button>
                
            </div>
        </form>;
    }
}

const mapDispatchToProps = (dispatch: Dispatch): ActionProps => {
    return bindActionCreators({ 
        addToList: actions.addToList
    }, dispatch)
}


export default connect(null, mapDispatchToProps)(ToDoPost);
