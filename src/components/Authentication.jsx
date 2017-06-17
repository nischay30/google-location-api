import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import request from 'superagent';
import config from '../config';

class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state={
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      emailLogin: '',
      passwordLogin: ''
    }
  }
  static get contextTypes() {
    return{
      router: PropTypes.object.isRequired
    }
  }


  handleNameChange = (event) => {
    this.setState({ name: event.target.value});
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value});
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value});
  }

  handleConfirmPasswordChange = (event) => {
    this.setState({ confirmPassword: event.target.value });
  }

  handleEmailLoginChange = (event) => {
    this.setState({ emailLogin: event.target.value,msg: null });
  }

  handlePasswordLoginChange = (event) => {
    this.setState({ passwordLogin: event.target.value, msg: null });
  }

  handleSignupFormSubmit = (event) => {
    event.preventDefault();
    if(this.state.password !== this.state.confirmPassword) {
      alert('Passwords do not match');
      this.setState({ password: '', confirmPassword: ''});
      return;
    }
    const userDetails = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
    };

    request
      .post(`${config.serverUrl}/signup`)
      .send(userDetails)
      .end((err, response) => {
        if(err) { alert(err.body.msg); return; }
        alert(response.body.msg);
      });
    this.setState({ name: '', email:'', password: '', confirmPassword: ''});
  }

  handleLoginFormSubmit = (event) => {
    event.preventDefault();
    const loginDetails = {
      email: this.state.emailLogin,
      password: this.state.passwordLogin
    }
    request
      .post(`${config.serverUrl}/login`)
      .send(loginDetails)
      .end((err, response) => {
        if(err) { console.log('Error'); return; }
        if(response.body.hasOwnProperty('token')) {
          localStorage.token = response.body.token;
          this.context.router.push('/search');
          return;
        }
        this.setState({msg: response.body.msg});
      });
    this.setState({ emailLogin: '', passwordLogin: ''});
  }

  render() {
    return(
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-5 col-md-offset-3'>
            <Tabs>
              <Tab label='SignUp' style={{fontWeight:'bold', fontSize:20}}>
                <form style={{textAlign: 'center'}} onSubmit={ this.handleSignupFormSubmit }>
                  <TextField
                    hintText='Enter Name'
                    floatingLabelText='Name'
                    value={this.state.name}
                    onChange= { this.handleNameChange}
                    type='text'
                    required
                    style={{width: 350}}
                    inputStyle={{fontSize: 20, fontWeight: 'bold'}}
                  />
                  <br/>
                  <TextField
                    hintText='Enter Email'
                    floatingLabelText='Email'
                    value={this.state.email}
                    onChange= { this.handleEmailChange}
                    type='email'
                    required
                    style={{width: 350}}
                    inputStyle={{fontSize: 20, fontWeight: 'bold'}}
                  />
                  <br/>
                  <TextField
                    hintText='Enter Password'
                    floatingLabelText='Password'
                    value={this.state.password}
                    onChange= { this.handlePasswordChange}
                    type='password'
                    required
                    style={{width: 350}}
                    inputStyle={{fontSize: 20, fontWeight: 'bold'}}
                  />
                  <TextField
                    hintText='Confirm Password'
                    floatingLabelText='Confirm Password'
                    value={this.state.confirmPassword}
                    onChange= { this.handleConfirmPasswordChange}
                    type='password'
                    required
                    style={{width: 350}}
                    inputStyle={{fontSize: 20, fontWeight: 'bold'}}
                  />
                  <br/>
                  <br/>
                  <RaisedButton label='Submit' type='submit' primary={true}/>
                </form>
              </Tab>
              <Tab label='Login'>
                <form style={{textAlign: 'center'}} onSubmit={ this.handleLoginFormSubmit }>
                  <TextField
                    hintText='Enter Email'
                    floatingLabelText='Email'
                    value={this.state.emailLogin}
                    onChange= { this.handleEmailLoginChange}
                    type='email'
                    required
                    style={{width: 350}}
                    inputStyle={{fontSize: 20, fontWeight: 'bold'}}
                  />
                  <br/>
                  <TextField
                    hintText='Enter Password'
                    floatingLabelText='Password'
                    value={this.state.passwordLogin}
                    onChange= { this.handlePasswordLoginChange}
                    type='password'
                    required
                    style={{width: 350}}
                    inputStyle={{fontSize: 20, fontWeight: 'bold'}}
                  />
                  <br/>
                  {this.state.msg ? <p style={{color: 'red', fontWeight: 'bold'}}>{this.state.msg}</p>: null}
                  <RaisedButton label='Submit' type='submit' primary={true}/>
                </form>
              </Tab>
            </Tabs>
          </div>
        </div>  
      </div>
    );
  }

}

export default Authentication;
