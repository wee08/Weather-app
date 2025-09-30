export function getGeoLocation(callBack) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        callBack({ lat: lat, lon: lon });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("user denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("location information is unavailable");
            break;
          case error.TIMEOUT:
            alert("An unknown error occurred.");
            break;
          default:
            alert("An unknown error occurred.");
        }
      }
    );
  } else {
    alert("Geolocation does not support with this browser.");
  }
}
