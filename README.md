![Image gallery app preview](https://res-console.cloudinary.com/dyxf7nmbe/thumbnails/v1/image/upload/v1693474902/aW1hZ2UtZ2FsbGVyeS1tdWx0aXNjcmVlbi1wcmV2aWV3X2Jsa3Nqag==/preview)
# Image gallery
his image gallery app is a home assignment for an appealing job. The app allows clients to search for images from Flickr's API and view them in a gallery. The gallery has infinite scroll behavior, meaning it displays new images as the client scrolls to the bottom of the page. Additionally, clients can save and browse results from previous search terms.

## Features
### Gallery
- Displays related images using Flickr's API.
- Loads an additional (50) images each time the client scrolls to the bottom of the page.

### Cache
- The results from Flickr's API are saved in the client's local storage to prevent unnecessary AJAX calls.
- The cache is relevant for only one day. If the cached data becomes irrelevant, a new AJAX call will be made.
- When a new AJAX call fetches more images for an existing cache, the new data will be added to the cache and will receive a re-validation signature.

### Bookmarks
- After the gallery has loaded, the client can save (and remove) specific galleries for later easy browsing.

## Stack Used
- Vite 4
- React 18
- React Redux 8
- TypeScript 5
- Module SCSS

### Alternative Libraries
- Axios
- classnames
- dimpurify
- normalize.css
- react-icons
- react-uuid
- yet-another-react-lightbox

## Scripts
To run the app locally, follow these steps:
1. **Clone the repository**:
```bash
git clone https://github.com/Lizon57/888-image-gallery.git
```

2. **Set up the environment**:
Contact repo's owner to obtain the API key for Flickr, or create one by yourself (at [https://www.flickr.com/services/developer/api/](https://www.flickr.com/services/developer/api/)) Once you have the API key, create a file named .env in the root of the project and add the following line to it:
```bash
VITE_APP_AWEATHER_API_KEY=XXXXXX
```
(Replace **XXXXXX** with the actual API key provided to you.)

3. **Install dependencies**:
Make sure you have Node.js and npm (Node Package Manager) installed on your machine. Open the terminal, navigate to the project's root folder, and run the following command to install the required dependencies:
```bash
npm install
```

## Run the app:
After installing the dependencies, run the following command to start the development server:
```bash
npm start
```
This will compile the code and launch the app in your default web browser at http://localhost:5173.
