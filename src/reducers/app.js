const initialState = {
  categories: null,
  subCategories: null,
  messages: [],
  balance: 0,
  totalrating: 0,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CATEGORIES':
      return {
        ...state,
        categories: action.categ,
      };
    case 'GET_SUB_CATEG':
      return {
        ...state,
        subCategories: action.subCateg,
      };
    case 'POP_UP_DATE':
      return {
        ...state,
        popupData: action.popData,
      };
    case 'USER_BAL_RAT':
      return {
        ...state,
        balance: action.balance,
        totalrating: action.totalrating,
      };
    case 'MESSAGES':
      return {
        ...state,
        messages: action.message,
      };

    default:
      return state;
  }
};
