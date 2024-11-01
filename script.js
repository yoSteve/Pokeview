// Elements for displaying Pokémon info
const detailsContainer = document.getElementById('details-container');
const errorContainer = document.getElementById('error-container');
const flavourTextContainer = document.getElementById('flavour-text');
const imageElement = document.getElementById('sprite-image');
const pokemonInput = document.getElementById('pokemon-input');
const searchButton = document.getElementById('search-button');

// Event listener for search button
searchButton.addEventListener('click', (event) => {
  event.preventDefault();
  const pokemon = pokemonInput.value.trim();
  if (pokemon) {
      fetchAndDisplayPokemon(pokemon);
      fetchAndDisplayFlavorText(pokemon);
  } else {
      handleError('Please enter a Pokémon name or Pokédex ID.')
  }
});

// Fetch and display Pokémon data based on name or ID
async function fetchAndDisplayPokemon(pokemon) {
    try {
        // Fetch Pokémon data from the API. Accepts a name or id (string)
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
        if (!response.ok) throw new Error('Pokémon not found');

        const data = await response.json();

        imageElement.src = data.sprites.front_default;

        // Display Pokémon information in the UI
        detailsContainer.innerHTML = `
            <h2>${data.name.toUpperCase()}</h2>
            <p><strong>Pokédex ID:</strong> ${data.id}</p>
            <p><strong>Type:</strong> ${data.types.map(type => type.type.name).join(', ')}</p>
            <p><strong>Abilities:</strong> ${data.abilities.map(ability => ability.ability.name).join(', ')}</p>
        `;

      } catch (error) {
        handleError(error);
      } finally {
      // Extract and display the color palette
      imageElement.onload = () => {
          const palette = extractColorPalette(imageElement, 3);
          console.log('Color Palette', palette);
          setColorPaletteVars(palette);
      };
    }
}

function handleError(error) {
  console.error('Error fetching Pokémon data:', error);
  errorContainer.innerHTML = `<p class="error">${error.message}</p>`;
}

// Analyze pokemon sprite image and exctract color palette
function extractColorPalette(img, colorCount = 5) {
  img.crossOrigin = 'Anonymous';
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;

  // draw the image onto the canvas.
  context.drawImage(img, 0, 0, canvas.width, canvas.height);

  // get pixel data
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;
  const colorMap = {};
  // each pixel in the array consists of four consecutive values representing the RGBA (Red, Green, Blue, Alpha) channels of that pixel.
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i],
          g = pixels[i + 1],
          b = pixels[i + 2];
          a = pixels[i + 3];
    const color = `rgb(${r}, ${g}, ${b})`;

    // add to colorMap if pixel is not transparent
    if (a !== 0) {
      if (colorMap[color]) {
        colorMap[color]++;
      } else {
        colorMap[color] = 1;
      }
    }
  }

  // Sort colors by fequency and return top {colorCount} colors
  const sortedColors = Object.entries(colorMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, colorCount)
    .map(([color]) => color);

    canvas.remove();
    return sortedColors;
}

function setColorPaletteVars([ color1, color2, color3 ]) {
  const root = document.querySelector(':root');
  root.style.setProperty('--gradient-color-1', color1);
  root.style.setProperty('--gradient-color-2', color2);
  root.style.setProperty('--gradient-color-3', color3);
}

async function fetchAndDisplayFlavorText(pokemon) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);
    if (!response.ok) throw new Error('Pokémon not found');
    const data = await response.json();

    const entries = data['flavor_text_entries'];
    flavourTextContainer.innerText = `"${entries[0]['flavor_text']}"`;
  } catch (error) {
    handleError(error);
  }
}

// Run the app:
fetchAndDisplayPokemon();