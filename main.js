let input = document.querySelector('#city');
let inputSlide = document.querySelector('.input-slide');
let error = document.querySelector('.error-message');
let label = document.querySelector('label');
let icon = document.querySelector('.weather-icon');
let tempt = document.querySelector('.tempt');
let description = document.querySelector('.description');
let timezone = document.querySelector('.location');
let long = document.querySelector('.long');
let lat = document.querySelector('.lat');
let humidity = document.querySelector('.humidity');
let pressure = document.querySelector('.pressure');
let form = document.querySelector('form');
let container = document.querySelector('.container');
let overlay = document.querySelector('#overlay');

input.addEventListener('focus', function slide() {
	inputSlide.style.width = '100%';
	label.style.top = '0';
})
form.addEventListener('submit', function handleSubmit(event) {
	event.preventDefault();
	if (input.value == '' || input.value == null || input.value == ' ') {
		error.innerHTML = '*input is empty'
	} else {
		error.innerHTML = '';
		container.style.display = 'none';
		overlay.style.display = 'flex';
		fetch(`https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=a7165fc03757556123877ff6bc44e4ed`).then(response => {
			return response.json()
		}).then( data => {
			let iconCode = data.weather[0].icon;
			timezone.innerHTML = data.name;
			tempt.innerHTML = Math.floor(data.main.temp - 273);
			description.innerHTML = data.weather[0].description;
			long.innerHTML = data.coord.lon;
			lat.innerHTML = data.coord.lat;
			humidity.innerHTML = `${data.main.humidity}%`;
			pressure.innerHTML = `${data.main.pressure} hPa`;
			icon.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

			container.style.display = 'block';
			overlay.style.display = 'none';
		}).catch(err => {
			console.error(err)
		})
	}
})
