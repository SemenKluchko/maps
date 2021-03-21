;

const mymap = L.map('mapid').setView([50.449863, 30.536288], 11.5);


// marker to descent like a street, and two popup, first it's for understanding that you can click at line, it's same like marker
// and second, it's main popup
const andrewsDescent = [
    [50.459405, 30.517326],
    [50.45994, 30.515089],
    [50.460376, 30.514483],
    [50.460758, 30.514505],
    [50.461038, 30.515246],
    [50.461161, 30.516115],
    [50.462192, 30.517876],
]
const markerDescent = L.polyline(andrewsDescent, {color: 'blue'}).addTo(mymap);
markerDescent.bindPopup('Click to see more about this street!' , { autoClose: false}).openPopup();

markerDescent.on('click', function (){ 
    markerDescent.bindPopup(`Here is an historical <a href="https://en.wikipedia.org/wiki/Andriyivskyy_Descent" target="blank">Andrew's Descent</a>. Place were each traveler in Kyiv must have been.`);
} )

// small road to work like line and marker that you can click and it will moving, if you catch and click one more time when moving, it will stops
const fromHomeToWork = [
	[50.43527, 30.620144],
	[50.439459, 30.615675],
	[50.430393, 30.592041],
	[50.424219, 30.570873],
	[50.423556, 30.568609],
	[50.424623, 30.561565],
	[50.42327, 30.555628],
	[50.421795, 30.551609],
	[50.420742, 30.549459],
	[50.420933, 30.546281],
	[50.424255, 30.542351],
	[50.440985, 30.522165],
	[50.442414, 30.519664],
	[50.443617, 30.512019],
	[50.451271, 30.515421],
	[50.451363, 30.514552],
	[50.451093, 30.513618],
	[50.451386, 30.512513],
 ];

L.polyline(fromHomeToWork, {color: 'red'}).addTo(mymap);

const markerHome = L.Marker.movingMarker(fromHomeToWork, [2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000]).addTo(mymap);

markerHome.bindPopup(`
        It's my home - <a href="https://comforttown.com.ua/" target="blank">Comfort town.</a> I live here.
        <b>Click on me for start road to work!</b>
        `).openPopup();

markerHome.once('click', function(){
	markerHome.start();
    markerHome.unbindPopup();
    markerHome.on('click', function() {
        if (markerHome.isRunning()) {
            markerHome.pause();
        } else {
            markerHome.start();
            
        }
	});
	setTimeout(function() {
        markerHome.bindPopup('<b>Click me to pause !</b>').openPopup();
    }, 1000);
});

markerHome.on('end', function() {
    markerHome.bindPopup(`<b>Welcome to  <a href="http://zigzagkyiv.com/" target="blank">Zig-Zag</a>!</b>`);
    openPopup();
});

// circle around park
const circlePark = L.circle([50.462686, 30.605161], {
    color: 'lightgreen',
    fillColor: 'green',
    fillOpacity: 0.5,
    radius: 600
}).addTo(mymap);

circlePark.bindPopup(`My favorite closest to home place - <a href="https://ru.wikipedia.org/wiki/%D0%9F%D0%B0%D1%80%D0%BA_%C2%AB%D0%9F%D0%BE%D0%B1%D0%B5%D0%B4%D0%B0%C2%BB_(%D0%9A%D0%B8%D0%B5%D0%B2)" target="blank">Victory park</a>`);

const circleZigZag = L.circle([50.451386, 30.512513], {
    color: 'yellow',
    fillColor: 'red',
    fillOpacity: 0.5,
    radius: 100
}).addTo(mymap);
circleZigZag.bindPopup(`It's a cafe <a href="http://zigzagkyiv.com/" target="blank">Zig-Zag</a>!`);

const markerZoo = L.marker([50.455366, 30.463833]).addTo(mymap);
markerZoo.bindPopup(`It's a famous <a href="https://en.wikipedia.org/wiki/Kyiv_Zoo" target="blank">Kiev Zoo</a>.It is one of the largest zoos in the former Soviet Union and the only large zoo in Kyiv.`);

const markerStadium = L.marker([50.433837, 30.521936]).addTo(mymap);
markerStadium.bindPopup(`Our famous stadium <a href="https://ru.wikipedia.org/wiki/%D0%9E%D0%BB%D0%B8%D0%BC%D0%BF%D0%B8%D0%B9%D1%81%D0%BA%D0%B8%D0%B9_(%D1%81%D1%82%D0%B0%D0%B4%D0%B8%D0%BE%D0%BD,_%D0%9A%D0%B8%D0%B5%D0%B2)
" target="blank">Olympiyskiy</a>. Take a Euro 2012 on it.`);


// if you want to back in zoom just click anywhere on the map
mymap.on('click', function (e) {
    mymap.setView(e.latlng, 11.5);
})

// here if you click at marker - map zoom to marker and you can see the street and etc
circlePark.on('click', function (e) {
    mymap.setView(e.latlng, 13);
})
circleZigZag.on('click', function (e) {
    mymap.setView(e.latlng, 13);
})

markerZoo.on('click', function (e) {
    mymap.setView(e.latlng, 13);
})

markerStadium.on('click', function (e) {
    mymap.setView(e.latlng, 13);
})

markerDescent.on('click', function (e) {
    mymap.setView(e.latlng, 13);
})

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoic2ltb25rbHVjaGtvIiwiYSI6ImNrbWRydzY0NjFoOWYydnFscTFtbGptY2cifQ.9MeZYPXrrml3W8uJAfjSdQ'
}).addTo(mymap)
