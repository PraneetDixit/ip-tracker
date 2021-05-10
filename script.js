/** Map setup start **/
const myIcon = L.icon({iconUrl: 'images/icon-location.svg',iconAnchor: [23, 56]});
const mymap = L.map('mapCont', {zoomControl: false}).setView([28.61, 77.20], 12);
const marker = L.marker(mymap.getCenter(), {icon: myIcon}).addTo(mymap);
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, {attribution: `By <a href="https://praneetdixit.me" target="_blank">Praneet Dixit</a>`});
tiles.addTo(mymap);
/** Map setup end **/

/** Init DOM variables Start **/
const input = document.getElementById("ipHolder");
const button = document.getElementById("search");
/** Init DOM variables End **/

async function checkIP(IP){
	try{
		if(IP.includes("http://") || IP.includes("https://")){
			IP = IP.split("://")[1];
		}
		let req = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_TEYGZ5THakrXcYjy5H5MZLVnbuFgl&${IP.match(/^(\d|\.)*$/) ? "ipAddress" : "domain"}=${IP}`);
		if(req.status === 200){
			let resp = await req.json();
			return resp;
		}else if([400, 422].includes(req.status)){
			throw new Error("Invalid input");
		}
	}catch(err){
		alert(err.message);
		return err;
	};
}

function processInfo(info){
	let lat = info.location.lat;
    let lng = info.location.lng;
    let newLatLng = new L.LatLng(lat, lng);
    marker.setLatLng(newLatLng); 
	mymap.setView([lat, lng], 12, {animation: true, duration: 0.5});
	document.getElementById("info").innerHTML = `
			<div class="infoField">
				<div class="fieldTitle">IP ADDRESS</div>
				<div class="fieldDetail">${info.ip}</div>
			</div>
			<div class="infoField">
				<div class="fieldTitle">LOCATION</div>
				<div class="fieldDetail">${info.location.city} <br> ${info.location.region}, ${info.location.country} ${info.location.postalCode}</div>
			</div>
			<div class="infoField">
				<div class="fieldTitle">TIMEZONE</div>
				<div class="fieldDetail">GMT ${info.location.timezone}</div>
			</div>
			<div class="infoField">
				<div class="fieldTitle">ISP</div>
				<div class="fieldDetail">${info.isp}</div>
			</div>`;
	input.focus();
}

function start(){
	document.getElementById("loader").style.opacity = 0;
	setTimeout(function(){
		document.getElementById("loader").remove();
	}, 2000);
	document.getElementById("d-n").remove();
}

function initSearch(){
	button.setAttribute("disabled", "true")
	checkIP(input.value)
		.then(info => {
			if(info.ip){
				processInfo(info);
			}
			button.removeAttribute("disabled")
		});
}

button.addEventListener("click", initSearch);
input.addEventListener("keydown", function(e){
	if(e.keyCode === 13 && e.target.value && !button.disabled){
		initSearch();
	}
});
