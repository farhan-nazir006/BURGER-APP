//DOM
let allCards = document.querySelectorAll(".Add_Cart");
let cartBtn = document.querySelectorAll(".add_btn");
let orderContainer = document.querySelector(".Container");
let subTotal = document.getElementsByClassName('sub_total_price');
let tax = document.getElementsByClassName('tax_price');
let total = document.getElementsByClassName('total_Price');
let payBtn = document.querySelector('.paybutton');



// Getting Values from HtmlCollection
let subTotalPrice = parseFloat(subTotal[0].innerHTML.replace("$", ""));
let taxPrice = parseFloat(tax[0].innerHTML.replace("$", ""));
let totalPrice = parseFloat(total[0].innerHTML.replace("$", ""));

// Listener for adding order items
function addOrder() {
  cartBtn.forEach(btn => {

    btn.addEventListener("click", (e) => {
      let card = btn.closest(".Add_Cart");
      let burgerName = card.querySelector(".name").innerHTML;
      let burgerImage = card.querySelector(".image").src;
      let burgerPrice = card.querySelector(".price").innerHTML;

      let orderItem = document.createElement('div');
      orderItem.innerHTML = `<div class="order-item w-full bg-white rounded-xl h-25 flex items-center justify-between p-3 mb-3">
          <div class="flex items-center gap-3">
            <img class="w-24 h-20 object-cover rounded-md" src="${burgerImage}" alt="">
            <div>
              <h4 class="text-black font-medium">${burgerName}</h4>
              <p class="burgerPrice text-sm text-gray-600">${burgerPrice}</p>
            </div>
          </div>
          <i class="delete_btn text-3xl text-red-500 cursor-pointer fa-solid fa-delete-left"></i>
        </div>`

      orderContainer.appendChild(orderItem);

      // Adding prices
      let bPrice = parseFloat(burgerPrice.replace("$", ""));

      // Seperating number value
      subTotalPrice += bPrice;
      taxPrice = subTotalPrice * 0.1;
      totalPrice = subTotalPrice + taxPrice;

      subTotal[0].innerHTML = `$${subTotalPrice}`;
      tax[0].innerHTML = `$${taxPrice}`;
      total[0].innerHTML = `$${totalPrice}`;
    })
  })
}

function deleteOrder() {
  // Event Listener for deleting order items
  orderContainer.addEventListener("click", (e) => {

    if ((e.target.classList.contains('delete_btn'))) {     // .contains() return true or false 
      const orderCard = e.target.closest('.order-item');

      let orderPrice = orderCard.querySelector('.burgerPrice').innerHTML;
      let orderCardPrice = parseFloat(orderPrice.replace("$", ""));
      if (orderCard) {
        orderCard.remove();

        subTotalPrice -= orderCardPrice;
        taxPrice = subTotalPrice * 0.1;
        totalPrice = subTotalPrice + taxPrice;

        subTotal[0].innerHTML = `$${subTotalPrice}`;
        tax[0].innerHTML = `$${taxPrice}`;
        total[0].innerHTML = `$${totalPrice}`;
      }
    }
  })
}

function payAmount() {
  payBtn.addEventListener("click", () => {
    const hasOrders = orderContainer.querySelectorAll('.order-item').length > 0;
    if (hasOrders) {
      alert("ALL ORER'S COMPLETED ")
      subTotal[0].innerHTML = `$0`;
      tax[0].innerHTML = `$0`;
      total[0].innerHTML = `$0`;
      orderContainer.innerHTML = ' ';
    } else {
      alert("THERE IS NO ORDER IN QUEUE");
    }

  })
}


addOrder();
deleteOrder();
payAmount();








