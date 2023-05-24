const initialState = {
    items: [],
    totalItems: 0,
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        const newItem = {
          ...action.payload,
          quantity: 1,
        };
        return {
          ...state,
          items: [...state.items, newItem],
          totalItems: state.totalItems + 1,
        };
      case 'INCREASE_QUANTITY':
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item,
            // 
          ),
          totalItems : state.totalItems + 1,
        };
      case 'DECREASE_QUANTITY':
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item,
            // 
          ),
          totalItems : state.totalItems - 1,
        };
      case 'REMOVE_FROM_CART':
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload),
          totalItems: state.totalItems - 1,
        };
      default:
        return state;
    }
    
  };
  
  export default cartReducer;