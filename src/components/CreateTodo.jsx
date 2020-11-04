import React, {Component, Fragment} from 'react';
import {MDBInput, MDBBtn} from "mdbreact";
import DatePicker from "react-datepicker";
import authContext from "../authentication/AuthContext";
import axios from 'axios'

class CreateTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            due_date: new Date(),
            todo_props: {
                title: '',
                description: '',
            },
            categoryId: '',
            priority: '',
            loading:false,
        }
    }

    setDate = (date) => {
        this.setState({due_date: date})
    };

    handleChange = (e) => {
        const todo_props = {...this.state.todo_props};
        todo_props[e.target.name] = e.target.value;
        this.setState({todo_props})
    };

    handleCategoryChange = (e) => {
        this.setState({categoryId: e.target.value})
    };
    handlePriorityChange = (e) => {
        this.setState({priority: e.target.value})
    };

    handleTodoSubmit = async(e) => {
        const userId =  localStorage.getItem('_userId');
        const {user, loadTodos} = this.context;
        e.preventDefault();
        this.setState({loading:true});
        const {todo_props, categoryId, due_date, priority} = this.state;
        const todoObjects = {
            title:todo_props.title,
            description: todo_props.description,
            category:categoryId,
            due_date:due_date,
            priority:priority,
            completed:false,
            author: user.user_id
        };
        try{
            await axios.post('http://localhost:8000/api/todos/', todoObjects, {
                headers:{'Authorization': `JWT ${userId}`}
            });
            loadTodos()
            setTimeout(() => {
                this.setState({loading:false});
                alert('todo has been created');
                this.props.history.push('/todos')
            }, 3000)
        }catch (e) {
            this.setState({loading:false});
            console.log(e.response.data)
        }
    };


    render() {
        const {todo_props, loading} = this.state;
        const {categories} = this.context;
        return (
            <Fragment>
                {loading && <div className='spinner'/> }
                <div className='todo-create'>
                    <h5>Create your Todo</h5>
                    <div className="create-form">
                        <form onSubmit={this.handleTodoSubmit}>
                            <MDBInput className='mb-2'
                                      label='Title'
                                      name='title'
                                      onChange={this.handleChange}
                                      value={todo_props.title}
                                      background/>
                            <MDBInput type='textarea'
                                      className='mb-2'
                                      label='Description'
                                      name='description'
                                      onChange={this.handleChange}
                                      value={todo_props.description}
                                      background/>
                            <select  onChange={this.handleCategoryChange} className="browser-default custom-select mb-2">
                                <option>Choose Category</option>
                                {categories.map((category, i) => {
                                    return <option className='text-dark' key={i}
                                                   value={category.id}>{category.name}</option>
                                })}
                            </select>
                            <select onChange={this.handlePriorityChange} className="browser-default custom-select mb-2">
                                <option>Todo priority</option>
                                <option className='text-dark' value="High">High</option>
                                <option className='text-dark' value="Medium">Medium</option>
                                <option className='text-dark' value="Low">Low</option>
                            </select>
                            <label htmlFor="date">Due Date</label>
                            <DatePicker selected={this.state.due_date} onChange={(date) => this.setDate(date)}/><br/>
                            <MDBBtn type='submit' className='mt-4' block color='orange'>Create</MDBBtn>
                        </form>
                    </div>
                </div>
            </Fragment>
        );
    }

    static contextType = authContext;
}

export default CreateTodo;