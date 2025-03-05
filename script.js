class Product {
    constructor(id, name, price, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }
}

class Cart {
    constructor() {
        this.items = [];
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            try {
                this.items = JSON.parse(storedCart);
            } catch (e) {
                console.error("Error parsing cart data:", e);
                localStorage.removeItem("cart");
            }
        }
    }

    addItem(product) {
        const now = new Date();
        const cartItem = { ...product, date: now.toLocaleString() };
        this.items.push(cartItem);
        localStorage.setItem("cart", JSON.stringify(this.items));
        alert("Added to cart");
    }

    removeItem(index) {
        this.items.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(this.items));
        this.displayCart();
    }

    displayCart() {
        const cartContainer = document.querySelector(".cart-items");
        if (!cartContainer) return;

        cartContainer.innerHTML = "";
        this.items.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h3>${item.name}</h3>
                    <p>${item.price}</p>
                    <p>Added on: ${item.date}</p>
                </div>
                <button class="remove" data-index="${index}">Remove</button>
            `;
            cartContainer.appendChild(itemElement);
        });

        document.querySelectorAll(".remove").forEach(button => {
            button.addEventListener("click", (event) => {
                const index = event.target.getAttribute("data-index");
                this.removeItem(index);
            });
        });
    }
}

const cart = new Cart();

document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector(".cart-items")) {
        cart.displayCart();
    }
});

document.querySelectorAll(".product").forEach((productElement, index) => {
    const name = productElement.querySelector(".name").innerText;
    const price = productElement.querySelector(".value").innerText;
    const image = productElement.querySelector("img").src;
    const product = new Product(index, name, price, image);

    productElement.querySelector(".add").addEventListener("click", () => {
        cart.addItem(product);
    });
});
