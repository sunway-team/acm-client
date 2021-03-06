import {
  TOGGLE_FOOTER,
  TOGGLE_HEADER,
  SET_FOOTER_STATE,
  SET_HEADER_STATE,
  ADD_HEADER_OPTIONS,
  ADD_FOOTER_OPTIONS,
  RESET_HEADER_OPTIONS,
  RESET_FOOTER_OPTIONS,
  OPEN_HEADER_MENU,
  CLOSE_HEADER_MENU,
  SET_HEADER_MENU_STATE,
} from './action';

export const KEY = 'toolbar';

const routes = require('Navigation/resolver').generateRoutes();
const initialRoute = routes['splash'];

const INITIAL_STATE = {
  header: {
    visible: true,
    options: initialRoute.header,
    menu: {
      isOpen: false,
    },
  },
  footer: {
    visible: true,
    options: initialRoute.footer,
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_HEADER:
      return {
        ...state,
        header: {
          ...state.header,
          visible: !state.header.visible,
        },
      };
    case SET_HEADER_STATE:
      return {
        ...state,
        header: {
          ...state.header,
          visible: action.header.visible,
        },
      };
    case RESET_HEADER_OPTIONS:
      return {
        ...state,
        header: {
          ...state.header,
          options: action.payload,
        },
      };
    case ADD_HEADER_OPTIONS:
      return {
        ...state,
        header: {
          ...state.header,
          options: {
            ...state.header.options,
            ...action.payload,
          },
        },
      };
    case TOGGLE_FOOTER:
      return {
        ...state,
        footer: {
          ...state.footer,
          visible: !state.footer.visible,
        },
      };
    case SET_FOOTER_STATE:
      return {
        ...state,
        footer: {
          ...state.footer,
          visible: action.footer.visible,
        },
      };
    case RESET_FOOTER_OPTIONS:
      return {
        ...state,
        footer: {
          ...state.footer,
          options: action.payload,
        },
      };
    case ADD_FOOTER_OPTIONS:
      return {
        ...state,
        footer: {
          ...state.footer,
          options: {
            ...state.footer.options,
            ...action.payload,
          },
        },
      };
    case OPEN_HEADER_MENU:
      return {
        ...state,
        header: {
          ...state.header,
          menu: {
            isOpen: true,
          },
        },
      };
    case CLOSE_HEADER_MENU:
      return {
        ...state,
        header: {
          ...state.header,
          menu: {
            isOpen: false,
          },
        },
      };
    case SET_HEADER_MENU_STATE:
      return {
        ...state,
        header: {
          ...state.header,
          menu: {
            isOpen: action.isOpen,
          },
        },
      };

    default:
      return state;
  }
};
