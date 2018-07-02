import { queryTemplateSchema, addTemplateSchema, showTemplateSchema } from '../services/api';

export default {
  namespace: 'templateSchema',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryTemplateSchema, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addTemplateSchema, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *show({ payload }, { call, put }) {
      const response = yield call(showTemplateSchema, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },     
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeTemplateSchema, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
