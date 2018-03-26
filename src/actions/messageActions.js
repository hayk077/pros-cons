export function addMessage(messageType, message) {
  return {
    type: 'ADD_MESSAGE',
    message,
    messageType
  };
}

export function editMessage(messageType, message, index, focus) {
  return {
    type: 'EDIT_MESSAGE',
    message,
    messageType,
    index,
    focus
  };
}

export function deleteMessage(messageType, index) {
  return {
    type: 'DELETE_MESSAGE',
    messageType,
    index
  };
}

export function moveItem() {
  return {
    type: 'MOVE_ITEM'
  };
}
