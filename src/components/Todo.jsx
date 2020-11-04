import React, {Component, Fragment} from 'react';
import {Switch, Route, Link, Redirect} from 'react-router-dom'
import {MDBBadge} from "mdbreact";
import TodoList from "./TodoList";
import CreateTodo from "./CreateTodo";
import ShareTodo from "./ShareTodo";
import CreateCategory from "./CreateCategory";
import authContext from "../authentication/AuthContext";
import NotificationDetail from "./NotificationDetail";

class Todo extends Component {
    render() {
        const {notifications} = this.context;
        return (
            <Fragment>
                <div className="row-list">
                    <div className="fixed-column">
                      <div className="list-items">
                          <ul>
                              <li><Link to='/todos/list'><i className='fa fa-list-ul'/>My Todos</Link></li>
                              <li><Link to='/todos/create'><i className='fa fa-plus'/>Create Todo</Link></li>
                              <li><Link to='/todos/share'><i className='fa fa-share'/>Share Todo</Link></li>
                              <li><Link to='/todos/category'><i className='fa fa-plus-square'/>Create Category</Link></li>
                              <li>
                                  <Link to='/todos/notification'><i className='fa fa-bell'/>Notifications</Link>
                                  <MDBBadge color="danger" className="ml-2">{notifications.length}</MDBBadge>
                              </li>
                          </ul>
                      </div>
                    </div>
                    <div className="long-column">
                        <Switch>
                            <Route path='/todos/list' component={TodoList}/>
                            <Route path='/todos/create' component={CreateTodo}/>
                            <Route path='/todos/share' component={ShareTodo}/>
                            <Route path='/todos/category' component={CreateCategory}/>
                            <Route path='/todos/notification' component={NotificationDetail}/>
                            <Redirect to='/todos/list'/>
                        </Switch>
                    </div>
                </div>
            </Fragment>
        );
    }
    static contextType = authContext;
}

export default Todo;