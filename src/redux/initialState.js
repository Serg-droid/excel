import {storage} from "@core/utils";
import {defaultStyles, defaultTitle} from "@/constants";

function defaultState() {
  return {
    title: defaultTitle,
    colState: {},
    rowState: {},
    dataState: {},
    stylesState: {},
    currentStyles: defaultStyles || {},
    currentText: '',
  }
}

export function initialState() {
  return storage('excel-state') || defaultState();
}