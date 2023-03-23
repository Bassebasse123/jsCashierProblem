const createCashCounter = () => {
  // creating a variable that holds an array of objects with the different banknotes and coins. I used cent values because JS has a hard time dealing with decimal numbers.
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

  // A function to calculate the total amount of money in the cashbox. I use this function in a console.log whenever the cashCounter function is being called
  const cashBoxNet = () => {
    return cashBox.reduce((acc, curr, i) => {
      for (const amount in curr) {
        acc += amount * curr[amount];
      }
      return acc;
    }, 0);
  };

  // returning the actual cashCounter function for calculating the most efficient way of giving back change for a transaction
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
      return `Sorry, but your payment is ${((price - paid) / 100).toFixed(
        2
      )}€ short.`;

      /* if paid is higher than price:
      - simulate the following: 
        1. Create new variables, so that originals dont change during simulation:
        2. Loop over the cashbox
        3. loop over each object
        4. and while the banknote (eg. 50€, 20€) is smaller than the paid amount, ill add the banknote to the cashbox and subtract it from the money paid. If its not, check next banknote and so on... until all of the paid money is in the cashbox.
        This way, the money paid is always paid in the most efficient way. (eg. paid = 50€ will never be paid with [20€, 20€, 10€] but with [50€])
      - then the simulation does the same, but reverse for the change
        1. Loop over cashbox
        2. loop over each object
        3. and while the banknote is smaller than the change, the banknote will be subtracted from the cashbox and at the same time it will be pushed to the changeArr. 
        If its not, check next bank note and so on until all the change has been paid back.
        This way, the change is always given back in the most efficient way. (eg. change = 50€ will never be returned with [20€, 20€, 10€] but with [50€])
      - and finally I decided to check the length of the changeArr to determine if it is worthy of accepting the transaction. If the changeArr.length is higher than 12 (who wants to receive 12 coins for change?? ;) ), the transaction will be declined, otherwise the exact same code will be run again, but this time not as a simulation, but with the real cashBox.
        */
    } else if (paid > price) {
      // ! Simulate adding paid to cashbox and then checking whether there is enough and appropriate change in the cashbox. If not, do not accept the transaction, else do.
      let cashBoxSim = JSON.parse(JSON.stringify(cashBox));
      let changeSim = change;
      let paidSim = paid;
      cashBoxSim.forEach((value) => {
        for (const amount in value) {
          while (paidSim >= amount) {
            paidSim -= amount;
            value[amount]++;
          }
        }
      });

      const changeArrSim = [];
      cashBoxSim.forEach((value) => {
        for (const amount in value) {
          while (changeSim >= amount && value[amount] > 0) {
            changeSim -= amount;
            value[amount]--;
            changeArrSim.push(amount);
          }
        }
      });
      //! Simulation End
      if (changeArrSim.length > 12) {
        return "Sorry mate, I can't give you appropriate change without emptying my coin pockets into your wallet.";
      } else {
        cashBox.forEach((value) => {
          for (const amount in value) {
            while (paid >= amount) {
              paid -= amount;
              // ! Actually adding paid to original cashBox

              value[amount]++;
            }
          }
        });

        console.log("This is the Change in €:", (change / 100).toFixed(2));
        const changeArr = [];
        cashBox.forEach((value) => {
          for (const amount in value) {
            // ! Subtracting always highest banknote from change until change is 0 and remove those banknotes from cashbox
            while (change >= amount && value[amount] > 0) {
              change -= amount;
              value[amount]--;
              //! Pushing the banknotes and coins to the changeArr array, which then holds the total amount of banknotes and coins for the change
              changeArr.push(amount);
            }
          }
        });
        console.log(
          "The most efficient way to hand out the change:",
          changeArr
        );
      }
      console.log("Updated Cashbox after transaction:");
      return cashBox;
    }
  };
};

const cashCounter = createCashCounter();

console.log(cashCounter(3750, 5000));
console.log(cashCounter(2350, 5000));
console.log(cashCounter(2350, 5000));
console.log(cashCounter(2350, 5000));
console.log(cashCounter(2350, 5000));
console.log(cashCounter(2350, 5000));
console.log(cashCounter(2350, 5000));
console.log(cashCounter(2350, 5000));
console.log(cashCounter(2350, 5000));
console.log(cashCounter(2350, 5000));
console.log(cashCounter(2350, 5000));
console.log(cashCounter(2350, 5000));
console.log(cashCounter(2350, 5000));
console.log(cashCounter(2350, 5000));
console.log(cashCounter(2350, 5000));
console.log(cashCounter(2350, 5000));
console.log(cashCounter(2350, 5000));
console.log(cashCounter(2350, 5000));
console.log(cashCounter(2350, 5000));
console.log(cashCounter(5500, 5000));

