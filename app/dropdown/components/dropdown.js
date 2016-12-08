import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Dropdown extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: props.value || {
        label: props.placeholder || 'Select...',
        value: ''
      },
      isOpen: false
    }
    this.mounted = true;
    this.handleDocumentClick = this.handleDocumentClick.bind(this)
    this.fireChangeEvent = this.fireChangeEvent.bind(this)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.value && newProps.value !== this.state.selected) {
      this.setState({selected: newProps.value})
    } else if (!newProps.value && newProps.placeholder) {
      this.setState({selected: { label: newProps.placeholder, value: '' }})
    }
  }

  componentDidMount () {
    console.log(this.DOM.ownerDocument);
    document.addEventListener('click', this.handleDocumentClick, false)
    document.addEventListener('touchend', this.handleDocumentClick, false)
  }

  componentWillUnmount () {
    this.mounted = false
    document.removeEventListener('click', this.handleDocumentClick, false)
    document.removeEventListener('touchend', this.handleDocumentClick, false)
  }

  handleMouseDown (event) {
    if (event.type === 'mousedown' && event.button !== 0) return
    event.stopPropagation()
    event.preventDefault()

    if (!this.props.disabled) {
      this.setState({
        isOpen: !this.state.isOpen
      })
    }
  }

  setValue (value, label) {
    let newState = {
      selected: {
        value,
        label
      },
      isOpen: false
    }
    this.fireChangeEvent(newState)
    this.setState(newState)
  }

  fireChangeEvent (newState) {
    if (newState.selected !== this.state.selected && this.props.onChange) {
      this.props.onChange(newState.selected)
    }
  }

  renderOption (option) {
    let value = option.value || option.label || option
    let label = option.label || option.value || option
    return (
      <li
        key={value}
        className={`${this.props.baseClassName}-option`}
        onMouseDown={this.setValue.bind(this, value, label)}
        onClick={this.setValue.bind(this, value, label)}
        dangerouslySetInnerHTML={{ __html: label }} />
    )
  }

  renderSelect() {
    const { options, baseClassName } = this.props;
    const ops = options.map((option) => {
      return this.renderOption(option)
    })
    return ops.length
      ?
      <div className={`${baseClassName}-select`}>
        <ul>{ops}</ul>
      </div>
      : <div className={`${baseClassName}-noresults`}>No options found</div>
  }

  handleDocumentClick (event) {
    if (this.mounted) {
      if (!ReactDOM.findDOMNode(this).contains(event.target)) {
        this.setState({ isOpen: false })
      }
    }
  }

  render () {
    const { baseClassName } = this.props
    const disabledClass = this.props.disabled ? `${baseClassName}-disabled` : '';
    const dropdownClass = `${baseClassName} ${this.state.isOpen ? 'is-open' : ''}`;
    const placeHolderValue = typeof this.state.selected === 'string'
      ? this.state.selected
      : this.state.selected.label;

    return (
      <div className={dropdownClass} ref={ DOM => this.DOM = DOM }>
        <div className={`${baseClassName}-current ${disabledClass}`}
          onMouseDown={this.handleMouseDown.bind(this)}
          onTouchEnd={this.handleMouseDown.bind(this)}>
          <div className={`${baseClassName}-option`}
            dangerouslySetInnerHTML={{ __html: placeHolderValue }} />
        </div>
        { this.state.isOpen ? this.renderSelect() : null }
      </div>
    )
  }
}

Dropdown.defaultProps = { baseClassName: 'dropdown' }
export default Dropdown;
