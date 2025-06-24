const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function getData(url) {
	try {
		const res = await fetch(url);
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
		alert("Something went wrong!");
	}
}

function getPlanetData(id) {
	if (id) {
		const url = `http://localhost:9001/api/planets/${id}`;
		const data = getData(url);
		showPlanets(data);
	} else {
		alert("Something went wrong!");
	}
}

function getFilmData(id) {
	if (id) {
		const url = `http://localhost:9001/api/planets/${id}/films`;
		const data = getData(url);
		showFilmData(data);
	} else {
		alert("Something went wrong!");
	}
}

function getCharacterData(id) {
	if (id) {
		const url = `http://localhost:9001/api/planets/${id}/characters`;
		const data = getData(url);
		showCharacters(data);
	} else {
		alert("Something went wrong!");
	}
}

function showPlanets(data) {
	const filmDiv = document.getElementById("planet-details");
	filmDiv.innerHTML = `
    <h1 id="planet-title">${data.name}</h1>
    <div id="planet-info">
        <p>Population: <b>${data.population}</b></p>
        <p>Diameter: <b>${data.diameter}</b></p>
        <p>Climate: <b>${data.climate}</b></p>
        <p>Terrain: <b>${data.terrain}</b></p>
    </div>
    `;
}

function showFilmData(data) {
	const filmDiv = document.getElementById("films-details");
	const h1 = document.createElement("h1");
	h1.innerText = "Films";
	filmDiv.appendChild(h1);

	const filmContainer = document.createElement("div");
	filmContainer.setAttribute("id", "film-container");
	data.forEach((film) => {
		const h3 = document.createElement("h3");
		h3.innerText = film.title;
		h3.onclick = () => {
			window.location.href = `film.html?id=${film.id}`;
		};
		filmContainer.appendChild(h3);
	});
	filmDiv.appendChild(filmContainer);
}

function showCharacters(data) {
	const charDiv = document.getElementById("character-details");
	const h1 = document.createElement("h1");
	h1.innerText = "Characters";
	charDiv.appendChild(h1);

	const characterContainer = document.createElement("div");
	characterContainer.setAttribute("id", "char-container");
	data.forEach((character) => {
		const h3 = document.createElement("h3");
		h3.innerText = character.name;
		h3.onclick = () => {
			window.location.href = `character.html?id=${character.id}`;
		};
		characterContainer.appendChild(h3);
	});
	charDiv.appendChild(characterContainer);
}

getPlanetData(id);
getFilmData(id);
getCharacterData(id);
