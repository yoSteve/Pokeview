# Pokéview: the Pokémon Viewer
## Introductory project for HTML, CSS, and Javascript

## Objective
You will create a simple Pokémon Viewer application using HTML, CSS, and JavaScript. This app will allow users to search for Pokémon by name or ID and see their details, like sprite image, types, and abilities.

### Example:
[Pokéview: the Pokémon Viewer](/poke-view/index.html)

### Submission Checklist
- [ ] **HTML** is structured with a header, input form, display sections for Pokémon details, and an error message area.
- [ ] **CSS** styles the app with a theme, card layout, and responsive design.
- [ ] **JavaScript** fetches data from the API and displays it on the page.
- [ ] *(Optional)* **Error Handling** shows a friendly message if something goes wrong.
- [ ] *(Optional)* **Bonus Challenge** is completed with extracted color palette.

### Tips for Debugging
1. **Console Logs**: Use `console.log` to check if values are what you expect.
2. **Inspect Elements**: Right-click an element and select "Inspect" to see the CSS and HTML in real-time.
3. **Network Tab**: Use the browser’s Network tab to see the API requests and check if they return the expected data.

Good luck, and enjoy coding! This is a fun project, and each part helps you learn essential JavaScript, HTML, and CSS skills. If you’re stuck, feel free to ask questions, but try to solve each problem yourself first.

---

## Project Steps

### 1. Set Up the Project
1. **Create the Files**
   - Set up three files in a folder for your project:
     - `index.html`
     - `style.css`
     - `script.js`
2. **Link Your Files**
   - In `index.html`, add links to `style.css` and `script.js` so your styles and scripts load properly.

---

### 2. Build the HTML Structure
In `index.html`, create the basic structure for the app.
- **Add a Header**
  - Add an `<h1>` title and a `<form>` with:
    - An input for users to type the Pokémon’s name or ID. The input should have an `id` of "pokemon-input".
    - A button to trigger the search. The button should have an `id` of "search-button".
- **Add a Display Section**
  - Add an `<img>` to hold the Pokémon's sprite image. It should have an `id` of "sprite-image".
  - Add a `<div>` with an `id` of "details-container" to display the Pokémon’s details (name, type, abilities, etc.).
  - Add a `<p>` element with an `id` of "flavour-text" for the Pokémon’s flavor text (a short description or story about the Pokémon).

*Hint: Follow the example HTML structure for guidance, but try to build it step-by-step.*

---

### 3. Style the App
In `style.css`, add styling to make the app visually appealing.
- **Design the Layout**
  - Center the app on the page using flexbox or grid.
  - Style the main sections (header and Pokémon profile) with padding, shadows, and rounded corners.
- **Set Up a Color Theme**
  - Use CSS variables for colors like "pokeball red" or "title yellow".
- **Add Responsive Styles (Optional)**
  - If you finish early, adjust the title size and layout to look good on mobile screens too.

*Hint: Use `:root` to define CSS variables, so colors are consistent and easy to change.*

---

### 4. Write JavaScript for Pokémon Search
In `script.js`, write JavaScript code to fetch Pokémon data and display it on the page.
1. **Select Elements**
   - Use `document.getElementById` to get references to the HTML input elements ("#pokemon-input", "#search-button") and the display elements that you will update ("#details-container", "#flavour-text", "#sprite-image").
2. **Create an Event Listener for Search**
   - Add a `click` event listener to the search button.
   - Use `event.preventDefault()` to prevent the page from refreshing when the form is submitted.
3. **Fetch Pokémon Data**
   - Write an `async` function to fetch data from the PokéAPI (`https://pokeapi.co/api/v2/pokemon/{pokemon_name_or_id}`).
   - Use the JSON response to get:
     - The Pokémon’s sprite image.
     - Its name, type(s), and abilities.
   - **Bonus**: If the Pokémon is not found, display an error message in the error container.
4. **Display Pokémon Data**
   - Write a function to update the HTML with the Pokémon’s details.

*Hint: Check the structure of the API response in the console to find out where each piece of data is located.*

---

### 5. (Optional) Fetch and Display Flavor Text
Write a separate function to get the Pokémon’s flavor text (description).
1. **Create a Flavor Text Fetch Function**
   - Use the URL `https://pokeapi.co/api/v2/pokemon-species/{pokemon_name_or_id}` to get flavor text.
   - Find the `flavor_text_entries` field in the response. Look for English entries.
2. **Display the Flavor Text**
   - Write a function to update the HTML with the flavor text.

---

### 6. Error Handling
Make sure your app handles errors gracefully.
- Show an error message if the Pokémon is not found or if the user leaves the input blank.
- Display the error message in the error container and use styles to make it noticeable.

---

### Bonus Challenge: Extract and Use a Color Palette
If you finish the main tasks, try adding a feature that extracts colors from the Pokémon sprite and uses them in the background gradient.
1. **Image Canvas Setup**
   - Write a function that uses a `canvas` to draw the Pokémon image.
   - Use `getImageData` to get pixel data.
2. **Get Dominant Colors**
   - `getImageData` returns pixel data as an array of numbers. Each pixel in the array consists of four consecutive values representing the RGBA channels of that pixel.
   - Write a function to find the most frequent colors in the pixel data by:
     1. Looping over the data in increments of 4.
     2. Using the `index` to extract the R, G, B, & A values.
     3. Ignoring transparent pixels (A value is zero).
     4. Creating an RGB color string with non-transparent values (e.g., "rgb(0, 0, 0)" for black).
     5. Tracking each color in a `colorMap` object, initializing it with a value of 1, or incrementing it if it already exists.
     6. Sorting colors by frequency and extracting the top few for the palette.
3. **Apply Colors to the Background**
   - Update the CSS variables to apply the extracted colors to the background gradient.

*Hint: This is an advanced task! Try looking up how to use `canvas` in JavaScript and experimenting with different methods.*
