
const getWeatherByCity = async ({ lat, lon }) => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=345abeeda579c1925297918d1e6e5511`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error
  }
}

const getCityData = async (city) => {
  try {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=345abeeda579c1925297918d1e6e5511`);
    const data = await response.json();
    if (data.length === 0) {
      return {message: 'City not found'}
    }
    return getWeatherByCity(data?.[0])
  } catch (error) {
    return error
  }
}
