document.getElementById("search-button").addEventListener("click", async function () {
    const searchInput = document.getElementById("search-input").value.trim().toLowerCase();
    const typesContainer = document.getElementById("types");
    const spriteContainer = document.getElementById("sprite-container");

    if (!searchInput) {
        alert("Please enter a Pokémon name or ID.");
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput}`);
        if (!response.ok) {
            throw new Error("Pokémon not found");
        }

        const data = await response.json();

        document.getElementById("pokemon-name").textContent = data.name.toUpperCase();
        document.getElementById("pokemon-id").textContent = `#${data.id}`;
        document.getElementById("weight").textContent = data.weight;
        document.getElementById("height").textContent = data.height;
        document.getElementById("hp").textContent = data.stats[0].base_stat;
        document.getElementById("attack").textContent = data.stats[1].base_stat;
        document.getElementById("defense").textContent = data.stats[2].base_stat;
        document.getElementById("special-attack").textContent = data.stats[3].base_stat;
        document.getElementById("special-defense").textContent = data.stats[4].base_stat;
        document.getElementById("speed").textContent = data.stats[5].base_stat;

        // Clear previous results
        typesContainer.innerHTML = "";
        spriteContainer.innerHTML = "";

        // Display Pokémon types
        data.types.forEach(type => {
            const typeElement = document.createElement("span");
            typeElement.textContent = type.type.name.toUpperCase();
            typesContainer.appendChild(typeElement);
        });

        // Display Pokémon sprite
        const spriteImg = document.createElement("img");
        spriteImg.id = "sprite";
        spriteImg.src = data.sprites.front_default;
        spriteImg.alt = data.name;
        spriteContainer.appendChild(spriteImg);

    } catch (error) {
        alert("Pokémon not found");
    }
});