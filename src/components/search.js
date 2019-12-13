import React, { Component } from "react";

class SearchBox extends Component {

  render() {
    return (
      <div className="col-xs-12 search-container nopadding">
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-lg-7">
            <form>
              <input
                ref="search suggestion"
                onChange={(e) => this.props.handleSearch(e.target.value)}
                className="searchbox__input typeahead form-control"
                type="text"
                placeholder="Search Movie Title..."
                id="search"
              />
              {/* <button onClick={this.handleSearch}>Search</button> */}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBox;
