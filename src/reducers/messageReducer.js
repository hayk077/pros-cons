const messageReducer = (
  state = {
    columns: ['PROS', 'CONS'],
    prosMessages: [],
    consMessages: [],
    consFocus: 0,
    prosFocus: 0,
    activeColumn: 'PROS'
  },
  action
) => {
  let messageType = state.consMessages;
  let alteredMessageType = 'consMessages';
  let alteredFocusType = 'consFocus';

  if (action.messageType === 'PROS') {
    messageType = state.prosMessages;
    alteredMessageType = 'prosMessages';
    alteredFocusType = 'prosFocus';
  }

  switch (action.type) {
    case 'ADD_MESSAGE': {
      return {
        ...state,
        activeColumn: action.messageType,
        [alteredMessageType]: messageType.concat(action.message)
      };
    }
    case 'EDIT_MESSAGE': {
      return {
        ...state,
        activeColumn: action.messageType,
        [alteredFocusType]: action.focus,
        [alteredMessageType]: messageType.map((message, i) => {
          if (i === action.index) {
            return action.message;
          }
          return message;
        })
      };
    }
    case 'DELETE_MESSAGE': {
      return {
        ...state,
        activeColumn: action.messageType,
        [alteredFocusType]: action.index,
        [alteredMessageType]: [
          ...messageType.slice(0, action.index),
          ...messageType.slice(action.index + 1, messageType.length)
        ]
      };
    }
    case 'MOVE_ITEM': {
      return {
        ...state,
        columns: [].concat(state.columns).reverse()
      };
    }
    default: {
      return state;
    }
  }
};

export default messageReducer;
