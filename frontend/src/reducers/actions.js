export const fetchData = () => async (dispatch) => {
  setLoading(true);
  try {
    const { data } = await api.getOrders();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
  setLoading(false);
};
