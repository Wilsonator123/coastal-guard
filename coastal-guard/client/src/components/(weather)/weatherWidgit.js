import React, { useEffect, useState } from "react";
import Forecast from "./forecast";
import WeatherTitle from "./weatherTitle";
import { fetchWeather } from "@/hooks/case";

export default function WeatherWidgit({ data, hours }) {
	const [weather, setWeather] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!data.lat || !data.lon) return;

		fetchWeather(data.lat, data.lon).then((data) => {
			setWeather(data);
			setLoading(false);
		});
	}, []);

	const isNight = (sunset) => {
		const date = new Date();
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const current = hours + minutes / 60;
		const sunsetHours = sunset / 3600;
		return current >= sunsetHours;
	};
	return (
		<>
			{loading ? (
				<p>Loading...</p>
			) : (
				<>
					<div className="h-2/3 relative flex items-center ">
						<WeatherTitle
							data={weather}
							night={isNight(weather.sunset)}
						/>
					</div>
					<div className="h-1/3  bg-background rounded-b-md">
						<Forecast data={weather} hours={hours} />
					</div>
				</>
			)}
		</>
	);
}