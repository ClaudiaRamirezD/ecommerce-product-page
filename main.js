document.addEventListener("DOMContentLoaded", function () {
    const menuOpen = document.querySelector(".menu-open");
    const backdrop = document.querySelector(".backdrop");
    const menuClose = document.querySelector(".menu-close");
    const itemImg = document.querySelector("#item-img");
    const prevBtn = document.querySelector("#prev-btn");
    const nextBtn = document.querySelector("#next-btn");
    const progress = document.querySelector("#progress");
    const decreaseBtn = document.querySelector("#decrease-btn");
    const increaseBtn = document.querySelector("#increase-btn");
    const quantityInput = document.querySelector("#number-of-items");
    const addToBasket = document.querySelector("#add-to-basket");
    const basketCount = document.querySelector("#basket-count");
    const basketBtn = document.querySelector("#basket-btn");
    const cartModal = document.querySelector("#cart-modal");
    const cartContent = document.querySelector("#cart-content");
    const emptyMessage = document.querySelector(".empty-message");
    const currentPrice = document.querySelector(".current-price");
    const productTitle = document.querySelector(".product__text").textContent;

    let currentIndex = 0;

    // Open and Close Menu
    menuOpen.addEventListener("click", () => {
        backdrop.classList.add("open");
    });

    menuClose.addEventListener("click", () => {
        backdrop.classList.remove("open");
    });

    // Image carousel
    const images = [
        "./images/image-product-1.jpg",
        "./images/image-product-2.jpg",
        "./images/image-product-3.jpg",
        "./images/image-product-4.jpg"
    ];

    function updateImage() {
        if (!itemImg) {
            console.error("itemImg element not found.");
            return;
        }

        // Update the main image and progress bar
        itemImg.src = images[currentIndex];
        progress.value = currentIndex + 1;

        // Apply object-position only to images after the first
        itemImg.style.objectPosition = currentIndex === 0 ? "" : "top";
    }

    // Event listeners for carousel navigation buttons
    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage();
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
    });

    // Initialize the first image
    updateImage();

    // Quantity controls
    decreaseBtn.addEventListener("click", () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue >= 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    increaseBtn.addEventListener("click", () => {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    });

    // Add to basket button
    addToBasket.addEventListener("click", (e) => {
        e.preventDefault();
        const currentValue = parseInt(quantityInput.value);

        if (currentValue > 0) {
            basketCount.textContent = currentValue;
            basketCount.style.display = "flex";
            updateCartDisplay();

            // Announce the change in basket count for screen readers
            const liveRegion = document.getElementById("live-region");
            liveRegion.textContent = `There are ${currentValue} items in your basket.`;
            basketBtn.focus();

            // Scroll to the top of the page where the cart is located
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    });

    // Toggle cart modal on basket button click
    basketBtn.addEventListener("click", () => {
        cartModal.classList.toggle("hidden");
        updateCartDisplay();
    });

    // Update cart display function
    function updateCartDisplay() {
        const quantity = parseInt(quantityInput.value);
        const pricePerItem = parseFloat(currentPrice.textContent.replace("$", ""));
        
        // Always ensure that the cart-content includes the empty message
        cartContent.innerHTML = `<p class="empty-message">Your cart is empty.</p>`;  // Default state

        if (quantity > 0) {
            emptyMessage.classList.add("hidden"); // Hide empty message
            const totalPrice = (pricePerItem * quantity).toFixed(2);

            // Create a cart item and append it to the cart content
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <img src="./images/image-product-1-thumbnail.jpg" alt="Product thumbnail" class="cart-thumbnail">
                <div>
                    <p class="cart-description">${productTitle}</p>
                    <p>$${pricePerItem.toFixed(2)} x ${quantity} <strong>$${totalPrice}</strong></p>
                </div>
                <img src="./images/icon-delete.svg" alt="Delete item" class="delete-icon">
            `;
            cartContent.innerHTML = "";
            cartContent.appendChild(cartItem);

            // Select the delete icon and add event listener to remove the item
            const deleteIcon = cartItem.querySelector(".delete-icon");
            deleteIcon.addEventListener("click", () => {
                cartContent.innerHTML = ""; // Clear cart content
                emptyMessage.classList.remove("hidden"); // Show empty message again
                basketCount.style.display = "none";
                quantityInput.value = "0";
            });

            // Create and append the checkout button
            const checkoutButton = document.createElement("button");
            checkoutButton.classList.add("checkout-btn");
            checkoutButton.textContent = "Checkout";
            checkoutButton.style.backgroundColor = "rgb(255, 125, 26)";
            checkoutButton.style.color = "rgb(29, 32, 37)";
            checkoutButton.style.fontSize = "1.6rem";
            checkoutButton.style.fontWeight = "bold";
            checkoutButton.style.padding = "1.7rem";
            checkoutButton.style.marginInline = "2.2rem";
            checkoutButton.style.marginBottom = "2.2rem";
            checkoutButton.style.border = "none";
            checkoutButton.style.borderRadius = "7px";
            checkoutButton.style.cursor = "pointer";
            checkoutButton.style.width = "calc(100% - 4.4rem)";
            cartContent.appendChild(checkoutButton);

            checkoutButton.addEventListener("click", () => {
                alert("Proceeding to checkout!");
            });
        } else {
            emptyMessage.classList.remove("hidden"); // Show empty message if no items
        }
    }

    // Close cart modal on click outside or pressing escape
    document.addEventListener("click", (event) => {
        if (!cartModal.contains(event.target) && event.target !== basketBtn) {
            cartModal.classList.add("hidden");
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            cartModal.classList.add("hidden");
        }
    });
});
