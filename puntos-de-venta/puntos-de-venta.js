(() => {
  const mapElement = document.querySelector("#sales-map");

  if (!mapElement || typeof L === "undefined") {
    return;
  }

  const locations = [
    {
      name: "Farmacia City Salud CCS CA",
      coordinates: [10.4954363, -66.8496404],
      mapsUrl: "https://www.google.com/maps/place/Farmacia+City+Salud+CCS+CA/@10.4954363,-66.8496404,1118m/data=!3m2!1e3!4b1!4m6!3m5!1s0x8c2a593a29e8b341:0x8d61a27085d44d93!8m2!3d10.4954363!4d-66.8496404!16s%2Fg%2F11p793kxw5?entry=ttu",
    },
    {
      name: "Farmacittà Express",
      coordinates: [10.4867565, -66.8745941],
      mapsUrl: "https://www.google.com/maps/place/Cine+Citta/@10.4867565,-66.8745941,1127m/data=!3m2!1e3!4b1!4m6!3m5!1s0x8c2a58e68916500b:0x69e16809a3e747f0!8m2!3d10.4867565!4d-66.8745941!16s%2Fg%2F11cjpc9y9w?entry=ttu",
    },
  ];

  const map = L.map(mapElement, {
    scrollWheelZoom: false,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  const markers = locations.map((location, index) => {
    const marker = L.marker(location.coordinates).addTo(map);
    marker.bindPopup(
      `<strong>${index + 1}. ${location.name}</strong><br><a href="${location.mapsUrl}" target="_blank" rel="noopener noreferrer">Abrir en Google Maps ↗</a>`,
    );
    return marker;
  });

  const bounds = L.featureGroup(markers).getBounds();
  map.fitBounds(bounds.pad(0.35), { maxZoom: 15 });
})();
