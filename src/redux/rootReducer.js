import {__INIT__,
  APPLY_STILE,
  CHANGE_STYLES,
  CHANGE_TEXT,
  CHANGE_TITLE,
  TABLE_RESIZE
} from "@/redux/types";

export function rootReducer(state, action) {
  let field;
  let prevState;
  switch (action.type) {
    case __INIT__:
      return {...state}

    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState';
      return {...state, [field]: value(state, field, action)};

    case CHANGE_TEXT:
      field = 'dataState';
      return {
        ...state,
        currentText: action.data.value,
        [field]: value(state, field, action)
      };

    case CHANGE_STYLES:
      return {...state, currentStyles: action.data}

    case APPLY_STILE:
      field = 'stylesState';
      prevState = state[field] || {};
      action.data.ids.forEach(id => {
        prevState[id] = {...prevState[id], ...action.data.value};
      });
      return {
        ...state,
        [field]: prevState,
        currentStyles: {...state.currentStyles, ...action.data.value},
      }

    case CHANGE_TITLE:
      return {...state, title: action.data};

    default:
      return {...state}
  }
}

function value(state, field, action) {
  const newState = state[field];
  newState[action.data.id] = action.data.value;
  return newState;
}