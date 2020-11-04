import React, {Component, Fragment} from 'react';
import {MDBBtn} from "mdbreact";
import authContext from "../authentication/AuthContext";
import axios from 'axios'

class ShareTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:[],
            loading:false,
        }
    }
    handleChange = (e, index) => {
        const username = [...this.state.username]
        username[index] = e.target.value;
        this.setState({username})
    };

    handleShareTodo = async(todoId, index) => {
        const userId = localStorage.getItem('_userId');
        this.setState({loading:true})
        const {username} = this.state;
        console.log(username)
        const userObject = {
            username : username[index]
        };
        try{
            await axios.post(`http://localhost:8000/api/notifications/${todoId}/`, userObject, {
            headers:{'Authorization' : `JWT ${userId}`}
        });
            setTimeout(() => {
                this.setState({loading:false})
                alert(`you have shared your todo with ${username[index]} `)
                this.props.history.push('/todos')
            }, 2000)
        }catch (e) {
            this.setState({loading:false})
            console.log(e.response.data)
        }
    };
    render() {
        const {todos} = this.context;
        const {username, loading} = this.state;
        return (
            <Fragment>
                {loading && <div className='spinner'/> }
                <div className="share-todo">
                    <h5>Todo Share</h5>
                </div>
                <div className="todo-list-share">
                    <div className="todo-listing">
                        <table>
                            <thead>
                            <tr>
                                <th>Todo Title</th>
                                <th>Recipient Username</th>
                                <th>Share Button</th>
                            </tr>
                            </thead>
                            <tbody>
                            {todos.map((todo, index) => {
                                return <tr key={todo.id}>
                                    <td><strong>{todo.title}</strong></td>
                                    <td><input onChange={(e) => this.handleChange(e, index)} value={username[index]} type="text"/></td>
                                    <td><MDBBtn onClick={() => this.handleShareTodo(todo.id, index)} color='orange'><i className='fa fa-share'/>Share Todo</MDBBtn></td>
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

export default ShareTodo;