import React, { Component } from 'react'
import cookie from 'react-cookies'

import BtnRelation from './BtnRelation'

export default class Sidebar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sort_weight: true,
      limits: '',
      relations: props.relations,
      handle_limit: props.handle_limit,
      handle_sort: props.handle_sort,
      handle_updateRelation: props.handle_updateRelation,
      handle_display: props.handle_display,
      collapse: false,
      display_list: true
    }

    // References
    this.switch_sort_btn = React.createRef()
    this.relation_list = React.createRef()
    this.sidebar = React.createRef()
    this.btnOption = React.createRef()
    this.switch_display_btn = React.createRef()

    // Bind
    this.clickCollapse = this.clickCollapse.bind(this)
    this.switch = this.switch.bind(this)
    this.onChangeLimit = this.onChangeLimit.bind(this)
    this.checkCollapse = this.checkCollapse.bind(this)
    this.switch_display = this.switch_display.bind(this)
  }

  componentDidMount() {
    this.relation_list.current.style.height = `${window.innerHeight -
      (this.relation_list.current.offsetTop + 100)}px`
    this.checkCollapse()

    window.addEventListener('resize', () => {
      this.relation_list.current.style.height = `${window.innerHeight -
        (this.relation_list.current.offsetTop + 100)}px`

      this.checkCollapse()
    })

    // Check if in cookies there is a user preference
    let sort_weight = cookie.load('sort_weight')
      ? JSON.parse(cookie.load('sort_weight'))
      : true
    if (!sort_weight) this.switch()

    let limits = cookie.load('limits')
      ? JSON.parse(cookie.load('limits'))
      : null
    if (limits) this.onChangeLimit({ target: { value: limits } })

    let display_list = cookie.load('display_list')
      ? JSON.parse(cookie.load('display_list'))
      : true
    if (!display_list) this.switch_display()
  }

  checkCollapse() {
    let { collapse } = this.state
    if (window.innerWidth <= 1024 && !collapse) {
      collapse = true
      this.btnOption.current.classList.remove('hidden')
      this.sidebar.current.classList.remove('show')
    } else if(window.innerWidth > 1024) {
      collapse = false
      this.btnOption.current.classList.add('hidden')
      this.sidebar.current.classList.add('show')
    }

    this.setState({ collapse })
  }

  componentWillUnmount() {
    window.removeEventListener('resize')
  }

  switch() {
    let { sort_weight } = this.state
    sort_weight = !sort_weight

    if (!sort_weight) {
      this.switch_sort_btn.current.textContent = 'Tri alphabétique'
      this.switch_sort_btn.current.classList.add('active')
    } else {
      this.switch_sort_btn.current.textContent = 'Tri par poids'
      this.switch_sort_btn.current.classList.remove('active')
    }

    cookie.save('sort_weight', sort_weight, { path: '/' })
    this.setState({ sort_weight })
    this.state.handle_sort(sort_weight)
  }

  switch_display() {
    let { display_list } = this.state
    display_list = !display_list

    if (!display_list) {
      this.switch_display_btn.current.textContent = 'Affichage bloc'
      this.switch_display_btn.current.classList.add('active')
    } else {
      this.switch_display_btn.current.textContent = 'Affichage liste'
      this.switch_display_btn.current.classList.remove('active')
    }

    cookie.save('display_list', display_list, { path: '/' })
    this.setState({ display_list })
    // this.state.handle_display(display_list)
  }

  onChangeLimit(event) {
    let { value } = event.target
    this.setState({ limits: value })
    this.state.handle_limit(value)

    cookie.save('limits', value, { path: '/' }) // Save the limit value in cookies
  }

  clickCollapse() {
    let { collapse } = this.state

    if (collapse) this.sidebar.current.classList.add('show')
    else this.sidebar.current.classList.remove('show')

    this.setState({ collapse: !collapse })
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
                  ref={this.switch_sort_btn}
                >
                  <input type="checkbox" /> Tri par poids
                </label>
              </div>
            </div>

            <div className="sorts">
              <div className="btn-group-toggle">
                <label
                  className="btn btn-secondary"
                  onClick={this.switch_display}
                  ref={this.switch_display_btn}
                >
                  <input type="checkbox" /> Affichage liste
                </label>
              </div>
            </div>

            <div className="relations">
              <h4 className="relations-title">Relations à afficher</h4>
              <div className="relations-list" ref={this.relation_list}>
                {this.state.relations.map((r, i) => (
                  <BtnRelation
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
    )
  }
}
