import Cookies from "js-cookie";

export const totalCost = () => {
    let totalCost = 0;
    let carts = Cookies.get("cartItems")?JSON.parse(Cookies.get("cartItems")):[];
    carts?.forEach((item) => {
      totalCost += item.quantity * item.price;
    });
    return totalCost;
  };