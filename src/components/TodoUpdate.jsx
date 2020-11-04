import React, {Component, Fragment} from 'react';
import {MDBBtn, MDBInput} from "mdbreact";
import authContext from "../authentication/AuthContext";
import DatePicker from 'react-datepicker'
import axios from 'axios';

class TodoUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todo_attributes:{title:'', description:''},
            categoryId:'',
            priority:'',
            completion:'',
            due_date:new Date(),
            loading:false,
        }
    }

    async componentDidMount() {
        const {id} = this.props.match.params;
        const userId = localStorage.getItem('_userId');
        try{
           const {data:todos} = await axios.get(`http://localhost:8000/api/todos/${id}/`, {
               headers:{'Authorization': `JWT ${userId}`}
           }) ;
           console.log(todos)
           const todo_attributes = {...this.state.todo_attributes};
           todo_attributes['title'] = todos.title;
           todo_attributes['description'] = todos.description;
            this.setState({
                todo_attributes,
                categoryId:todos.category,
                priority:todos.priority,
                completion: todos.completed,
                due_date: new Date(todos.due_date)
            })
        }catch (e) {
            console.log(e.response.data)
        }

    }

    handleChange = (e) => {
        const todo_attributes = {...this.state.todo_attributes};
        todo_attributes[e.target.name] = e.target.value;
        this.setState({todo_attributes})
    };

    handleCompletion = (e) => {
        this.setState({completion :e.target.value})
    };
    handlePriority = (e) => {
        this.setState({priority :e.target.value})
    };
    handleCategory = (e) => {
        this.setState({categoryId :e.target.value})
    };

    setDate = (date) => {
        this.setState({due_date : date})
    };

    handleSubmit = async(e) => {
        const {user, loadTodos}  = this.context;
        const {id} = this.props.match.params;
        const userId = localStorage.getItem('_userId');
        this.setState({loading:true})
        e.preventDefault();
        const {todo_attributes, categoryId, priority, completion, due_date} = this.state;
        const todoUpdateObject = {
            title: todo_attributes.title,
            description: todo_attributes.description,
            category: categoryId,
            due_date:due_date,
            priority: priority,
            completed:completion,
            author: user.user_id
        };
        try{
            await axios.put(`http://localhost:8000/api/todos/${id}/`, todoUpdateObject, {
                headers:{'Authorization': `JWT ${userId}`}
            });
            loadTodos();
            setTimeout(() => {
                this.setState({loading:false});
                alert('Updated successfully');
                this.props.history.push('/todos')
            }, 2000)
        }catch (e) {
            this.setState({loading:false});
            console.log(e.response.data)
        }
    };

    render() {
        const {categories} = this.context;
        const {categoryId, priority, completion, todo_attributes, loading} = this.state;

        return (
            <Fragment>
                {loading && <div className='spinner'/> }
                <div className="todo-update">
                    <h5>Update Todo</h5>
                    <div className="update-form">
                        <form onSubmit={this.handleSubmit}>
                            <MDBInput
                                className='mb-2'
                                value={todo_attributes.title}
                                label='Title'
                                onChange={this.handleChange}
                                background/>
                            <MDBInput type='textarea'
                                      className='mb-2'
                                      value={todo_attributes.description}
                                      label='description'
                                      onChange={this.handleChange}
                                      background/>
                            <select onChange={this.handleCategory} value={categoryId} className="browser-default custom-select mb-2">
                                <option>Choose Category</option>
                                {categories.map((category, i) => {
                                    return <option className='text-dark' key={i}
                                                   value={category.id}>{category.name}</option>
                                })}
                            </select>
                            <select onChange={this.handlePriority} value={priority} className="browser-default custom-select mb-2">
                                <option>Todo priority</option>
                                <option className='text-dark' value="High">High</option>
                                <option className='text-dark' value="Medium">Medium</option>
                                <option className='text-dark' value="Low">Low</option>
                            </select>
                            <select onChange={this.handleCompletion} value={completion} className="browser-default custom-select mb-2">
                                <option>Completion</option>
                                <option className='text-dark' value={true}>Completed</option>
                                <option className='text-dark' value={false}>Not Completed</option>
                            </select>
                            <DatePicker selected={this.state.due_date} onChange={(date) => this.setDate(date)}/><br/>
                            <MDBBtn className='mt-3' type='submit' color='orange' block>Update</MDBBtn>
                        </form>
                    </div>
                </div>
            </Fragment>
        );
    }

    static contextType = authContext;
}

export default TodoUpdate;