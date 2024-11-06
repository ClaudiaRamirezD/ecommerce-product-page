document.addEventListener("DOMContentLoaded", function () {
    const menuOpen = document.querySelector(".menu-open");
    const backdrop = document.querySelector(".backdrop");
    const menuCLose = document.querySelector(".menu-close");
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

    let itemAdded = false; // Tracks if an item has been added to the cart


    menuOpen.addEventListener("click", () => {
        backdrop.classList.add("open");
    });

    menuCLose.addEventListener("click", () => {
        backdrop.classList.remove("open");
    });

    const images = [
        "./images/image-product-1.jpg",
        "./images/image-product-2.jpg",
        "./images/image-product-3.jpg",
        "./images/image-product-4.jpg",
    ];

    let currentIndex = 0;

    //Update image and progress based on the current index
    function updateImage() {
        itemImg.src = images[currentIndex];
        progress.value = currentIndex + 1;
    }

    //Previous btn click
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length; // Wrap around to last image
        updateImage();
    });

    //Next btn 
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length; // Wrap around to first image
        updateImage();
    });

    //Initialize with the first image
    updateImage();

    //Decrease quantity
    decreaseBtn.addEventListener('click', function () {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue >= 1) {
            quantityInput.value = currentValue - 1
        }
    });

    // Increase quantity
    increaseBtn.addEventListener('click', function () {
        let currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
    });

    // Update basket count when "Add to cart" button is clicked
    addToBasket.addEventListener('click', function (e) {
        e.preventDefault();
        const currentValue = parseInt(quantityInput.value);

        // Update the basket count
        basketCount.textContent = currentValue;
        basketCount.style.display = currentValue > 0 ? 'flex' : 'none';
        console.log('Added to cart');
    });

    // Toggle cart modal visibility
    basketBtn.addEventListener('click', function () {
        cartModal.classList.toggle('hidden');
        updateCartDisplay();
    });

    // Update cart content based on item quantity
    function updateCartDisplay() {
        const quantity = parseInt(quantityInput.value);
        const pricePerItem = parseFloat(currentPrice.textContent.replace('$', ''));

        // Clear previous content
        cartContent.innerHTML = '';

        if (quantity > 0) {
            itemAdded = true;
            emptyMessage.classList.add('hidden');

            // Display the item in the cart
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            // Calculate the total price based on quantity
            const totalPrice = (pricePerItem * quantity).toFixed(2); 

            cartItem.innerHTML = `
            <img src="./images/image-product-1-thumbnail.jpg" alt="Product thumbnail" class="cart-thumbnail">
            <div>
                <p class="cart-description">${productTitle}</p>
                <p>$${pricePerItem.toFixed(2)} x ${quantity}  <strong>$${totalPrice}</strong></p>
            </div>
            <img src="./images/icon-delete.svg" alt="Delete item" class="delete-icon">
        `;

            cartContent.appendChild(cartItem);
            // Select the delete icon and add event listener to remove the item
            const deleteIcon = cartItem.querySelector('.delete-icon');
            deleteIcon.addEventListener("click", function () {
                //Remove item from the cart
                cartContent.innerHTML = '';
                emptyMessage.classList.remove("hidden");
                quantityInput.value = 0;
                basketCount.style.display = "none";
                itemAdded = false;
            });
        
            // Create and append the checkout button
            const checkoutButton = document.createElement('button');
            checkoutButton.classList.add("checkout-btn");
            checkoutButton.textContent = "Checkout";

            // Style the button
            checkoutButton.style.backgroundColor = "rgb(255, 125, 26)";
            checkoutButton.style.color = "rgb(29, 32, 37)";
            checkoutButton.style.fontWeight = "bold";
            checkoutButton.style.padding = "1.7rem";
            checkoutButton.style.marginInline = "2.2rem";
            checkoutButton.style.marginBottom = "2.2rem";
            checkoutButton.style.border = "none";
            checkoutButton.style.borderRadius = "7px";
            checkoutButton.style.cursor = "pointer";
            checkoutButton.style.width = `calc(100% - 4.4rem)`;
            
            cartContent.appendChild(checkoutButton);

            // Optional: Add a click event listener for checkout action
            checkoutButton.addEventListener("click", function () {
            // Redirect to checkout or trigger checkout functionality
            alert("Proceeding to checkout!");
            // Or window.location.href = "/checkout";
            });

    } else {
            itemAdded = false;
            emptyMessage.classList.remove('hidden');
        }
    }


});
