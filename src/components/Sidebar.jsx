import React, { Component } from "react";
import cookie from "react-cookies";

import Relation from "./Relation";

export default class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sort_weight: true,
      limits: "",
      relations: props.relations,
      handle_limit: props.handle_limit,
      handle_sort: props.handle_sort,
      handle_updateRelation: props.handle_updateRelation,
      collapse: false
    };

    // References
    this.switch_sort = React.createRef();
    this.relation_list = React.createRef();
    this.sidebar = React.createRef();
    this.btnOption = React.createRef();
    // Bind
    this.clickCollapse = this.clickCollapse.bind(this);
    this.switch = this.switch.bind(this);
    this.onChangeLimit = this.onChangeLimit.bind(this);
    this.checkCollapse = this.checkCollapse.bind(this);
  }

  componentDidMount() {
    this.relation_list.current.style.height = `${window.innerHeight -
      (this.relation_list.current.offsetTop + 100)}px`;
    this.checkCollapse();

    window.addEventListener("resize", () => {
      this.relation_list.current.style.height = `${window.innerHeight -
        (this.relation_list.current.offsetTop + 100)}px`;

      this.checkCollapse();
    });

    // Check if in cookies there is a user preference
    let sort_weight = cookie.load("sort_weight")
      ? JSON.parse(cookie.load("sort_weight"))
      : true;
    if (!sort_weight) this.switch();

    let limits = cookie.load("limits")
      ? JSON.parse(cookie.load("limits"))
      : null;
    if (limits) this.onChangeLimit({ target: { value: limits } });
  }

  checkCollapse() {
    let { collapse } = this.state
    if (window.innerWidth <= 1024) {
      collapse = true
      this.btnOption.current.classList.remove("hidden");
      this.sidebar.current.classList.remove("show");
    } else {
      collapse = false
      this.btnOption.current.classList.add("hidden");
      this.sidebar.current.classList.add("show");
    }
    
    this.setState({collapse})
  }

  componentWillUnmount() {
    window.removeEventListener("resize");
  }

  switch() {
    let { sort_weight } = this.state;
    sort_weight = !sort_weight;

    if (!sort_weight) {
      this.switch_sort.current.textContent = "Tri alphabétique";
      this.switch_sort.current.classList.add("active");
    } else {
      this.switch_sort.current.textContent = "Tri par poids";
      this.switch_sort.current.classList.remove("active");
    }

    cookie.save("sort_weight", sort_weight, { path: "/" });
    this.setState({ sort_weight });
    this.state.handle_sort(sort_weight);
  }

  onChangeLimit(event) {
    let { value } = event.target;
    this.setState({ limits: value });
    this.state.handle_limit(value);

    cookie.save("limits", value, { path: "/" }); // Save the limit value in cookies
  }

  clickCollapse() {
    let { collapse } = this.state

    if (collapse) this.sidebar.current.classList.add("show");
    else this.sidebar.current.classList.remove("show");

    this.setState({ collapse: !collapse });
  }

  render() {
    return (
      <div className="sidebar-container">
        <button
          className="btn btn-option hidden"
          type="button"
          onClick={this.clickCollapse}
          ref={this.btnOption}
        >
          Options
        </button>
        <div className="sidebar collapse show" id="sidebar" ref={this.sidebar}>
          <h3>Options :</h3>
          <div className="options">
            <div className="limits">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="limits-input">
                    Nombre d'entrées à afficher
                  </span>
                </div>
                <input
                  type="number"
                  className="form-control"
                  value={this.state.limits}
                  onChange={this.onChangeLimit}
                />
              </div>
            </div>

            <div className="sorts">
              <div className="btn-group-toggle">
                <label
                  className="btn btn-secondary"
                  onClick={this.switch}
                  ref={this.switch_sort}
                >
                  <input type="checkbox" /> Tri par poids
                </label>
              </div>
            </div>

            <div className="relations">
              <h4 className="relations-title">Relations à afficher</h4>
              <div className="relations-list" ref={this.relation_list}>
                {this.state.relations.map((r, i) => (
                  <Relation
                    key={i}
                    index={i}
                    name={r.name}
                    title={r.title}
                    handler={this.state.handle_updateRelation}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
