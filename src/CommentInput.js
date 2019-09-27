import React, { Component } from 'react'
import PropTypes from 'prop-types'
import wrapWithLoadData from './wrapWithLoadData'

class ComponentInput extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    data: PropTypes.any,
    saveData: PropTypes.func
  }
  constructor(props) {
    super(props)
    this.state = {
      username: props.data,
      content: ''
    }
  }
  componentDidMount() {
    this.textarea.focus()
  }
  handleUsernameChange(e) {
    this.setState({
      username: e.target.value
    })
  }
  handleContentChange(e) {
    this.setState({
      content: e.target.value
    })
  }
  handleSubmit() {
    if (this.props.onSubmit) {
      const { username, content } = this.state
      this.props.onSubmit({ username, content, createdTime: +new Date() })
      this.setState({ content: '' })
    }
  }
  handleUsernameBlur(e) {
    this.props.saveData(e.target.value)
  }
  render() {
    return (
      <div className="comment-input">
        <div className="comment-field">
          <span className="comment-field-name">用户名：</span>
          <div className="comment-field-input">
            <input
              value={this.state.username}
              onChange={this.handleUsernameChange.bind(this)}
              onBlur={this.handleUsernameBlur.bind(this)}
            />
          </div>
        </div>
        <div className="comment-field">
          <span className="comment-field-name">评论内容</span>
          <div className="comment-field-input">
            <textarea
              ref={textarea => (this.textarea = textarea)}
              value={this.state.content}
              onChange={this.handleContentChange.bind(this)}
            ></textarea>
          </div>
        </div>
        <div className="comment-field-button">
          <button onClick={this.handleSubmit.bind(this)}>发布</button>
        </div>
      </div>
    )
  }
}
ComponentInput = wrapWithLoadData(ComponentInput, 'username')
export default ComponentInput
