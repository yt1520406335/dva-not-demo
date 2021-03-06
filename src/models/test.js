import userService from '../services/user'

export default {
  namespace: 'test',
  state: {
    name: 'test11',
    inputValue: '',
    data: [],
  },
  reducers: {
    handleButtonSubmit(state, { name }) {
      return {
        ...state,
        name
      }
    },
    changeInputValue(state, { value }) {
      return {
        ...state,
        inputValue: value,
      }
    },
    getData(state, { data }) {
      return {
        ...state,
        data,
      }
    }
  },
  effects: {
    *fetch({ page = 1, pageSize = 5 }, { call, put, select, takeEvery }) {
      const state = yield select(state => state);
      console.log(state, 'l am state')
      const { data } = yield call(userService.fetch, { page, pageSize })
      yield put({
        type: 'getData',
        data,
      })
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // 返回listen函数 以备unlisten
      return history.listen(({ pathname, query }) => {
        console.log(pathname, query)
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
}
