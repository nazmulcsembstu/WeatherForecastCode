import React from 'react';
import './MainWeatherWindow.css';

export default class MainWeatherWindow extends React.Component {

  getDay = date => {
    let weekday = new Array(7);
    weekday[0] = 'Sunday';
    weekday[1] = 'Monday';
    weekday[2] = 'Tuesday';
    weekday[3] = 'Wednesday';
    weekday[4] = 'Thursday';
    weekday[5] = 'Friday';
    weekday[6] = 'Saturday';

    return weekday[new Date(date).getDay()];
  };

  render(props) {
    const Title = this.props.city ? null : <h1 className='title'>Weather Forecast</h1>;

    return (
      <div>
        <div className='inner-main'>

          {Title}
          <img
            src={
              this.props.data
                ? require(`../images/${this.props.data.icon}.svg`)
                : require('../images/01d.svg')
            }
            alt='sun'
            style={{
              visibility: this.props.city ? 'visible' : 'hidden',
              opacity: this.props.city ? '1' : '0'
            }}
          />

          <div
            className='today'
            style={{
              visibility: this.props.city ? 'visible' : 'hidden',
              opacity: this.props.city ? '1' : '0'
            }}
          >
            <h2> Today, {this.props.data ? this.getDay(this.props.data.date) : ''}</h2>
            <h1>{this.props.city}, {this.props.country}</h1>
            <p>
              Temperature: {this.props.data ? Math.round(this.props.data.temp - 273.15) : 0}
              °C
            </p>
            <p>Humidity: {this.props.data ? this.props.data.hum : ''}</p>
            <p>Condition: {this.props.data ? this.props.data.weather_desc.toLowerCase() : ''}</p>
          </div>

        </div>
        {this.props.children}
      </div>
    );
  }
}
