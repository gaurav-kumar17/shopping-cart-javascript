let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");
let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((z, y) => z + y, 0);
  // cartIcon.innerHTML=basket.item;
};
calculation();

let generateCartItem = () => {
  if (basket.length != 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return `
        <div class="cart-item">
            <img width="100" src="${search.img}" alt="">
            <div class="details">
                <div class="title-price-x">
                    <h4 class="title-price">
                        <p>${search.name}</p>
                        <p class="cart-item-price">$ ${search.price}</p>
                    </h4>
                    <i onclick="removeItem(${id})" class="fa-solid fa-x"></i>
                </div>

                <div class="buttons">
                        <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
                </div>
                <h3>$ ${item*search.price}</h3>
            </div>

        </div>
        
        `;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
        <button class="HomeBtn">Back to Home</button>
        </a>
        `;
  }
};
generateCartItem();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
  
    if (search === undefined) {
      basket.push({ id: selectedItem.id, item: 1 });
    } else {
      search.item += 1;
    }
    // console.log(basket);
    generateCartItem();
    update(selectedItem.id);
    localStorage.setItem("data",JSON.stringify(basket));
  };
  
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
  
    if(search===undefined) // incase basket not found anything it will return "undefinded"
    return;
    else if (search.item === 0) {
      return;
    } else {
      search.item -= 1;
    }
    // console.log(basket);
    
    update(selectedItem.id); // update() will come before basket
    basket=basket.filter((x)=>x.item!==0)
    generateCartItem();
    localStorage.setItem("data",JSON.stringify(basket));
  };

let update = (id) => {
    let search=basket.find((x)=> x.id===id)
    // console.log(search);
    document.getElementById(id).innerHTML=search.item;
    calculation();
    totalAmount();
};  

let removeItem =(id)=>{
    let selectedItem=id;
    basket=basket.filter((x)=> x.id!=selectedItem.id)
    generateCartItem();
    totalAmount();
    calculation();
    localStorage.setItem("data",JSON.stringify(basket));
}

let clearCart=()=>{
    basket=[];
    generateCartItem();
    calculation();
    localStorage.setItem("data",JSON.stringify(basket));
}

let checkout=()=>{

  alert("You have successfully placed your order.");
  // totalAmount();
  clearCart();
}
let totalAmount=()=>{

    if(basket.length!=0)
    {
        let amount=basket.map((x)=>{

            let {item ,id}=x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item*search.price;
        }).reduce((x,y)=> x+y,0);
        // console.log(amount);
        label.innerHTML=`
            <h2>Total Bill : $ ${amount}</h2>
            <button onclick="checkout()" class="checkout">Checkout</button>
            <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        `;
    }
    else{
        return;
    }
}
totalAmount();