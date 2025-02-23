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