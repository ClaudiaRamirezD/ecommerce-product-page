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
    const productTitle = document.querySelector(".product__text")?.textContent;
    const zoomModal = document.getElementById("zoom-modal");
    const zoomedImage = document.getElementById("zoomed-image");
    const closeZoomBtn = document.getElementById("close-zoom-modal");
    const thumbnails = document.querySelectorAll(
        ".product__thumbnails .thumbnail"
    );
    const modalThumbnails = document.querySelectorAll(
        ".modal-thumbnails .thumbnail"
    );
    const imageModal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    const closeModal = document.getElementById("close-modal");
    const prevModalBtn = document.getElementById("prev-modal-btn");
    const nextModalBtn = document.getElementById("next-modal-btn");
    const liveRegion = document.getElementById("live-region"); // Make sure this exists in your HTML

    let currentIndex = 0;

    // Open and Close Menu
    menuOpen?.addEventListener("click", () => backdrop?.classList.add("open"));
    menuClose?.addEventListener("click", () =>
        backdrop?.classList.remove("open")
    );

    // Image carousel
    const images = [
        "./images/image-product-1.jpg",
        "./images/image-product-2.jpg",
        "./images/image-product-3.jpg",
        "./images/image-product-4.jpg",
    ];

    function updateImage() {
        if (!itemImg) return;

        if (currentIndex >= 0 && currentIndex < images.length) {
        itemImg.src = images[currentIndex];
        }

        // Update the progress bar
        progress.value = currentIndex + 1;
        itemImg.style.objectPosition = currentIndex === 0 ? "" : "top";
    }

    prevBtn?.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage();
    });

    nextBtn?.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
    });

    // Thumbnail click event to update main image
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", () => updateMainImage(index));
    });

    // Open zoom modal function
    function openZoomModal() {
        zoomedImage.src = itemImg.src;
        zoomModal?.classList.remove("hidden");
    }

    itemImg?.addEventListener("click", openZoomModal);
    closeZoomBtn?.addEventListener("click", () =>
        zoomModal?.classList.add("hidden")
    );

    modalThumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", () => {
        zoomedImage.src = images[index];
        });
    });

    // Quantity controls
    decreaseBtn?.addEventListener("click", () => {
        const currentValue = parseInt(quantityInput.value);
        quantityInput.value = Math.max(0, currentValue - 1);
    });

    increaseBtn?.addEventListener("click", () => {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    });

    // Add to basket button
    addToBasket?.addEventListener("click", function (e) {
        e.preventDefault();
        const currentValue = parseInt(quantityInput.value);

        if (currentValue > 0) {
        basketCount.textContent = currentValue;
        basketCount.style.display = currentValue > 0 ? "flex" : "none";
        updateCartDisplay();

        // Announce the change in basket count for screen readers
        liveRegion.textContent = `There are ${currentValue} items in your basket.`;
        basketBtn.focus();

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        }
    });

    // Update cart display function
    function updateCartDisplay() {
        const quantity = parseInt(quantityInput.value);
        const pricePerItem = parseFloat(currentPrice.textContent.replace("$", ""));

        if (quantity > 0) {
        cartContent.innerHTML = ""; // Clear previous content
        const totalPrice = (pricePerItem * quantity).toFixed(2);
        const cartItem = document.createElement("div");

        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
                    <img src="./images/image-product-1-thumbnail.jpg" alt="Product thumbnail" class="cart-thumbnail">
                    <div>
                        <p class="cart-description">${productTitle}</p>
                        <p>$${pricePerItem.toFixed(
                        2
                        )} x ${quantity} <strong>$${totalPrice}</strong></p>
                    </div>
                    <img src="./images/icon-delete.svg" alt="Delete item" class="delete-icon">
                `;
        cartContent.appendChild(cartItem);

        const deleteIcon = cartItem.querySelector(".delete-icon");
        deleteIcon.addEventListener("click", () => {
            cartContent.innerHTML = "";
            emptyMessage.classList.remove("hidden");
            basketCount.style.display = "none";
            quantityInput.value = "0";
        });

        const checkoutButton = document.createElement("button");
        checkoutButton.classList.add("checkout-btn");
        checkoutButton.textContent = "Checkout";
        checkoutButton.style.cssText = `
                    background-color: rgb(255, 125, 26);
                    color: rgb(29, 32, 37);
                    font-size: 1.6rem;
                    font-weight: bold;
                    padding: 1.7rem;
                    margin-inline: 2.2rem;
                    margin-bottom: 2.2rem;
                    border: none;
                    border-radius: 7px;
                    cursor: pointer;
                    width: calc(100% - 4.4rem);
                `;
        cartContent.appendChild(checkoutButton);

        checkoutButton.addEventListener("click", () =>
            alert("Proceeding to checkout!")
        );
        } else {
        cartContent.innerHTML = `<p class="empty-message">Your cart is empty.</p>`;
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
