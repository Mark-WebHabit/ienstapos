export const calculateSubtotal = (items) => {
  let subtotal = 0;

  items.forEach((item) => {
    subtotal += item.price * item.quantity;
  });

  return subtotal;
};
export const calculateTax = (cost, tax) => {
  return cost * tax;
};
