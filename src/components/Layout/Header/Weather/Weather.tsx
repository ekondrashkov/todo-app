import React from 'react';
import styles from './weather.css';
import { useWetherData } from '../../../../hooks/useWeatherData';

interface WeatherProps {
  initialCity: string;
}

export function Weather({ initialCity }: WeatherProps) {
  const weatherData = useWetherData({ initialCity: initialCity });

  return (
    <div className={styles.geo}>
      <div className={styles.geoWeather}>
        <img src={weatherData.img_url} alt="City" />
        <span className={styles.geoWeatherDegree}>{weatherData.temperature}</span>
      </div>
      <span className={styles.geoCity}>{weatherData.city}</span>
    </div>
  );
}
