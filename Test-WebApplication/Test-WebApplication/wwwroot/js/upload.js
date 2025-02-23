window.onload = function() {
    const skuInput = document.getElementById('skuInput');
    if (skuInput) {
        skuInput.focus();
    }
};

function saveTableData(location) {
    const tableBody = document.querySelector('.item-table tbody');
    const rows = tableBody.getElementsByTagName('tr');
    const data = [];

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        data.push({
            sku: cells[0].textContent,
            quantity: cells[1].textContent,
            dateAdded: cells[2].textContent
        });
    }

    localStorage.setItem(`tableData_${location}`, JSON.stringify(data));
}

function loadTableData(location) {
    const tableBody = document.querySelector('.item-table tbody');
    tableBody.innerHTML = ''; // Clear existing table data

    const data = JSON.parse(localStorage.getItem(`tableData_${location}`)) || [];
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.sku}</td><td>${item.quantity}</td><td>${item.dateAdded}</td>`;
        tableBody.appendChild(row);
    });
}

function handleLocationInput(event) {
    const input = event.target.value;
    const storeButton = document.getElementById('storeButton');

    if (input.length > 4) {
        storeButton.textContent = 'Store Code';
    } else {
        storeButton.textContent = 'Invalid Code';
    }
}

let isValidLocationStored = false; // Flag to track valid location

function storeLocation() {
    const locationInput = document.getElementById('locationInput');
    const input = locationInput.value.trim();

    if (input.length > 4) {
        const formData = new FormData(document.getElementById('locationForm'));

        isValidLocationStored = true;

        console.log('Location stored:', input);
        locationInput.readOnly = true;
        document.getElementById('storeButton').textContent = 'Successfully Stored';
        document.getElementById('storeButton').style.backgroundColor = 'white';
        document.getElementById('storeButton').style.color = '#800000';
        document.getElementById('storeButton').disabled = true;
        document.getElementById('editClearButton').textContent = 'Edit';

        // Load mock SKUs for the stored location
        loadMockSKUs();
    } else {
        console.log("Invalid location code entered.");
        isValidLocationStored = false;
    }
}

function editOrClear() {
    const locationInput = document.getElementById('locationInput');
    locationInput.value = '';
    locationInput.readOnly = false;
    locationInput.focus();

    const storeButton = document.getElementById('storeButton');
    storeButton.textContent = 'Store Code';
    storeButton.style.backgroundColor = '';
    storeButton.style.color = '';
    storeButton.disabled = false;

    document.getElementById('editClearButton').textContent = 'Clear';

    // Clear the item table
    const tableBody = document.querySelector('.item-table tbody');
    tableBody.innerHTML = ''; // Clear existing table rows

    document.getElementById('scannedItemBox').style.display = 'none';
    document.getElementById('itemOutBox').style.display = 'none';

    isValidLocationStored = false;
}

function loadMockSKUs() {
    const tableBody = document.querySelector('.item-table tbody');
    tableBody.innerHTML = ''; // Clear existing table data

    // Mock data for SKUs
    const mockData = [
        { sku: 'SKU12345', quantity: 10, dateAdded: new Date().toLocaleDateString() },
        { sku: 'SKU67890', quantity: 5, dateAdded: new Date().toLocaleDateString() },
        { sku: 'SKU54321', quantity: 20, dateAdded: new Date().toLocaleDateString() }
    ];

    mockData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.sku}</td><td>${item.quantity}</td><td>${item.dateAdded}</td>`;
        tableBody.appendChild(row);
    });
}

function handleSKUInput(event) {
    const input = event.target.value;
    const skuInMessage = document.getElementById('skuInMessage');

    if (input.length >= 8) {
        console.log("Valid SKU entered:", input);
        skuInMessage.style.display = 'none'; // Hide the message if valid
        addItemToTable(input); // Add the SKU to the item table
        // Optionally, clear the input field after adding
        document.getElementById('skuInput').value = '';
    } else if (input.length < 8 && input.length > 1) {
        console.log("Invalid SKU. Must be exactly 8 characters.");
        skuInMessage.textContent = "Invalid SKU. Must be exactly 8 characters.";
        skuInMessage.style.display = 'block'; // Show the message
    } else {
        skuInMessage.style.display = 'none'; // Hide the message if input is less than 8 characters
    }
}

