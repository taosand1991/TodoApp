import React, {Component, Fragment} from 'react';
import {MDBCol, MDBInput, MDBBtn, MDBRow, MDBContainer, MDBAlert} from 'mdbreact'
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true,
            isRegister: false,
            loginDetails: {email: '', password: ''},
            registerDetails: {email_1: '', password_1: '', password_2: ''},
            loading: false,
            errors:{}
        };
    }

    openLogin = () => {
        this.setState({isLogin: true, isRegister: false})
    };
    openRegister = () => {
        this.setState({isLogin: false, isRegister: true})
    };

    handleLoginChange = (e) => {
        const loginDetails = {...this.state.loginDetails};
        loginDetails[e.target.name] = e.target.value;
        this.setState({loginDetails})
    };

    handleRegisterChange = (e) => {
        const registerDetails = {...this.state.registerDetails}
        registerDetails[e.target.name] = e.target.value;
        this.setState({registerDetails})
    };

    handleLoginSubmit = async (e) => {
        e.preventDefault();
        const {email, password} = this.state.loginDetails;
        this.setState({loading:true});
        const loginObject = {
            username: email,
            password: password,
        };
        try {
            const {data: response} = await axios.post('http://localhost:8000/auth/login/', loginObject);
            localStorage.setItem('_userId', response.token);
            setTimeout(() => {
                this.setState({loading:false});
                window.location.href = '/todos'
            }, 3000)
        } catch (e) {
            this.setState({loading:false});
            const errors = {...this.state.errors};
            errors['login'] = e.response.data['non_field_errors'];
            this.setState({errors})
        }
    };

    handleRegisterSubmit = async(e) => {
        e.preventDefault();
        this.setState({loading:true});
        const {email_1, password_1, password_2} = this.state.registerDetails;
        const regObject = {
            username: email_1,
            password:password_1,
            password2:password_2
        };
        try{
            const {data: response} = await axios.post('http://localhost:8000/api/users/', regObject);
             localStorage.setItem('_userId', response.token);
            setTimeout(() => {
                this.setState({loading:false});
                window.location.href = '/todos'
            }, 3000)
        }catch (e) {
            this.setState({loading:false});
            const errors = {...this.state.errors};
            errors['username'] = e.response.data['username'];
            this.setState({errors})
        }
    };

    componentWillUnmount() {
        this.setState = (() =>{

        })
    }

    render() {
        const {isLogin, isRegister, registerDetails, loginDetails, loading, errors} = this.state;
        return (
            <Fragment>
                {loading && <div className='spinner'/> }
                <div className="shadow-card">
                    <div className="edge-label">
                        <h2 onClick={this.openLogin}>Login</h2>
                        <h2 onClick={this.openRegister}>ٌٌRegister</h2>
                    </div>
                    <div className="user-authenticate">
                        <div className={isLogin ? "login show" : 'login'}>
                            <MDBContainer>
                                <MDBRow>
                                    <MDBCol md="12">
                                        <form onSubmit={this.handleLoginSubmit}>
                                            <p className="h5 text-center mb-4">Sign in</p>
                                            {errors.login && <MDBAlert color='danger' >{errors.login}</MDBAlert>}
                                            <div className="grey-text">
                                                <MDBInput label="Type your email" icon="envelope" group type="text"
                                                          name='email'
                                                          onChange={this.handleLoginChange}
                                                          value={loginDetails.email}
                                                          validate/>
                                                <MDBInput label="Type your password" icon="lock" group type="password"
                                                          name='password'
                                                          onChange={this.handleLoginChange}
                                                          value={loginDetails.password}
                                                          validate/>
                                            </div>
                                            <div className="text-center">
                                                <MDBBtn type='submit'>Login</MDBBtn>
                                            </div>
                                        </form>
                                    </MDBCol>
                                </MDBRow>
                            </MDBContainer>
                        </div>
                        <div className={isRegister ? 'register  show' : "register"}>
                            <MDBContainer>
                                <MDBRow>
                                    <MDBCol md="12">
                                        <form onSubmit={this.handleRegisterSubmit}>
                                            <p className="h5 text-center mb-4">Sign up</p>
                                            {errors.username && <MDBAlert color='danger' >{errors.username}</MDBAlert>}
                                            <div className="grey-text">
                                                <MDBInput label="Your username" icon="user" group type="text"
                                                          name='email_1'
                                                          value={registerDetails.email_1}
                                                          onChange={this.handleRegisterChange}
                                                          validate/>

                                                <MDBInput label="Your password" icon="lock" group type="password"
                                                          name='password_1'
                                                          value={registerDetails.password_1}
                                                          onChange={this.handleRegisterChange}
                                                          validate/>
                                                <MDBInput label="Confirm your password" icon="exclamation-triangle"
                                                          group type="password"
                                                          name='password_2'
                                                          value={registerDetails.password_2}
                                                          onChange={this.handleRegisterChange}
                                                          validate/>
                                            </div>
                                            <div className="text-center">
                                                <MDBBtn type='submit' color="primary">Register</MDBBtn>
                                            </div>
                                        </form>
                                    </MDBCol>
                                </MDBRow>
                            </MDBContainer>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Login;