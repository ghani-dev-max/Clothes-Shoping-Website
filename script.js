const products = [
  {
    name: 'Classic T-Shirt',
    price: 15,
    category: 'T-Shirt',
    image: 'tshirt1.jpg'  
  },
  {
    name: 'Winter Hoodie',
    price: 29.99,
    category: 'Hoodie',
    image: 'hoodie1.jpg'
  },
  {
    name: 'Denim Jeans',
    price: 35,
    category: 'Jeans',
    image: 'jeans1.jpg'
  }
];



function renderProducts(list) {
  const container = document.getElementById("productList");
  container.innerHTML = "";
  list.forEach(p => {
    container.innerHTML += `
      <div class="product">
        <img src="${p.image}" alt="${p.name}" />
        <h3>${p.name}</h3>
        <p>$${p.price}</p>
        <a href="product.html?name=${encodeURIComponent(p.name)}">View Details</a>
        <button onclick="addToCart('${p.name}', ${p.price})">Add to Cart</button>
      </div>
    `;
  });
}

function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartSummary();
}

function updateCartSummary() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = 0, total = 0;
  cart.forEach(item => {
    count += item.quantity;
    total += item.price * item.quantity;
  });
  document.getElementById("cart-count").textContent = count;
  document.getElementById("cart-total").textContent = total.toFixed(2);
}

function filterByCategory() {
  const cat = document.getElementById("categoryFilter").value;
  const filtered = cat === "all" ? products : products.filter(p => p.category === cat);
  renderProducts(filtered);
}

document.getElementById("searchBar").addEventListener("input", e => {
  const keyword = e.target.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));
  renderProducts(filtered);
});

window.onload = () => {
  renderProducts(products);
  updateCartSummary();
};
