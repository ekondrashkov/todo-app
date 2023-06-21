import { useEffect, useState } from "react";

export interface IWeatherData {
  city: string;
  temperature: string;
  img_url: string;
}

interface IUseWetherData {
  initialCity: string;
}

let weatherData: IWeatherData = {
  city: "Tbilisi",
  temperature: "--°",
  img_url: "https://cdn.weatherapi.com/weather/64x64/day/113.png"
}

async function getWeatherData(coordinates: string): Promise<IWeatherData> {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=5488ed7570974609be0175011231204&q=${coordinates}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const allData = await response.json();
    weatherData.city = allData.location.name;
    weatherData.temperature = `${allData.current.temp_c}°`;
    weatherData.img_url = `${allData.current.condition.icon}`;
  } catch (err) {
    console.error(err);
  }

  return weatherData;
}

export function useWetherData({ initialCity }: IUseWetherData) {
  const [ weather, setWeather ] = useState<IWeatherData>(weatherData);
  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    let actualWeatherData: IWeatherData = {...weatherData};

    const onSuccess = async (location: GeolocationPosition) => {
      const coords = location.coords;
      actualWeatherData = await getWeatherData( `${coords.latitude},${coords.longitude}` );
      setIsLoaded(true);
      setWeather(actualWeatherData);
    };
  
    const onError = async (_err: GeolocationPositionError) => {
      actualWeatherData = await getWeatherData( initialCity );
      setIsLoaded(true);
      setWeather(actualWeatherData);
    };
  
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, [isLoaded]);

  return weather;
}