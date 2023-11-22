paypal.Buttons({
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: '10.00' 
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        // Shows loading indicator
        document.getElementById('loading-container').style.display = 'block';

        return actions.order.capture().then(function(details) {
            // Hides loading indicator
            document.getElementById('loading-container').style.display = 'none';

            // Handles the payment success
            handlePaymentSuccess(details);
        });
    },
    onError: function(err) {
        // Hide loading indicator
        document.getElementById('loading-container').style.display = 'none';

        // Display an error message
        document.getElementById('error-container').innerText = 'Error processing payment. Please try again.';
        document.getElementById('error-container').style.display = 'block';

        // Log the error for debugging
        console.error(err);
    }
}).render('#paypal-button-container');

// Add a click event listener to the "Purchase Now" button
document.getElementById('trigger-payment').addEventListener('click', function() {
    // Trigger the PayPal payment process using the existing instance
    paypal.Buttons().render();
});
