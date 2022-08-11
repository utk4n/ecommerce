export const actionType = {
    SET_USER: 'SET_USER',
    SET_PRODUCT_ITEMS: 'SET_PRODUCT_ITEMS',
    SET_CART_SHOW: 'SET_CART_SHOW',
    SET_CART_ITEMS: 'SET_CART_ITEMS'
}

const reducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case actionType.SET_USER:
            return {
                ...state,
                user: action.user
            }
        case actionType.SET_PRODUCT_ITEMS:
            return {
                ...state, 
                productItems: action.productItems
            }
        case actionType.SET_CART_SHOW:
            return {
                ...state,
                cartShow: action.cartShow
            }
        case actionType.SET_CART_ITEMS:
            return {
                ...state,
                cartItems: action.cartItems
            }
        default: return state;
    }
}

export default reducer;