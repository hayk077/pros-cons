import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Column from '../components/Column';

import {
  addMessage,
  editMessage,
  deleteMessage,
  moveItem
} from '../actions/messageActions';

class App extends React.Component {
  render() {
    const columns = this.props.store.columns.map((column, i) => (
      <Column key={i} index={i} store={this.props} name={column} />
    ));
    return (
      <div className="ui grid">
        <div className="sixteen wide column header">
          <h1>Should I eat at McDonalds?</h1>
        </div>
        {columns}
      </div>
    );
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    store: state.messageReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addMessage: (messageType, message) => {
      dispatch(addMessage(messageType, message));
    },
    editMessage: (messageType, message, index, focus) => {
      dispatch(editMessage(messageType, message, index, focus));
    },
    deleteMessage: (messageType, index) => {
      dispatch(deleteMessage(messageType, index));
    },
    moveItem: () => {
      dispatch(moveItem());
    }
  };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default DragDropContext(HTML5Backend)(AppContainer);
