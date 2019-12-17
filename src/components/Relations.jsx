import React, { Component } from 'react'

export default class Relations extends Component {
  constructor(props) {
    super(props)

    this.state = {
      relations: props.relation,
      index_relation: props.index_relation,
      name: props.name,
      click: props.click
    }

    // Bindings
    this.parse_rel = this.parse_rel.bind(this)
    this.handle_click = this.handle_click.bind(this)
  }

  render_relation(rel) {
    rel = this.parse_rel(rel)
    return <a 
      href={`/search/${rel.node}`}
      className={`${rel.weight < 0 ? 'negative': ''} ${rel.node[0] === '=' ? 'italic' :'' }`}
      title={rel.weight}>
        {rel.node[0] === '=' ? rel.node.slice(1): rel.node}
    </a>
  }

  parse_rel(rel) {
    return {
      rid: rel.split(';')[0],
      node: rel.split(';')[1],
      weight: parseInt(rel.split(';')[2])
    }
  }

  handle_click(e) {
    this.state.click(e)
  }


  render() {
    let { relations, index_relation, name, click } = this.state
    return (
      <li className="relation-content" key={index_relation}>
        <h4 onClick={this.handle_click}>Relation: {name}</h4>
        <ul className="relation-ul">
          {relations.map((el, i) => (
            <li key={i}>
              {this.render_relation(el)}
            </li>
          ))}
        </ul>
      </li>
    )
  }
}
