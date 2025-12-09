let name = document.querySelector(".name");
let flag = document.querySelector(".flag");
let flag_img = document.createElement('img');

let population = document.querySelector(".population");
let region = document.querySelector(".region");
let language = document.querySelector(".language");
let currency = document.querySelector(".currency");

let n_name = document.querySelectorAll(".name")[1];
let n_flag = document.querySelectorAll(".flag")[1];
let n_flag_img = document.createElement('img');

let n_population = document.querySelectorAll(".population")[1];
let n_region = document.querySelectorAll(".region")[1];
let n_language = document.querySelectorAll(".language")[1];
let n_currency = document.querySelectorAll(".currency")[1];

const getCountryData = async function (countryName) {
    try {
        let response = await fetch(`https://restcountries.com/v2/name/${countryName}`);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        let countryData = await response.json();
        flag_img.src = countryData[0].flag;
        flag_img.style.width = "100%";
        flag_img.style.height = "100%";
        flag.appendChild(flag_img);

        name.innerText = countryData[0].name;
        population.innerText = `${(countryData[0].population / 1_000_000).toFixed(1)} M people`;
        region.innerText = countryData[0].region;
        language.innerText = countryData[0].languages[0].name;
        currency.innerText = countryData[0].currencies[0].name;

        let borderCountry = countryData[0].borders[1];
        if (borderCountry) {
            getNeighbouringCountryData(borderCountry);
        }
    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
};

const getNeighbouringCountryData = async function (borderCountry) {
    try {
        let response = await fetch(`https://restcountries.com/v2/alpha/${borderCountry}`);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        let countryData = await response.json();
        n_flag_img.src = countryData.flag;
        n_flag_img.style.width = "100%";
        n_flag_img.style.height = "100%";
        n_flag.appendChild(n_flag_img);

        n_name.innerText = countryData.name;
        n_population.innerText = `${(countryData.population / 1_000_000).toFixed(1)} M people`;
        n_region.innerText = countryData.region;
        n_language.innerText = countryData.languages[0].name;
        n_currency.innerText = countryData.currencies[0].name;

    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
};

getCountryData("egypt");