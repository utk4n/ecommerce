const cartInfo = () => {
    const info = localStorage.getItem("cartItems") !== undefined || null ? JSON.parse(localStorage.getItem("cartItems")) : localStorage.clear()
    return info ? cartInfo : []
}
export const initialState = {
    user: localStorage.getItem("user") !== undefined || null ? JSON.parse(localStorage.getItem("user")) : localStorage.clear(),
    productItems: null,
    cartShow: false,
    cartItems: cartInfo()
}