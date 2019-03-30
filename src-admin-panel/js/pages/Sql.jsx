import React from "react";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';

import {executeSql} from '../reducers/mysqlReducers';

class Sql extends React.Component {

  executeMySql() {
    if (confirm('Are you sure?')) {
      this.props.executeSql(this.state.query);
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      query: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  getSqlResult(sqlResult) {
    if (Array.isArray(this.props.sqlResult)) {
      let trs = this.props.sqlResult.map((el, index) => {
        let tds = Object.keys(el).map((k) => el[k]).map((el1, index1) => <td key={index1}>{el1}</td>);
        return <tr td key={index}>{tds}</tr>
      });
      return <table class="table table-striped">
        <tbody>{trs}</tbody>
      </table>;
    }
    return <pre>{JSON.stringify(sqlResult, null, 4)}</pre>
  }

  render() {
    let sqlResultJsx;
    if (this.props.sqlResult) {
      sqlResultJsx = this.getSqlResult(this.props.sqlResult);
    }
    return (
      <div>
        <div class="row">
          <div className="col-12">
            <h1>MySQL</h1>
            <div class="form-group">
              <label for="comment">write your query:</label>
              <textarea class="form-control"
                        style={{fontSize: '24px', fontFamily: 'Courier New, monospace'}}
                        rows="5"
                        id="query"
                        name="query"
                        value={this.state.query}
                        onChange={this.handleInputChange}></textarea>
              <button class="btn btn-secondary btn-sm" onClick={this.executeMySql.bind(this)}>Execute query</button>
            </div>
            {sqlResultJsx}
          </div>
        </div>

      </div>
    )
  }

}

export default withRouter(connect(
  (state) => ({
    sqlResult: state.system.sqlResult
  }),
  {
    executeSql
  }
)(Sql));
