import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import SearchBox from './SearchBox';

class SearchPage extends Component {

  static get contextTypes () {
    return {
      router: PropTypes.object.isRequired
    }
  }
  
  handleLogout = () => {
    delete localStorage.token;
    this.context.router.push('/');
  }

  render() {
    return(
      <div>
        <AppBar
          title='Google Location Search'
          iconElementRight={<ActionExitToApp hoverColor='red' viewBox='-2 -2 25 20'/>}
          style={{marginBottom: 20}}
          zDepth={2}
          onRightIconButtonTouchTap={this.handleLogout.bind(this)}
        />
        <SearchBox/>
      </div>
    );
  }
}

export default SearchPage;