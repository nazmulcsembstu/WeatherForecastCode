import React from 'react';
import './TableInfo.css';
import ReactToExcel from 'react-html-table-to-excel';

export default class TableInfo extends React.Component {
  
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
    return (
      <div className='table-box'>
      <h2>{this.props.date ? this.getDay(this.props.date) : ''}</h2> 
      <p>Information</p>

        <table border='1' id='table-to-xls'>

         <tbody>

            <tr>
               <th>Temp:</th>
               <td>{Math.round(this.props.temp - 273.15)}°C</td>
            </tr>

            <tr>
               <th>Hum:</th>
               <td>{this.props.hum}</td>
            </tr>

            <tr>
               <th>Cond:</th>
               <td>{this.props.weather_desc}</td>
            </tr>

         </tbody>

        </table>

        <ReactToExcel 
          className="btn"
          table="table-to-xls"
          fileName="excelFile"
          sheet="sheet 1"
          buttonText="EXPORT" 
        />
      </div>
    );
  }
}
