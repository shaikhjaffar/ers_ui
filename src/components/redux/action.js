export const fetch_data_success = (data) => {
    return {
      type: 'FETCH_DATA_SUCCESS',
      payload: data,
    };
  };
  export const fetch_All_data_ = (data) => {
    return {
      type: 'FETCH_All_DATA',
      payload: data,
    };
  };