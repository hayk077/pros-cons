import React from 'react';
import PropTypes from 'prop-types';

class EmptyField extends React.Component {
  state = {
    value: '',
    activeFocus: false
  };

  componentWillReceiveProps({ focus, counter, messageType, store }) {
    this.setState({ activeFocus: focus === counter }, () => {
      if (this.state.activeFocus && messageType === store.store.activeColumn) {
        this.inputRef.focus();
      }
    });
  }

  onChange = e => {
    this.props.store.addMessage(this.props.messageType, e.target.value);

    this.setState({
      value: ''
    });
  };

  render() {
    return (
      <div className="ui sixteen wide">
        <b>{this.props.counter + 1}. </b>
        <input
          type="text"
          onChange={this.onChange}
          value={this.state.value}
          ref={ref => (this.inputRef = ref)}
        />
      </div>
    );
  }
}

EmptyField.propTypes = {
  store: PropTypes.object.isRequired,
  messageType: PropTypes.string.isRequired,
  counter: PropTypes.number.isRequired,
  focus: PropTypes.number.isRequired
};

export default EmptyField;
