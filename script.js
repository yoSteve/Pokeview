// Elements for displaying Pokémon info
const detailsContainer = document.getElementById('details-container');
const errorContainer = document.getElementById('error-container');
const flavourTextContainer = document.getElementById('flavour-text');
const imageElement = document.getElementById('sprite-image');
const pokemonInput = document.getElementById('pokemon-input');
const searchButton = document.getElementById('search-button');

// Event listener for search button
searchButton.addEventListener('click', async (event) => {
  event.preventDefault();
  const pokemon = pokemonInput.value.trim();

  if (pokemon) {
      clearError(); // removes previous error message (if any)

      const pokemonData = await fetchPokemonData(pokemon);
      if (pokemonData) displayPokemon(pokemonData);

      const flavourText = await fetchFlavorText(pokemon);
      if (flavourText) displayFlavourText(flavourText);

  } else {
      handleError('Please enter a Pokémon name or Pokédex ID.')
  }
});

// Listen for image change, and update color palette.
imageElement.addEventListener('load', () => updateColorPalette())

// Fetch and display Pokémon data based on name or ID
async function fetchPokemonData(pokemon) {
    try {
        // Fetch Pokémon data from the API. Accepts a name or id (string)
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);

        if (!response.ok) throw new Error('Pokémon not found');

        return await response.json();

      } catch (error) {
        handleError(error);
      }
}

// Fetches Pokémon flavor text based on name or ID
async function fetchFlavorText(pokemon) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);

    if (!response.ok) throw new Error('Pokémon not found');

    const data = await response.json();
    const entries = data['flavor_text_entries'];
    const flavourText = entries.length ? entries[0]['flavor_text'] : 'No flavour text was found.';

    return flavourText;

  } catch (error) {
    handleError(error);
  }
}

function displayPokemon(pokemonData) {
  imageElement.src = pokemonData.sprites.front_default;

  detailsContainer.innerHTML = `
      <h2>${pokemonData.name.toUpperCase()}</h2>
      <p><strong>Pokédex ID:</strong> ${pokemonData.id}</p>
      <p><strong>Type:</strong> ${pokemonData.types.map(type => type.type.name).join(', ')}</p>
      <p><strong>Abilities:</strong> ${pokemonData.abilities.map(ability => ability.ability.name).join(', ')}</p>
  `;
}

function displayFlavourText(content) {
  flavourTextContainer.innerText = content;
}

function updateColorPalette() {
  const palette = extractColorPalette(imageElement, 3);
  setColorPaletteVars(palette);
}

/* *** Helper Functions *** */

function handleError(error) {
  console.error('Error fetching Pokémon data:', error);
  errorContainer.innerHTML = `<p class="error">${error.message}</p>`;
}

function clearError() {
  errorContainer.innerHTML = '';
}

// Analyzes and extracts a color palette from a pokemon sprite image
function extractColorPalette(img, colorCount) {
  img.crossOrigin = 'Anonymous';
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;

  // draw the image onto the canvas so we can get pixel data.
  context.drawImage(img, 0, 0, canvas.width, canvas.height);

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;
  const colorMap = {};

  // each pixel in the array consists of four consecutive values representing the RGBA channels of that pixel.
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i]; // Red
    const g = pixels[i + 1]; // Green
    const b = pixels[i + 2]; // Blue
    const a = pixels[i + 3]; // Alpha (Opacity)

    // add to colorMap if pixel is not transparent (alpha zero)
    if (a !== 0) {
      const color = `rgb(${r}, ${g}, ${b})`;
      colorMap[color] = (colorMap[color] || 0) + 1;
    }
  }

  // Sort colors by fequency and return top {colorCount} colors
  const sortedColors = Object.entries(colorMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, colorCount)
    .map(([color]) => color);

    canvas.remove(); // clean up
    return sortedColors;
}

function setColorPaletteVars([ color1 = '#f83526', color2 = '#474f4e', color3 = '#ffffff' ]) {
  const root = document.querySelector(':root');
  root.style.setProperty('--gradient-color-1', color1);
  root.style.setProperty('--gradient-color-2', color2);
  root.style.setProperty('--gradient-color-3', color3);
}
