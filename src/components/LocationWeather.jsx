import React, { useEffect } from 'react'

const LocationWeather = ({ onLocationDetected }) => {
    //This component only handles location detection
    //Once location is found, it calls onLocationDetected(lat, lon).

    const handleGetLoc = () => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const {latitude , longitude} = pos.coords;
                    onLocationDetected(latitude, longitude);
                }, 
                (error) => {
                    console.warn("Geolocation permission denied or unavailable:", error);
                    alert("Location access denied. Please allow it to use this feature.");
                }
            );
        } else {
            alert.error("Geolocation is not supported by this browser.");
        }
    };
    
    return (
        <button
        className='loc-btn'
        onClick={handleGetLoc}
        title='Use my current location'
        >
        <i className="ri-compass-3-line"></i>
        </button>
    );
};

export default LocationWeather