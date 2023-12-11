function submitForm(button) {
  // Prevent the default form submission
  button.preventDefault();

  // Get form data
  const formData = new FormData(document.getElementById('order-form'));

  // Convert FormData to a plain JavaScript object
  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });

  console.log('Form Data:', formDataObject);

  // Make a POST request to the /customers endpoint
  fetch('https://quaint-bikini-calf.cyclic.app/customers', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataObject),
  })
  .then(response => response.json())
  .then(data => {
      console.log('Customer created:', data);
window.location.href = 'order.html'
      // Handle success as needed
  })
  .catch(error => {
      console.error('Error creating customer:', error);
      // Handle errors
  });
}





// GET Data for History
document.addEventListener("DOMContentLoaded", function() {
  // Fetch data from the /all endpoint when the page loads
  fetch("https://quaint-bikini-calf.cyclic.app/all")
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Display the customer data in the container
        console.log(data)
        displayCustomerData(data.data);
      } else {
        console.error("Error fetching customer data:", data.error);
      }
    })
    .catch(error => console.error("Error fetching customer data:", error));

  // Function to display customer data
  function displayCustomerData(customers) {
    const container = document.querySelector(".order-box");
    

    // Check if the container element exists
    if (!container) {
      console.error("Container element not found.");
      return;
    }
    
    // Clear existing content
    container.innerHTML = "";
    
    // Iterate through each customer and display relevant information
    customers.forEach(customer => {

      const checkInDate = new Date(customer.check_in).toLocaleDateString();
      const checkOutDate = new Date(customer.check_out).toLocaleDateString();

      const customerElement = document.createElement("div");
      customerElement.innerHTML = `
        <p class="customer-info">ID: ${customer.id}</p>
        <p class="customer-info">Name: ${customer.first_name} ${customer.last_name}</p>
        <p class="customer-info">Check-in: ${checkInDate}</p>
        <p class="customer-info">Check-out: ${checkOutDate}</p>
        <hr class="customer-info">
      `;
      // Add a class to the container to style it if needed
      container.classList.add("customer-container");
      container.appendChild(customerElement);
    });
  }
});