function showScannedItemBox() {
    if (isValidLocationStored) { // Check if a valid location is stored
        const scannedItemBox = document.getElementById('scannedItemBox');
        scannedItemBox.style.display = 'block';
        document.getElementById('itemOutBox').style.display = 'none';

        const skuInput = document.getElementById('skuInput');
        if (skuInput) {
            skuInput.focus();
        } else {
            console.error("Element with ID 'skuInput' not found.");
        }
    } else {
        console.warn("Cannot show scannedItemBox: No valid location stored.");
    }
}

function showItemOutBox() {
    if (isValidLocationStored) { // Check if a valid location is stored
        const itemOutBox = document.getElementById('itemOutBox');
        itemOutBox.style.display = 'block';
        document.getElementById('scannedItemBox').style.display = 'none';

        const skuOutInput = document.getElementById('skuOutInput');
        if (skuOutInput) {
            skuOutInput.focus();
        } else {
            console.error("Element with ID 'skuOutInput' not found.");
        }
    } else {
        console.warn("Cannot show itemOutBox: No valid location stored.");
    }
}

let lastScannedSKUOut = null; // Variable to store the last scanned SKU out

function handleSKUOutInput(event) {
    const input = event.target.value;
    const skuOutMessage = document.getElementById('skuOutMessage');

    if (input.length === 8) {
        console.log("Valid SKU entered:", input);
        skuOutMessage.style.display = 'none'; // Hide the message if valid
        lastScannedSKUOut = input; // Store the last scanned SKU
        removeItemFromTable(input); // Remove the SKU from the item table
        document.getElementById('skuOutInput').value = ''; // Clear input field
    } else if (input.length > 8) {
        console.log("Invalid SKU. Must be exactly 8 characters.");
        skuOutMessage.textContent = "Invalid SKU. Must be exactly 8 characters.";
        skuOutMessage.style.display = 'block'; // Show the message
    } else {
        skuOutMessage.style.display = 'none'; // Hide the message if input is less than 8 characters
    }
}

function addItemToTable(sku) {
    const tableBody = document.querySelector('.item-table tbody');
    const existingRow = Array.from(tableBody.rows).find(row => row.cells[0].textContent === sku);

    if (existingRow) {
        // If the SKU already exists, increment the quantity
        const quantityCell = existingRow.cells[1];
        quantityCell.textContent = parseInt(quantityCell.textContent, 10) + 1;
    } else {
        // If the SKU does not exist, create a new row
        const row = document.createElement('tr');
        row.innerHTML = `<td>${sku}</td><td>1</td><td>${new Date().toLocaleDateString()}</td>`;
        tableBody.appendChild(row);
    }
}

function removeItemFromTable(sku) {
    const tableBody = document.querySelector('.item-table tbody');
    const existingRow = Array.from(tableBody.rows).find(row => row.cells[0].textContent === sku);

    if (existingRow) {
        const quantityCell = existingRow.cells[1];
        let quantity = parseInt(quantityCell.textContent, 10);

        if (quantity > 1) {
            // Decrement the quantity if more than 1
            quantityCell.textContent = quantity - 1;
        } else {
            // Remove the row if quantity is 1
            tableBody.removeChild(existingRow);
        }
    } else {
        console.log("SKU not found in the table.");
    }
}

function addLastScanned() {
    if (lastScannedSKUOut) {
        addItemToTable(lastScannedSKUOut); // Add the last scanned SKU back to the table
        lastScannedSKUOut = null; // Clear the last scanned SKU after adding
    } else {
        console.log("No last scanned SKU to add.");
    }
}

function removeLastScanned() {
    if (lastScannedSKUOut) {
        removeItemFromTable(lastScannedSKUOut); // Remove the last scanned SKU from the table
        lastScannedSKUOut = null; // Clear the last scanned SKU after removing
    } else {
        console.log("No last scanned SKU to remove.");
    }
}
