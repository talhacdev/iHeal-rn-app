export default function(state = {}, action) {
  switch (action.type) {
    case 'PROFILE': {
      return {...state, user: action.user, blocked: false, session: false};
    }
    case 'SIGNUP': {
      return {...state, user: action.user, blocked: false, session: false};
    }
    case 'Block': {
      return {...state, user: undefined, blocked: true};
    }
    case 'SESSION': {
      return {...state, user: undefined, session: true};
    }
    case 'REMOVE_BLOCK': {
      return {...state, blocked: undefined, session: undefined};
    }
    case 'GET_CATEG_LIST': {
      return {...state, categList: action.categ};
    }
    default:
      return state;
  }
}
