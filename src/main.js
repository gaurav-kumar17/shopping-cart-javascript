let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data"))|| [];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((ele) => {
      let { id, name, price, desc, img } = ele; // array destructuring
      let search=basket.find((x)=>x.id === id) || [];
      return `
    <div id="product-id-${id}" class="item">
        <img width="220" src="${img}" alt="">

        <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
                <h2>$ ${price}</h2>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
                        <div id=${id} class="quantity">${search.item===undefined ? 0:search.item}</div>
                        <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
                    </div>
            </div>
        </div>
    </div> 
`;
    })
    .join(""));
};

generateShop();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({ id: selectedItem.id, item: 1 });
  } else {
    search.item += 1;
  }
  // console.log(basket);
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

  localStorage.setItem("data",JSON.stringify(basket));
};

let update = (id) => {
  let search=basket.find((x)=> x.id===id)
  console.log(search);
  document.getElementById(id).innerHTML=search.item;
  calculation();
};

let calculation=()=>{

  let cartIcon=document.getElementById("cartAmount");
  cartIcon.innerHTML=basket.map((x)=>x.item).reduce((z,y)=>z+y,0);
  // cartIcon.innerHTML=basket.item;
}
calculation();