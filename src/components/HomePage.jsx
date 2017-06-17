import React, {Component } from 'react';
import Authentication from './Authentication';
import AppBar from 'material-ui/AppBar';

class HomePage extends Component {

  render(){
    return(
      <div>
        <AppBar
          title='Google Location Search'
          style={{marginBottom: 20}}
          zDepth={2}
        />
        <Authentication/>
      </div>
    );
  }
}

export default HomePage