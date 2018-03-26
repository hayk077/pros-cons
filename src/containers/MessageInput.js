import React from 'react';
import PropTypes from 'prop-types';

class MessageInput extends React.Component {
  state = {
    value: this.props.message || '',
    activeFocus: false
  };

  componentWillReceiveProps({ focus, message, messageType, index, store }) {
    this.setState({ value: message, activeFocus: focus === index }, () => {
      if (this.state.activeFocus && messageType === store.store.activeColumn) {
        this.inputRef.focus();
      }
    });
  }

  onChange = e => {
    const { store, messageType, index } = this.props;

    if (e.target.value === '') {
      store.deleteMessage(messageType, index);
    } else {
      store.editMessage(messageType, e.target.value, index, index);
    }

    this.setState({
      value: e.target.value
    });
  };

  onKeyPress = target => {
    if (target.charCode !== 13) {
      return;
    }

    const { store, messageType, index } = this.props;

    store.editMessage(messageType, this.state.value, index, index + 1);
    this.setState({ value: this.state.value });
  };

  moveCaretAtEnd = e => {
    var tempValue = e.target.value;
    e.target.value = '';
    e.target.value = tempValue;
  };

  render() {
    const { index, counter } = this.props;

    let fieldNumber = index >= 0 ? index : counter;
    fieldNumber++;
    if (index + 1 === counter) {
      return (
        <div className="ui sixteen wide">
          <b>{fieldNumber}. </b>
          <input
            ref={ref => (this.inputRef = ref)}
            autoFocus
            onFocus={this.moveCaretAtEnd}
            onChange={this.onChange}
            onKeyPress={this.onKeyPress}
            value={this.state.value}
            type="text"
          />
        </div>
      );
    } else {
      return (
        <div className="ui sixteen wide">
          <b>{fieldNumber}. </b>
          <input
            onChange={this.onChange}
            onKeyPress={this.onKeyPress}
            value={this.state.value}
            type="text"
            ref={ref => (this.inputRef = ref)}
          />
        </div>
      );
    }
  }
}

MessageInput.propTypes = {
  store: PropTypes.object.isRequired,
  messageType: PropTypes.string.isRequired,
  focus: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  counter: PropTypes.number.isRequired,
  message: PropTypes.string
};

export default MessageInput;
