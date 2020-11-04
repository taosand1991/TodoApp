import React, {Component, Fragment} from 'react';
import NavbarHeader from "./NavbarHeader";
import {Switch, Route, Redirect} from 'react-router-dom'
import Login from "./Login";
import Todo from "./Todo";
import TodoDetail from "./TodoDetail";
import authContext from "../authentication/AuthContext";
import jwtDecode from 'jwt-decode';
import Logout from "./Logout";
import axios from 'axios'
import TodoUpdate from "./TodoUpdate";
import ProtectedRoute from "../authentication/ProtectedRoute";

class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos:[],
            categories:[],
            notifications:[],
            category:'',
            searchByCategory:false,
            searchCompletion:false
        }
    }

    async componentDidMount() {
        this.checkUserId()
    }

    checkUserId =  async () => {
        const userId = localStorage.getItem('_userId');
        if(userId){
            const user = jwtDecode(userId);
            this.setState({user})
            this.loadCategories();
            this.loadTodos();
            this.loadNotifications()
        }
    };

    loadTodos = async() => {
        const userId = localStorage.getItem('_userId')
        try{
            const {data: todos} = await axios.get('/api/todos/', {
                headers:{'Authorization': `JWT ${userId}`}
            });
            this.setState({todos})
        }catch (e) {
            console.log(e.response.data)
        }
    };

    loadCategories = async() => {
        const userId = localStorage.getItem('_userId')
        try{
            const {data: categories} = await axios.get('/api/categories/', {
                headers:{'Authorization': `JWT ${userId}`}
            });
            this.setState({categories})
        }catch (e) {
            console.log(e.response.data)
        }
    };

    setCategory = (category) => {
        this.setState({category, searchByCategory:true, searchByCompletion:false})
    };
    setCompletion =  (completed) => {
        console.log(completed);
        this.setState({completed, searchByCategory:false})
    }

    loadNotifications = async() => {
        const userId = localStorage.getItem('_userId')
       try{
             const {data:notifications} = await axios.get('/api/notifications/', {
            headers:{'Authorization': `JWT ${userId}`}
        })

           this.setState({notifications})
       }catch (e) {
           console.log(e.response.data)
       }
    }


    render() {
        const {user, todos, categories, completed, category, searchByCategory, notifications} = this.state;
        const {loadCategories, loadTodos, setCategory, setCompletion} = this;
        const filterTodos = todos.filter(todo => {
            if(searchByCategory){
                return todo.category_name.toLowerCase().indexOf(category.toLowerCase()) !== -1

            }if(completed === 'true'){
                return todo.completed
            }else if(completed === 'false'){
                return !todo.completed
            }else return todos


        });
        return (
            <Fragment>
                <authContext.Provider value={{user, todos, categories,
                    loadCategories, loadTodos, filterTodos, setCategory, setCompletion, notifications}}>
                    <NavbarHeader/>
                    <Switch>
                        <Route path='/todo/edit/:id' component={TodoUpdate}/>
                        <Route path='/todo/:id' component={TodoDetail}/>
                        <ProtectedRoute path='/login' component={Login}/>
                        <Route path='/logout' component={Logout}/>
                        <Route path='/todos' component={Todo}/>
                        <Redirect to='login'/>
                    </Switch>
                </authContext.Provider>
            </Fragment>
        );
    }

    static contextType = authContext;
}

export default MainComponent;