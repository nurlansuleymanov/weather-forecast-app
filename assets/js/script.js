function formatDate(date) {

    let newDate = new Date(date);

    return newDate.toLocaleDateString(
        "en-US",
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );

}



const cities = {

    Baku: {
        latitude: 40.4093,
        longitude: 49.8671
    },

    Istanbul: {
        latitude: 41.0082,
        longitude: 28.9784
    },

    London: {
        latitude: 51.5072,
        longitude: -0.1276
    },

    Madrid: {
        latitude: 40.4168,
        longitude: -3.7038
    }

};





function getWeatherDescription(code) {


    const weatherCodes = {

        0: "☀ Clear Sky",

        1: "🌤 Mainly Clear",

        2: "⛅ Partly Cloudy",

        3: "☁ Cloudy",

        45: "🌫 Fog",

        48: "🌫 Depositing Rime Fog",

        51: "🌦 Light Drizzle",

        53: "🌦 Moderate Drizzle",

        55: "🌧 Dense Drizzle",

        61: "🌧 Slight Rain",

        63: "🌧 Moderate Rain",

        65: "🌧 Heavy Rain",

        71: "❄ Slight Snow",

        73: "❄ Moderate Snow",

        75: "❄ Heavy Snow",

        95: "⛈ Thunderstorm"

    };


    return weatherCodes[code] || "🌡 Unknown";


}





function getWeather(city) {


    let latitude = cities[city].latitude;

    let longitude = cities[city].longitude;



    let apiUrl =
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode&forecast_days=7&temperature_unit=celsius`;


    $("#loading").show();


    $("#weatherResult").html("");


    $("#error").hide();



    $.ajax({

        url: apiUrl,

        method: "GET",



        success: function (data) {


            $("#loading").hide();



            $("#cityName").html(
                `🌤 ${city} - 7 Days Weather Forecast`
            );



            let weatherHTML = "";



            for (let i = 0; i < 7; i++) {



                weatherHTML += `

                <div class="weather-card">


                    <h3>
                        ${formatDate(data.daily.time[i])}
                    </h3>



                    <p>
                        🔥 Max:
                        ${Math.round(data.daily.temperature_2m_max[i])} °C
                    </p>



                    <p>
                        ❄ Min:
                        ${Math.round(data.daily.temperature_2m_min[i])} °C
                    </p>



                    <p>
                        ${getWeatherDescription(data.daily.weathercode[i])}
                    </p>



                </div>

                `;


            }



            $("#weatherResult").html(weatherHTML);



        },



        error: function () {


            $("#loading").hide();



            $("#error").html(
                "⚠ Weather information could not be loaded."
            );



            $("#error").show();



        }



    });



}





$(document).ready(function () {



    $("#loading").hide();

    $("#error").hide();




    $("#getWeather").click(function () {



        let selectedCity = $("#citySelect").val();




        if (selectedCity === "") {


            alert("Please select a city");

            return;


        }




        getWeather(selectedCity);



    });



});