import React from 'react';
import PropTypes from 'prop-types';
import { DragTypes } from '../DragTypes';
import { DragSource, DropTarget } from 'react-dnd';

import MessageView from './MessageView';
import EmptyField from '../containers/EmptyField';

const Column = ({ name, connectDragSource, connectDropTarget, store }) => {
  const messages =
    name === 'PROS' ? store.store.prosMessages : store.store.consMessages;
  const focus = name === 'PROS' ? store.store.prosFocus : store.store.consFocus;
  const counter = messages.length;

  return connectDragSource(
    connectDropTarget(
      <div className="eight wide column draggable-column">
        <div className="ui segment col-header">
          <div>{name}</div>
        </div>
        <div className="ui">
          <MessageView
            store={store}
            messages={messages}
            counter={counter}
            focus={focus}
            messageType={name}
          />
          <EmptyField
            store={store}
            counter={counter}
            focus={focus}
            messageType={name}
          />
        </div>
      </div>
    )
  );
};

Column.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  store: PropTypes.object.isRequired
};

const itemSource = {
  beginDrag(props) {
    return {
      index: props.index
    };
  }
};

const itemTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    props.store.moveItem();

    monitor.getItem().index = hoverIndex;
  }
};

function dropCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

function dragCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource()
  };
}

export default DropTarget(DragTypes.ITEM, itemTarget, dropCollect)(
  DragSource(DragTypes.ITEM, itemSource, dragCollect)(Column)
);
