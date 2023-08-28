# Map Class

The Map class is a JavaScript utility class for creating interactive Google Maps with markers and custom info windows. It provides a simple way to initialize a Google Map, add markers with custom properties, and customize the map's appearance.


## Installation

```
npm install @teamthunderfoot/google-map 
```



## Usage
### Importing the Module
Note that this is an async await opertion
```javascript
import {Map} from '@teamthunderfoot/google-map';
const map = new Map({
    apiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
    mapOptions: {
        center: {
            lat: 0,
            lng: 0
        },
        zoom: 4
    },
    markers: [
        {
            lat: 43.2620238,
            lng: -2.9261762,
            title: 'Marker 1',
            infoWindowContent: '<p>This is Marker 1</p>'
        },
        {
            lat: 42.2620238,
            lng: -2.9261762,
            title: 'Marker 2',
            infoWindowContent: '<p>This is Marker 2</p>'
        }
    ],
    onComplete: () => {
        console.log('Map is ready');
    }
});
```

### Constructor Options :

- apiKey (string, required): Your Google Maps API key.
- mapOptions (object, required): Map configuration options, including center and zoom.
- markers (array, required): An array of marker objects with properties like lat, lng, title, infoWindowContent, and more.
- genericIcon (string, optional): A URL for the generic marker icon (default: Google Maps generic marker).
- onComplete (function, optional): A callback function to be called when the map is ready.

### Marker Object Properties :
- lat (number, required): Latitude coordinate of the marker.
- lng (number, required): Longitude coordinate of the marker.
- title (string, optional): Title of the marker.
- infoWindowContent (string, optional): HTML content for the marker's info window.
- icon (string, optional): URL for a custom marker icon.
- animation (string, optional): Animation type for the marker, BOUNCE, DROP or null

### Public Methods

Removes event listeners and destroys the map instance
```
map.destroy()
```

### Get Geolocation
There is also a helper function to get current location from the user.

```
import Map,{getCurrentLocation} from "@teamthunderfoot/google-map ";
await getCurrentLocation();
```
[Thunderfoot](https://teamthunderfoot.com/)
