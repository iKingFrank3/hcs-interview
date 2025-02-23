function fetchData() {
    const selectedDate = document.getElementById('datePicker').value;
    const tableBody = document.getElementById('exportTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    // Mock data based on the selected date
    const mockData = [
        { sku: 'SKU123', quantity: 10, dateAdded: selectedDate, location: 'Warehouse A' },
        { sku: 'SKU456', quantity: 5, dateAdded: selectedDate, location: 'Warehouse B' },
        { sku: 'SKU789', quantity: 20, dateAdded: selectedDate, location: 'Warehouse C' }
    ];

    // Populate the table with mock data
    mockData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.sku}</td>
            <td>${item.quantity}</td>
            <td>${item.dateAdded}</td>
            <td>${item.location}</td>
        `;
        tableBody.appendChild(row);
    });
}