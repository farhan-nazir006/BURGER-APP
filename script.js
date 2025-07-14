// DOM Elements
const cartBtn = document.querySelectorAll(".add_btn");
const allCards = document.querySelectorAll(".Add_Cart");
const orderContainer = document.querySelector(".Container");
const subTotal = document.getElementsByClassName('sub_total_price');
const tax = document.getElementsByClassName('tax_price');
const total = document.getElementsByClassName('total_Price');
const payBtn = document.querySelector('.paybutton');

// Load existing names or start fresh
let localBurgerNames = JSON.parse(localStorage.getItem("burgername")) || [];

let subTotalPrice = 0;
let taxPrice = 0;
let totalPrice = 0;

// Function to add one order item
function createOrderItem(burgerName, burgerPrice, burgerImage) {
  let orderItem = document.createElement('div');
  orderItem.classList.add("order-item");
  orderItem.innerHTML = `
    <div class="w-full bg-white rounded-xl h-25 flex items-center justify-between p-3 mb-3">
      <div class="flex items-center gap-3">
        <img class="w-24 h-20 object-cover rounded-md" src="${burgerImage}" alt="">
        <div>
          <h4 class="text-black font-medium">${burgerName}</h4>
          <p class="burgerPrice text-sm text-gray-600">${burgerPrice}</p>
        </div>
      </div>
      <i class="delete_btn text-3xl text-red-500 cursor-pointer fa-solid fa-delete-left"></i>
    </div>`;

  orderContainer.appendChild(orderItem);

  // Price Calculation
  let price = parseFloat(burgerPrice.replace("$", ""));
  subTotalPrice += price;
  taxPrice = subTotalPrice * 0.1;
  totalPrice = subTotalPrice + taxPrice;

  subTotal[0].innerHTML = `$${subTotalPrice.toFixed(2)}`;
  tax[0].innerHTML = `$${taxPrice.toFixed(2)}`;
  total[0].innerHTML = `$${totalPrice.toFixed(2)}`;
}


// Add Order on Click
cartBtn.forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".Add_Cart");
    const burgerName = card.querySelector(".name").innerHTML;
    const burgerImage = card.querySelector(".image").src;
    const burgerPrice = card.querySelector(".price").innerHTML;

    // Check if burger already exists in localStorage to prevent duplicates
    if (!localBurgerNames.includes(burgerName)) {
      localBurgerNames.push(burgerName);
      localStorage.setItem("burgername", JSON.stringify(localBurgerNames));
      createOrderItem(burgerName, burgerPrice, burgerImage);
    }
  });
});


// Delete Order
orderContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains('delete_btn')) {
    const orderCard = e.target.closest('.order-item');
    const name = orderCard.querySelector("h4").innerText;
    const price = parseFloat(orderCard.querySelector('.burgerPrice').innerText.replace("$", ""));

    // Remove from DOM
    orderCard.remove();

    // Update prices
    subTotalPrice -= price;
    taxPrice = subTotalPrice * 0.1;
    totalPrice = subTotalPrice + taxPrice;

    subTotal[0].innerHTML = `$${subTotalPrice.toFixed(2)}`;
    tax[0].innerHTML = `$${taxPrice.toFixed(2)}`;
    total[0].innerHTML = `$${totalPrice.toFixed(2)}`;

    // Remove from localStorage
    localBurgerNames = localBurgerNames.filter(item => item !== name);
    localStorage.setItem("burgername", JSON.stringify(localBurgerNames));
  }
});


// Pay Button Function
payBtn.addEventListener("click", () => {
  const hasOrders = orderContainer.querySelectorAll('.order-item').length > 0;
  if (hasOrders) {
    alert("ALL ORDER'S COMPLETED");

    subTotalPrice = 0;
    taxPrice = 0;
    totalPrice = 0;

    subTotal[0].innerHTML = "$0";
    tax[0].innerHTML = "$0";
    total[0].innerHTML = "$0";

    orderContainer.innerHTML = "";
    localBurgerNames = [];
    localStorage.removeItem("burgername");
  } else {
    alert("THERE IS NO ORDER IN QUEUE");
  }
});


// Restore Orders on Refresh
function restoreOrders() {
  localBurgerNames.forEach(name => {
    allCards.forEach(card => {
      const burgerName = card.querySelector(".name").innerHTML;
      if (burgerName === name) {
        const burgerImage = card.querySelector(".image").src;
        const burgerPrice = card.querySelector(".price").innerHTML;
        createOrderItem(burgerName, burgerPrice, burgerImage);
      }
    });
  });
}

// Run restore on page load
restoreOrders();
