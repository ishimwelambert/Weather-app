import { useEffect, useState } from "react";
import Search from "../Search";
export default function Weather() {
    const [search, setSearch] = useState("");
    const [loading, setloading] = useState(false);
    const [Weatherdata, setWeatherdata] = useState(null);
    async function fecthWeatherData(param) {
        setloading(true)
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${param}&appid={21e2201990b4f98b04a0afa2cc71d0af}`);
            const data = await response.json();
            console.log(data, "data");
            if (data) {
                setWeatherdata(data);
                setloading(false);
            }

        } catch (e) {
            setloading(false);
            console.log(e)

        }
    }
    async function handleSearch() {
        fecthWeatherData(search);
    }
    function getCurrentDate() {
        return new Date().toLocaleDateString("en-us", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    }

    useEffect(() => {
        fecthWeatherData("London");
    }, [])
    console.log(Weatherdata);

    return (
        <div>
            <Search
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}
            />
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div>
                    <div className="city-name">
                        <h2>
                            {weatherData?.name}, <span>{weatherData?.sys?.country}</span>
                        </h2>
                    </div>
                    <div className="date">
                        <span>{getCurrentDate()}</span>
                    </div>
                    <div className="temp">{weatherData?.main?.temp}</div>
                    <p className="description">
                        {weatherData && weatherData.weather && weatherData.weather[0]
                            ? weatherData.weather[0].description
                            : ""}
                    </p>
                    <div className="weather-info">
                        <div className="column">
                            <div>
                                <p className="wind">{weatherData?.wind?.speed}</p>
                                <p>Wind Speed</p>
                            </div>
                        </div>
                        <div className="column">
                            <div>
                                <p className="humidity">{weatherData?.main?.humidity}%</p>
                                <p>Humidity</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}