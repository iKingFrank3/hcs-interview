function loadFilteredData(dateRange) {
    const params = new URLSearchParams({
        start_date: dateRange[0],
        end_date: dateRange[1] || dateRange[0] // Use the same date if only one is selected
    });

    console.log('Filtering SKUs:', params.toString()); // Log the filter parameters
    
    fetch(`assets/php/get_range.php?${params.toString()}`)
        .then(response => response.json())
        .then(data => {
            // Sort data by 'date_added' field
            data.sort((a, b) => new Date(a.date_added) - new Date(b.date_added));

            const tableBody = document.getElementById('exportTableBody');
            tableBody.innerHTML = ''; // Clear existing table data

            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${item.sku_code}</td><td>${item.quantity}</td><td>${item.date_added}</td><td>${item.location_name}</td>`;
                tableBody.appendChild(row);
            });
            console.log('Filtered SKUs:', data);
            
        })
        .catch(error => console.error('Error fetching filtered SKUs:', error));
}

function exportToSpreadsheet() {
    const modal = document.getElementById('exportModal');
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('exportModal');
    modal.style.display = 'none';
}

function downloadCSV() {
    const tableBody = document.getElementById('exportTableBody');
    const rows = tableBody.getElementsByTagName('tr');

    let csvContent = 'SKU,Quantity,Date Added,Location\n'; // Header row

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const row = [
            cells[0].textContent,
            cells[1].textContent,
            cells[2].textContent,
            cells[3].textContent
        ].join(',');
        csvContent += row + '\n';
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `export_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    closeModal();
}