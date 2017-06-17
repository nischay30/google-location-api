import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';

import request from 'superagent';
import config from '../config.js';

import RecentSearches from './RecentSearches';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state={
      dataSource: [],
      recentSearches: []
    }
  }

  componentWillMount() {
    request
      .post(`${config.serverUrl}/recent`)
      .send({token: localStorage.token})
      .end((err, res) => {
        if(err) { console.log('Err', err); return; }
        this.setState({ recentSearches: res.body.searches});
      });
  }

  handleUpdateInput = (value) => {
    if(value.length !== 0 ) {
      request
        .get(`${config.serverUrl}/search/${value}`)
        .end((err, response) => {
          this.setState({
            dataSource: response.body
          });
        });
    } else {
      this.setState({dataSource: []});
    }
  }

  handleNewRequest = (value) => {
    request
      .post(`${config.serverUrl}/save`)
      .send({location: value, token: localStorage.token})
      .end((err, response) => {
        this.componentWillMount();
        this.setState({
          dataSource: []
        });
      });
  }

  render() {
    return(
        <div className='row'>
          <div className='col-xs-12 col-md-6'>
            <AutoComplete
              hintText='Type Location'
              hintStyle={{fontSize: 20}}
              floatingLabelText='Location'
              floatingLabelStyle={{fontSize: 20}}
              dataSource={ this.state.dataSource }
              onUpdateInput={ this.handleUpdateInput }
              filter={ AutoComplete.noFilter }
              fullWidth={ true }
              onNewRequest={ this.handleNewRequest }
            />
          </div>
          <div className='col-xs-12 col-md-6'>
            <RecentSearches data={this.state.recentSearches}/>
          </div>   
        </div>  
    );
  }
}

export default SearchBox;
