const createCashCounter = () => {
  let cashBox = [
    { 5000: 10 },
    { 2000: 10 },
    { 1000: 10 },
    { 500: 25 },
    { 200: 25 },
    { 100: 25 },
    { 50: 25 },
    { 20: 25 },
    { 10: 25 },
    { 5: 25 },
    { 2: 25 },
    { 1: 25 },
  ];

  // Calculate Cashbox Total before any transactions:
  const cashBoxNet = () => {
    return cashBox.reduce((acc, curr, i) => {
      for (const amount in curr) {
        acc += amount * curr[amount];
    }
      return acc;
    }, 0);
  };

  // returning the function for calculating the most efficient change
  return (price, paid) => {
    console.log("---TRANSACTION START---");
    console.log(
      "Cashbox total before transactions in € =",
      (cashBoxNet() / 100).toFixed(2)
    );
    console.log("This is the price in €:", (price / 100).toFixed(2));
    console.log(
      "This is what the customer paid in €:",
      (paid / 100).toFixed(2)
    );
    // calculate how much money to give back
    let change = paid - price;
    // if price is equal to paid, no change needed
    if (paid === price) {
      return `You payed appropriately, thanks man!`;
      // if price is higher than paid, request more money
    } else if (paid < price) {
      return `Your payment is ${((price - paid) / 100).toFixed(2)}€ short.`;
      // if paid is higher than price, add paid to cashbox and give adequate change
    } else if (change > cashBoxNet()) {
      return "Not enough change, sorry."
    } else if (paid > price) {
      // ! Adding paid to cashBox
  
      cashBox.forEach((value) => {
        for (const amount in value) {
          while (paid >= amount) {
            paid -= amount;
            value[amount]++;
          }
        }
      });
      // !
      // ! Subtracting always highest banknote from change until change is 0 and remove those banknotes from cashbox
      console.log("This is the Change in €:", (change / 100).toFixed(2));
      const changeArr = [];
      cashBox.forEach((value) => {
        for (const amount in value) {
          while (change >= amount && value[amount] > 0) {
            change -= amount;
            value[amount]--;
            changeArr.push(amount);
          }
        }
      });
      console.log("The most efficient way to hand out the change:", changeArr);
      }
    console.log("Updated Cashbox after transaction:");
    return cashBox;
  };
};

const cashCounter = createCashCounter();

console.log(cashCounter(3250, 5000));
console.log(cashCounter(3250, 5000));
console.log(cashCounter(3250, 5000));
console.log(cashCounter(3250, 5000));
console.log(cashCounter(3250, 5000));
console.log(cashCounter(3250, 5000));
console.log(cashCounter(3250, 5000));
console.log(cashCounter(3250, 5000));
console.log(cashCounter(3250, 5000));
console.log(cashCounter(3250, 5000));
console.log(cashCounter(3250, 5000));
console.log(cashCounter(3250, 5000));
console.log(cashCounter(3250, 5000));
console.log(cashCounter(3250, 5000));
console.log(cashCounter(3250, 5000));
console.log(cashCounter(3250, 5000));
console.log(cashCounter(3250, 5000));
console.log(cashCounter(3250, 5000));
