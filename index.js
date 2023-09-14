import { Loader } from '@googlemaps/js-api-loader';
class Map {
    constructor(payload) {
        if (!payload || !payload.apiKey) {
            throw new Error('TF - API key is required');
        }

        if (!payload.mapOptions || 
            typeof payload.mapOptions.center !== 'object' ||
            typeof payload.mapOptions.center.lat !== 'number' ||
            typeof payload.mapOptions.center.lng !== 'number' ||
            typeof payload.mapOptions.zoom !== 'number') {
            throw new Error('TF - Invalid map options');
        }

        if (!payload.markers || !Array.isArray(payload.markers) || payload.markers.length === 0) {
            throw new Error('TF - At least one marker is required');
        }
        this.DOM
        this.apiKey = payload.apiKey;
        this.mapOptions = payload.mapOptions;
        this.markers = payload.markers;
        this.genericIcon = payload.genericIcon || 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'; 
        this.onComplete = payload.onComplete || (() => {}); // 

        this.loader = new Loader({
            apiKey: this.apiKey,
        });

        this.init();
    }

    async init() {
        try {
            const { Map } = await this.loader.importLibrary('maps');
            this.map = new Map(document.getElementById("map"), this.mapOptions);
            this.createMarkers();

            // fire when maps is ready
            google.maps.event.addListenerOnce(this.map, 'idle', ()=>{
                this.mapIsReady()
            });

        } catch (e) {
            // Handle loading errors
        }
    }
    mapIsReady(){
        this.onComplete(); // Call the onComplete callback
    }
    createMarkers() {
        if (this.markers && this.markers.length > 0) {
            this.markers.forEach((markerData) => {
                if (typeof markerData === 'object' &&
                    typeof markerData.lat === 'number' &&
                    typeof markerData.lng === 'number') {
                    
                    // check if generic icon or custom icon
                    let icon = markerData.icon || this.genericIcon;
                    
                    // Determine animation based on markerData.animation
                    let animation = null;
                    if (markerData.animation === 'BOUNCE') {
                        animation = google.maps.Animation.BOUNCE;
                    } else if (markerData.animation === 'DROP') {
                        animation = google.maps.Animation.DROP;
                    }

                    let markerOptions = {
                        position: { lat: markerData.lat, lng: markerData.lng },
                        map: this.map,
                        title: markerData.title || "Marker",
                        animation: animation, // Set the animation
                        icon: icon, 

                    };
  
                    let marker = new google.maps.Marker(markerOptions);
                    

                    // Check if a custom info window is defined
                    if(markerData.infoWindowContent){
                        this.createCustomInfoWindow(marker, markerData.infoWindowContent);
                    }

                
                }
            });
        }
        console.log(this.markers)
    }

    createCustomInfoWindow(marker, content) {
        const infowindow = new google.maps.InfoWindow({
            content: content,
        });
        marker.addListener("click", () => {
            infowindow.open(this.map, marker);
        });    
    }

    destroy() {
        if (this.map) {
            google.maps.event.clearInstanceListeners(this.map);
            this.map = null;
        }
    }
}

export default Map;

export function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    resolve({ lat: latitude, lng: longitude });
                },
                (error) => {
                    reject(error);
                }
            );
        } else {
            reject(new Error("Geolocation is not available in this browser."));
        }
    });
}