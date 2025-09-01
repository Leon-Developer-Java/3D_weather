// 天气数据接口定义
export interface WeatherData {
  id: string;
  name: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  pressure: number;
  visibility: number;
  uvIndex: number;
  weather: string;
  weatherCode: string;
  airQuality: {
    aqi: number;
    level: string;
    pm25: number;
    pm10: number;
  };
}

// 导出的数据和函数类型声明
export declare const cityWeatherData: { [key: string]: WeatherData };
export declare function getCityWeatherData(cityId: string): WeatherData | null;
export declare function getWeatherIcon(weatherCode: string): string;
export declare function generateHourlyData(cityCode: string): {
  hours: string[];
  temperature: number[];
  precipitation: number[];
};