import { queryPlan, addPlan, showPlan } from '../services/api';

export default {
  namespace: 'plan',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryPlan, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addPlan, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *show({ payload }, { call, put }) {
      const response = yield call(showPlan, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removePlan, payload);
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
