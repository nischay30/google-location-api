import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class RecentSearches extends Component {
  render() {
    const Rows = this.props.data.map((suggestion, index) => {
      return(
        <TableRow key={ index } striped={true}>
          <TableRowColumn>{ suggestion }</TableRowColumn>
        </TableRow>
      );
    });

    return(
      <div>
        <div className='col-xs-offset-3'>
          <h2> Search History </h2>
        </div>
      {this.props.data.length !== 0 ?
      <Table height='400px' disabled={true}>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Searched Location</TableHeaderColumn>
            </TableRow>
          </TableHeader>
        <TableBody displayRowCheckbox={false}>
          { Rows }
        </TableBody>
      </Table> : null }
      </div>
    );
  }
}

export default RecentSearches;
