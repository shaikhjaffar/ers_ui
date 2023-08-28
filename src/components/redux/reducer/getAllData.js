const initialState = {
    data: {},
    loading: false,
    error: null,
  };

  export const DataReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_All_DATA':
        return { ...state, data: action.payload, loading: false };
      default:
        return state;
    }
  };