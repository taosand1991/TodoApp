import React, {Component, Fragment} from 'react';
import authContext from "../authentication/AuthContext";
import {Link} from "react-router-dom";
import {MDBBtn} from "mdbreact";
import axios from 'axios'

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            isCompleted:false,
        }
    }

    handleCheck = async(e, todo) => {
        const {loadTodos} = this.context;
        if(e.target.checked){
            const userId = localStorage.getItem('_userId');
            this.setState({loading:true});
            const todoObject = {
                completed:true,
            };
            try{
                await axios.patch(`/api/todos/${todo.id}/`, todoObject, {
                    headers:{'Authorization': `JWT ${userId}`}
                });
                loadTodos()
                setTimeout(() => {
                    this.setState({loading:false})
                }, 2000)
            }catch (e) {
                this.setState({loading:false});
                console.log(e.response.data)
            }
        }
    };

    navigateToEdit = (id) => {
        return this.props.history.push(`/todo/edit/${id}`)
    };

    handleDeleteTodo = async(id) => {
        const {loadTodos} = this.context;
        this.setState({loading:true})
        const userId = localStorage.getItem('_userId');
        try{
            await axios.delete(`/api/todos/${id}/`, {
                headers:{'Authorization': `JWT ${userId}`}
            });
            setTimeout(() => {
                this.setState({loading:false});
                loadTodos()
            }, 2000)
        }catch (e) {

        }
    };

    handleCategory = (e) => {
        const {value} = e.target;
        const {setCategory} = this.context;
        setCategory(value)
    };

    handleCompletion = (e) => {
        const {value} = e.target;
        const {setCompletion} = this.context;
        setCompletion(value)
    }

    render() {
        const {categories, filterTodos} = this.context;
        const {loading} = this.state;
        return (
            <Fragment>
                {loading && <div className='spinner'/> }
                <div className="todo-list">
                    <div className="header">
                        <h5>YOUR TODOS</h5>
                    </div>
                    <div className="todo-filter">
                        <h5>Filter Todo by :</h5>
                        <div className="category">
                            <select onChange={this.handleCategory} className="browser-default custom-select">
                                <option value=''>Category</option>
                                {categories.map((category, i) => {
                                    return <option key={i} value={category.category_name}>{category.name}</option>
                                })}
                            </select>
                        </div>
                        <div className="completed">
                            <select onChange={this.handleCompletion} className="browser-default custom-select">
                                <option value=''>Completion</option>
                                <option value={'true'}>Completed</option>
                                <option value={'false'}>Not completed</option>
                            </select>
                        </div>
                    </div>
                    <div className="todo-table">
                        <table>
                            <thead>
                            <tr>
                                <th></th>
                                <th colSpan={3}>TODOS</th>
                                <th>STATUS</th>
                                <th>ACTION</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {filterTodos.map((todo, i) => {
                                return <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td colSpan={3}><Link to={`/todo/${todo.id}`}>{todo.title}</Link></td>
                                    <td>{todo.completed ? 'COMPLETED' : 'NOT COMPLETED'}</td>
                                    <td>
                                        {todo.completed ? (
                                            <>
                                                <label htmlFor="complete">Completed</label>
                                                <input readOnly checked={todo.completed} type="checkbox"/>
                                            </>
                                        ) : (
                                            <>
                                                <label htmlFor="complete">Mark as completed</label>
                                                <input readOnly onChange={(e) => this.handleCheck(e, todo)} type="checkbox"/>
                                            </>
                                        )}
                                    </td>
                                    <td><div className="btn-toggle">
                                        <MDBBtn onClick={() => this.handleDeleteTodo(todo.id)} color='danger'><i className='fa fa-trash'/>Delete</MDBBtn>
                                        <MDBBtn onClick={() => this.navigateToEdit(todo.id)} color='warning'><i className='fa fa-edit'/>Edit</MDBBtn>
                                    </div></td>
                                </tr>
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Fragment>
        );
    }

    static contextType = authContext;
}

export default TodoList;