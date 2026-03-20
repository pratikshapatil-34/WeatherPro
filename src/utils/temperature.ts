export const fahrenheitToCelsius = (fahrenheit: number): number => {
  return Math.round((fahrenheit - 32) * (5 / 9));
};

export const formatTemperature = (fahrenheit: number): string => {
  const celsius = fahrenheitToCelsius(fahrenheit);
  return `${celsius}°C`;
};

export const getTemperatureRange = (low: number, high: number): string => {
  return `${fahrenheitToCelsius(high)}° / ${fahrenheitToCelsius(low)}°`;
};
