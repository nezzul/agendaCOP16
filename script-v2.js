document.addEventListener('DOMContentLoaded', () => {
    fetch('data-v2.json')
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => new Date(a.fechaISO) - new Date(b.fechaISO));
            displayCards(data);
        });
});

function displayCards(data) {
    const container = document.getElementById('cardsContainer');
    container.innerHTML = '';
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="grid-container">
                <div class="grid-item">
                <h2>${new Date(item.fechaISO).toLocaleDateString('es-ES', { day: 'numeric' })}</h2>
                <h2>${new Date(item.fechaISO).toLocaleDateString('es-ES', { month: 'long' })}</h2>
            </div>
            <div class="grid-item">
                <h2>${item.titulo}</h2>
                <p><strong>Fecha:</strong> ${item.fecha}</p>
                
                <p><strong>Hora:</strong> ${item.hora}</p>
                <p><strong>Lugar:</strong> ${item.lugar}</p>
                <p>${item.descripcion}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

function filterCards() {
    const filterDate = document.getElementById('dateFilter').value;
    fetch('data-v2.json')
        .then(response => response.json())
        .then(data => {
            if (filterDate) {
                const filteredData = data.filter(item => item.fechaISO.startsWith(filterDate));
                displayCards(filteredData);
            } else {
                displayCards(data);
            }
        });
}
