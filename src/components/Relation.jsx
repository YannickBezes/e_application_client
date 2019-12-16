import React, { Component } from "react";
import cookie from "react-cookies";

export default class Relation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: props.index,
      name: props.name,
      title: props.title,
      handler: props.handler,
      checked: true
    };
    // Bind
    this.check = this.check.bind(this);
    // Reference
    this.checkbox = React.createRef();
  }

  componentDidMount() {
    let relation = cookie.load(this.state.name)
      ? JSON.parse(cookie.load(this.state.name))
      : true;
    if (!relation) this.check();
  }

  check() {
    let { checked, name } = this.state;
    if (checked) {
      this.checkbox.current.classList.add("active");
    } else {
      this.checkbox.current.classList.remove("active");
    }

    // Set cookie
    if (checked) cookie.save(name, !checked, { path: "/" });
    else cookie.remove(name, { path: "/" });

    this.setState({ checked: !checked });
    this.state.handler(this.state.index, !checked);
  }

  render() {
    return (
      <div className="btn-group-toggle relation" title={this.state.title}>
        <label
          className="btn btn-secondary"
          onClick={this.check}
          ref={this.checkbox}
        >
          {/* <input type="checkbox"/> */}
          {this.state.name.slice(2)}
        </label>
      </div>
    );
  }
}
