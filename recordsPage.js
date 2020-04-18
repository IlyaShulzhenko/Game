const recordsPage = [
    {
        id: 1,
        name: 'Artur',
        record: 10
    },
    {
        id: 2,
        name: 'Boris',
        record: 12
    },
    {
        id: 3,
        name: 'Artem',
        record: 29
    }
];

const recordsJSON = JSON.stringify(recordsPage);

localStorage.setItem('records', recordsJSON);

const localRecords = JSON.parse(localStorage.getItem('records'));

console.log(localRecords);

function renderRecordsPage() {
    const table = document.createElement('table');
    const tableHead = document.createElement('thead');
    const tableBody = document.createElement('tbody');
    const thNumber =  document.createElement('th');
    const thName =  document.createElement('th');
    const thRecord =  document.createElement('th');

    table.classList = 'table table-striped table-hover';
    thNumber.innerText = '#';
    thName.innerText = 'Name';
    thRecord.innerText = 'Record';

    tableHead.appendChild(thNumber);
    tableHead.appendChild(thName);
    tableHead.appendChild(thRecord);

    recordsPage.forEach((record, index) => {
        const row = document.createElement('tr');
        const cellNumber = document.createElement('td');
        const cellName = document.createElement('td');
        const cellRecord = document.createElement('td');

        cellNumber.innerText = index + 1;
        cellName.innerText = record.name;
        cellRecord.innerText = record.record;

        row.appendChild(cellNumber);
        row.appendChild(cellName);
        row.appendChild(cellRecord);

        tableBody.appendChild(row);
    });

    table.appendChild(tableHead);
    table.appendChild(tableBody);

    return table;
}
