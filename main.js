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
    const thumbnails = document.querySelectorAll(
    ".product__thumbnails-main .thumbnail");
    const modalThumbnails = document.querySelectorAll(
    ".product__thumbnails-modal .thumbnail");
    const zoomModal = document.querySelector("#zoom-modal");
    const zoomedImage = document.querySelector("#zoomed-image");
    const closeZoomModal = document.querySelector("#close-zoom-modal");
    const desktopBreakpoint = 768;
    const zoomedPrevBtn = document.querySelector("#prev-btn-desktop");
    const zoomedNextBtn = document.querySelector("#next-btn-desktop");

    console.log("zoomModal:", zoomModal);
    console.log("zoomedImage:", zoomedImage);

    let currentIndex = 0;

    // Open and Close Menu
    menuOpen.addEventListener("click", () => backdrop.classList.add("open"));
    menuClose.addEventListener("click", () => backdrop.classList.remove("open"));

    // Image carousel
    const images = [
        "./images/image-product-1.jpg",
        "./images/image-product-2.jpg",
        "./images/image-product-3.jpg",
        "./images/image-product-4.jpg"
    ];

    // Ensure index is within valid range
    function getValidIndex(index) {
        return (index + images.length) % images.length; // Ensure the index stays within 0-3
    }

    // Update image and progress
    function updateImage(index) {
        if (index < 0 || index >= images.length) {
            console.error("Index out of bounds:", index);
            return;
        }
        itemImg.src = images[index];
        progress.value = index + 1;
        itemImg.style.objectPosition = currentIndex === 0 ? "" : "top";
    }

    // Image carousel thumbnail click event (combined for both main and modal thumbnails)
    function handleThumbnailClick(thumbnail, index) {
        thumbnail.addEventListener("click", () => {
            currentIndex = getValidIndex(index);
            updateImage(currentIndex);
            const radioButton = document.querySelector(`#image-product-${currentIndex + 1}`);
            if (radioButton) {
                radioButton.checked = true;
            }
        });
    }

    // Attach click listeners for thumbnails in both modal and main views
    thumbnails.forEach((thumbnail, index) => handleThumbnailClick(thumbnail, index));
    modalThumbnails.forEach((thumbnail, index) => handleThumbnailClick(thumbnail, index));

    // Initialize first image
    updateImage(currentIndex);

    // Function to open zoom modal on desktop only
    itemImg.addEventListener("click", () => {
    console.log("Image clicked");
    console.log("Current window width:", window.innerWidth);

    if (window.innerWidth >= desktopBreakpoint) {
        console.log("Desktop size detected, opening zoom modal");

        zoomedImage.src = images[currentIndex];
        
        // Remove the "hidden" class and adjust other styles for visibility
        zoomModal.classList.remove("hidden");
        zoomModal.style.left = "0"; // Adjust left position if it was previously set off-screen
        zoomModal.style.opacity = "1"; // Set opacity to fully visible
        zoomModal.style.display = "flex"; // Make sure display is set to block or flex

        // Show thumbnails in the modal (just in case they are hidden by default)
        const thumbnails = document.querySelectorAll('.modal-thumbnails .thumbnail');
        const modalThumbnailsContainer = document.querySelector('.modal-thumbnails');
        
        // Ensure the thumbnails are visible (set the display to flex or block)
        modalThumbnailsContainer.style.display = "flex"; // or "block"
        
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                zoomedImage.src = images[index]; // Change the zoomed image to the clicked thumbnail's image
                currentIndex = index; // Update the current index
            });
        });

        // Verify the modal's visibility state
        console.log("zoomModal classList after removing 'hidden':", zoomModal.classList);
    } else {
        console.log("Mobile size detected, modal will not open");
    }
    });




    // Close zoom modal on all screen sizes
    closeZoomModal.addEventListener("click", () => {
        console.log("Close button clicked");
        zoomModal.classList.add("hidden");
    });

    // Optional: Adjust the behavior on window resize
    window.addEventListener("resize", () => {
        console.log("Window resized, new width:", window.innerWidth); // Log the new window width on resize
        if (zoomModal.classList.contains("hidden") === false && window.innerWidth < desktopBreakpoint) {
            console.log("Switching to mobile, closing zoom modal"); // Log if modal closes on resize to mobile
            zoomModal.classList.add("hidden");
        }
    });

    // Event listeners for carousel navigation buttons
    prevBtn.addEventListener("click", () => {
        currentIndex = getValidIndex(currentIndex - 1);
        updateImage(currentIndex);
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = getValidIndex(currentIndex + 1);
        updateImage(currentIndex);
    });

    // Event listeners for zoomed navigation buttons
    zoomedPrevBtn.addEventListener("click", () => {
        currentIndex = getValidIndex(currentIndex - 1);
        zoomedImage.src = images[currentIndex];
    });

    zoomedNextBtn.addEventListener("click", () => {
        currentIndex = getValidIndex(currentIndex + 1);
        zoomedImage.src = images[currentIndex];
    });

    // Handle click events on radio buttons (thumbnails) to change zoomed image
    const zoomThumbnails = document.querySelectorAll('.product__thumbnails-zoomed input[type="radio"]');

    zoomThumbnails.forEach((radioButton, index) => {
            radioButton.addEventListener("change", () => {
                if (radioButton.checked) {
                    zoomedImage.src = images[index]; // Change the zoomed image to the selected thumbnail's image
                    currentIndex = index; // Update the current index
                }
            });
    });
    
    // Set the initial checked state of the radio buttons based on the current image
    const currentRadioButton = document.querySelector(`#zoomed-image-product-${currentIndex + 1}`);
    if (currentRadioButton) {
            currentRadioButton.checked = true;
    }
    
    // Verify the modal's visibility state
    console.log("zoomModal classList after removing 'hidden':", zoomModal.classList);



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

    addToBasket.addEventListener("click", (e) => {
        e.preventDefault();
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 0) {
            basketCount.textContent = currentValue;
            basketCount.style.display = "flex";
            updateCartDisplay();

            const liveRegion = document.getElementById("live-region");
            liveRegion.textContent = `There are ${currentValue} items in your basket.`;
            basketBtn.focus();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    });

    basketBtn.addEventListener("click", () => {
        cartModal.classList.toggle("hidden");
        updateCartDisplay();
    });

    function updateCartDisplay() {
        const quantity = parseInt(quantityInput.value);
        const pricePerItem = parseFloat(currentPrice.textContent.replace("$", ""));
        cartContent.innerHTML = `<p class="empty-message">Your cart is empty.</p>`;

        if (quantity > 0) {
            emptyMessage.classList.add("hidden");
            const totalPrice = (pricePerItem * quantity).toFixed(2);
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
            checkoutButton.style = `
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

            checkoutButton.addEventListener("click", () => {
                alert("Proceeding to checkout!");
            });
        } else {
            emptyMessage.classList.remove("hidden");
        }
    }

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
