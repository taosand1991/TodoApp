import React, {Component, Fragment} from 'react';
import {MDBBtn, MDBInput} from 'mdbreact';
import axios from 'axios'

class CreateCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category_name: '',
            loading: false
        }
    }

    handleChange = (e) => {
        this.setState({category_name: e.target.value})
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('_userId');
        this.setState({loading: true});
        const categoryOptions = {
            name: this.state.category_name
        };
        try {
            await axios.post('/api/categories/', categoryOptions, {
                headers:{"Authorization" : `JWT ${userId}`}
            });
            setTimeout(() => {
                    this.setState({loading: false});
                    this.props.history.push({
                        pathname:'/todos',
                        state:{categorySuccess:'Successfully created'}
                    })
                    alert('successfully created')
                }, 2000
            )
        } catch (e) {
            this.setState({loading:false});
            console.log(e.response.data)
        }

    };

    render() {
        const {category_name, loading} = this.state;
        return (
            <Fragment>
                {loading && <div className='spinner'/> }
                <div className="category-create">
                    <h5>Create Category</h5>
                    <div className="category-form">
                        <form onSubmit={this.handleSubmit}>
                            <MDBInput onChange={this.handleChange} value={category_name} label='Category name'
                                      background/>
                            <MDBBtn type='submit' block color='orange'>create category</MDBBtn>
                        </form>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default CreateCategory;