import React, { Component } from "react";
import API from "../API";

export default class Navigation extends Component {
  lastCall;
  lastCallTimer;
  constructor(props) {
    super(props);
    let {
      params: { word }
    } = this.props;

    this.state = {
      word: word ? word : "",
      handler: props.handler,
      suggestions: [],
      clear: props.clear,
      controller: null,
      requests: []
    };
    // Bind
    this.updateInputValue = this.updateInputValue.bind(this);
    this.onClick = this.onClick.bind(this);
    this.debounce = this.debounce.bind(this);

    // References
    this.input = React.createRef();
  }

  componentDidMount() {
    let { word } = this.state
    if (word) this.onClick();

    this.input.current.addEventListener("keyup", event => {
      if (this.state.word !== "" && event.key === "Enter") this.onClick();
    });
  }

  componentWillUnmount() {
    this.input.current.removeEventListener("keyup");
  }

  async onClick() {
    let { requests, controller } = this.state;

    // Check if all precedent requests are finished
    if (controller) {
      let all_request_ended = true;
      requests.forEach(req => {
        if (!req) all_request_ended = false;
      });
      if (!all_request_ended) controller.abort()
    }
    
    // Set a new controller
    controller = new AbortController();
    this.setState({ controller })
    let signal = controller.signal

    // Clear suggestions
    this.setState({ suggestions: [] });
    
    this.state.clear();
    // Get definitions
    this.state.handler(await API.getDefinitions(this.state.word, signal));

    // Get relations
    for (let i = 0; i < this.props.relations.length; i++) {
      const rel = this.props.relations[i];
      // if (rel.checked) {
      requests.push(false);
      let data = await API.getRelations(
        this.state.word,
        rel.id,
        signal,
        this.props.limits
      );

      requests[i] = true;
      this.state.handler(data);
      // }
    }
  }

  async updateInputValue(event) {
    let { value } = event.target;

    if (value === 0) {
      this.setState({ word: event.target.innerText }, () => {
        this.onClick();
      });
    } else {
      this.setState({ word: value });
      if (value.length >= 3) {
        // Debounce function (wait 200ms between calls)
        this.debounce(async () => {
          let data = await API.getAutocomplete(value);
          this.setState({ suggestions: data });
        }, 200)();
        this.setState({ last_update: Date.now() });
      } else {
        this.setState({ suggestions: [] });
      }
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="brand" href="/">
          <img src="/diko_logo.png" alt="Diko" id="logo" />
        </a>

        <div className="collapse navbar-collapse show" id="div-search">
          <div className="form-search">
            <div className="input-search">
              <input
                className="btn btn-search"
                type="search"
                placeholder="Rechercher un mot..."
                onChange={this.updateInputValue}
                value={this.state.word}
                id="search-input"
                ref={this.input}
              />
              <ul id="suggestions">
                {this.state.suggestions.map((el, i) => (
                  <li key={i} onClick={this.updateInputValue}>
                    {el}
                  </li>
                ))}
              </ul>
            </div>

            <button
              className="btn btn-valid-search"
              type="submit"
              onClick={this.onClick}
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </nav>
    );
  }

  debounce(f, t) {
    let self = this;
    return function(args) {
      let previousCall = self.lastCall;
      self.lastCall = Date.now();
      if (previousCall && self.lastCall - previousCall <= t) {
        clearTimeout(self.lastCallTimer);
      }
      self.lastCallTimer = setTimeout(() => f(args), t);
    };
  }
}
