const recipes = {
    sarapan: [
        { title: "Nasi Goreng", link: "resep-detail.html?id=1", source: "https://via.placeholder.com/150" },
        { title: "Roti Bakar", link: "resep-detail.html?id=2", source: "https://via.placeholder.com/150" }
    ],
    camilan: [
        { title: "Pisang Goreng", link: "resep-detail.html?id=3", source: "https://via.placeholder.com/150" },
        { title: "Bakwan Jagung", link: "resep-detail.html?id=4", source: "https://via.placeholder.com/150" }
    ],
    makanSiang: [
        { title: "Ayam Geprek", link: "resep-detail.html?id=5", source: "https://via.placeholder.com/150" },
        { title: "Soto Ayam", link: "resep-detail.html?id=6", source: "https://via.placeholder.com/150" }
    ],
    makanMalam: [
        { title: "Nasi Goreng Kambing", link: "resep-detail.html?id=7", source: "https://via.placeholder.com/150" },
        { title: "Sate Ayam", link: "resep-detail.html?id=8", source: "https://via.placeholder.com/150" }
    ]
};

// Fungsi untuk memuat resep berdasarkan kategori
function loadCategoryRecipes(categoryId) {
    const container = document.getElementById(`${categoryId}-resep`);
    if (container) {
        recipes[categoryId].forEach(recipe => {
            const card = document.createElement('div');
            card.classList.add('resep-card');
            card.innerHTML = `
                <img src="${recipe.source}" alt="${recipe.title}">
                <h3>${recipe.title}</h3>
                <a href="${recipe.link}" target="_blank">Lihat Resep</a>
            `;
            container.appendChild(card);
        });
    }
}

// Fungsi untuk pencarian resep
function searchRecipes(query) {
    let results = [];
    for (const category in recipes) {
        results = results.concat(recipes[category].filter(recipe => recipe.title.toLowerCase().includes(query.toLowerCase())));
    }

    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';

    if (results.length > 0) {
        results.forEach(recipe => {
            const card = document.createElement('div');
            card.classList.add('resep-card');
            card.innerHTML = `
                <img src="${recipe.source}" alt="${recipe.title}">
                <h3>${recipe.title}</h3>
                <a href="${recipe.link}" target="_blank">Lihat Resep</a>
            `;
            searchResults.appendChild(card);
        });
    } else {
        searchResults.innerHTML = `<p>Tidak ada resep yang ditemukan untuk "${query}".</p>`;
    }
}

// Panggil fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    if (path.includes('sarapan')) loadCategoryRecipes('sarapan');
    if (path.includes('camilan')) loadCategoryRecipes('camilan');
    if (path.includes('makan-siang')) loadCategoryRecipes('makanSiang');
    if (path.includes('makan-malam')) loadCategoryRecipes('makanMalam');
    
    // Menangani pencarian
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                searchRecipes(query);
            }
        });
    }
});

// Fungsi untuk mengambil ID dari URL dan menampilkan resep yang sesuai
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id'); // Mendapatkan ID resep dari URL
    
    // Menampilkan resep sesuai ID
    displayRecipeDetails(recipeId);
});

function displayRecipeDetails(id) {
    // Data resep (bisa disesuaikan atau disimpan di backend)
    const recipesDetails = {
        1: {
            title: "Nasi Goreng",
            image: "https://via.placeholder.com/600x400",
            ingredients: ["1 piring nasi putih", "2 siung bawang putih, cincang halus", "1 butir telur", "2 sendok makan kecap manis"],
            steps: [
                "Panaskan minyak di wajan, tumis bawang putih hingga harum.",
                "Masukkan telur dan aduk rata hingga setengah matang.",
                "Tambahkan nasi putih, kecap manis, garam, dan merica. Aduk hingga rata.",
                "Sajikan nasi goreng dengan pelengkap seperti kerupuk atau acar."
            ]
        },
        // Tambahkan detail resep lainnya sesuai ID
    };

    const recipe = recipesDetails[id];
    if (recipe) {
        document.querySelector('.resep-detail h2').textContent = `Detail Resep: ${recipe.title}`;
        document.querySelector('.resep-detail img').src = recipe.image;
        
        const ingredientsList = document.querySelector('.resep-detail ul');
        recipe.ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = ingredient;
            ingredientsList.appendChild(li);
        });
        
        const stepsList = document.querySelector('.resep-detail p');
        recipe.steps.forEach(step => {
            const p = document.createElement('p');
            p.textContent = step;
            stepsList.appendChild(p);
        });
    }
}
