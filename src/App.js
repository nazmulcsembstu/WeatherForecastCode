import React from 'react';
import './App.css';
import MainWeatherWindow from './components/MainWeatherWindow';
import CityInput from './components/CityInput';
import WeatherBox from './components/WeatherBox';
import TableInfo from './components/TableInfo';

class App extends React.Component {
  state = {
    city: undefined,
    country: undefined,
    days: new Array(5)
  };

  updateState = data => {
    const city = data.city.name;
    const country = data.city.country;
    const days = [];
    const dayIndices = this.getDayIndices(data);

    for (let i = 0; i < 3; i++) {
      days.push({
        date: data.list[dayIndices[i]].dt_txt,
        weather_desc: data.list[dayIndices[i]].weather[0].description,
        icon: data.list[dayIndices[i]].weather[0].icon,
        temp: data.list[dayIndices[i]].main.temp,
        hum: data.list[dayIndices[i]].main.humidity
      });
    }

    this.setState({
      city: city,
      country: country,
      days: days
    });
  };


  makeApiCall = async city => {
    const api_data = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=c09115ac0db0657496c5f3587bafcdcd`
    ).then(resp => resp.json());

    if (api_data.cod === '200') {
      await this.updateState(api_data);
      return true;
    } else return false;
  };


  getDayIndices = data => {
    let dayIndices = [];
    dayIndices.push(0);

    let index = 0;
    let tmp = data.list[index].dt_txt.slice(8, 10);

    for (let i = 0; i < 3; i++) {
      while (
        tmp === data.list[index].dt_txt.slice(8, 10) ||
        data.list[index].dt_txt.slice(11, 13) !== '15'
      ) {
        index++;
      }
      dayIndices.push(index);
      tmp = data.list[index].dt_txt.slice(8, 10);
    }
    return dayIndices;
  };


  render() {
    const WeatherBoxes = () => {
      const weatherBoxes = this.state.days.slice(1).map(day => (
        <li>
          <WeatherBox {...day} />
        </li>
      ));

      return <ul className='weather-box-list'>{weatherBoxes}</ul>;
    };


    const TableInformation = () => {
      const tabelInfo = this.state.days.slice(0).map(day => (
        <li>
          <TableInfo {...day} />
        </li>
      ));

      return <ul className='weather-box-list'>{tabelInfo}</ul>;
    };
    

    return (
      <div className='App'>
        <header className='App-header'>
          <MainWeatherWindow data={this.state.days[0]} city={this.state.city} country={this.state.country} >
            <CityInput city={this.state.city} makeApiCall={this.makeApiCall.bind(this)} />
            <WeatherBoxes />
            <div className='space'>
            <TableInformation />
            </div>
          </MainWeatherWindow>
        </header>
      </div>
    );
  }
}

export default App;
