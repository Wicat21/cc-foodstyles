export const initialState = {
  cards: [],
  share: '',
  cardModalOpen: false,
  hideCardModal: false,
  deleteModalOpen: false,
  selectedItem: {},
};

// eslint-disable-next-line no-shadow
const state = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CARDS':
      return {
        ...state,
        cards: action.data,
      };
    case 'SHARE_CARD':
      return {
        ...state,
        share: action.data,
      };
    case 'OPEN_CARD_MODAL':
      return {
        ...state,
        share: '',
        cardModalOpen: true,
        hideCardModal: false,
        selectedItem: action.data,
      };
    case 'HIDE_CARD_MODAL':
      return {
        ...state,
        hideCardModal: true,
      };
    case 'CLOSE_CARD_MODAL':
      return {
        ...state,
        cardModalOpen: false,
        hideCardModal: false,
        share: '',
        selectedItem: {},
      };
    case 'OPEN_DELETE_MODAL':
      return {
        ...state,
        deleteModalOpen: true,
      };
    case 'CLOSE_DELETE_MODAL':
      return {
        ...state,
        deleteModalOpen: false,
      };
    default:
      return state;
  }
};

export default state;
