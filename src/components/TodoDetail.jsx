import React, {Component, Fragment} from 'react';
import axios from 'axios'

class TodoDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todo:{}
        }
    }

   async componentDidMount() {
        const {id} = this.props.match.params;
        const userId = localStorage.getItem('_userId')
        try{
            const {data:todo} = await axios.get(`/api/todos/${id}`, {
                headers:{'Authorization': `JWT ${userId}`}
            });
            this.setState({todo})

        }catch (e) {
           console.log(e.response.data)
        }
    }

    render() {
        const {todo} = this.state;
        return (
            <Fragment>
                <div className='row-list'>
                    <div className="todo-logo">
                        <div className="logo">
                       <i className='fa fa-file-archive-o'/>
                       </div>
                    </div>
                    <div className="todo-detail">
                        <h4>Title</h4>
                        <p>{todo.title}</p>
                        <h4>Description</h4>
                        <p>{todo.description}</p>
                        <h4>Due Date</h4>
                        <p>{todo.due_date}</p>
                        <h4>Priority</h4>
                        <p>{todo.priority}</p>
                        <h4>Category</h4>
                        <p>{todo.category_name}</p>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default TodoDetail;