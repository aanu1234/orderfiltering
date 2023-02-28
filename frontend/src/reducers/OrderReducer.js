import { FETCH_ALL, FILTER_ITEM, RESET_ALL } from "./constants";

export const initalState = {
  orders: [],
  products: [],
  product: null,
  totalOrders: 0,
  totalProducts: 0,
};

const OrderReducer = (state = initalState, action) => {
  switch (action.type) {
    case FETCH_ALL: {
      return {
        ...state,
        products: action.payload.data,
        totalProducts: action.payload.total,
      };
    }
    case RESET_ALL: {
      return initalState;
    }
    case FILTER_ITEM: {
      const searchItems = state.orders.filter((data) =>
        action.payload.includes(data.item)
      );

      const totalProducts = searchItems.length > 0 ? searchItems.length : 0;

      return {
        ...state,
        products: searchItems,
        totalProducts: totalProducts,
      };
    }
    default:
      return state;
  }
};

export default OrderReducer;
