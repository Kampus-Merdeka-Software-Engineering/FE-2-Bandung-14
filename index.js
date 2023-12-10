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
        // Handle success as needed
    })
    .catch(error => {
        console.error('Error creating customer:', error);
        // Handle errors
    });
}
