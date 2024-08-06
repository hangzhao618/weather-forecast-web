// import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import {
  WiCloudy,
  WiDaySunny,
  WiDayRain,
  WiDaySnowThunderstorm,
} from "react-icons/wi";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

function App() {
  const [city, setCity] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState({
    time: new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    }),
    date: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    day: new Date().toLocaleDateString("en-US", { weekday: "short" }),
  });
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const weatherData = [
    { day: "Today", icon: <WiCloudy />, humidity: "45%" },
    { day: "Nov 24", icon: <WiDaySunny />, humidity: "30%" },
    { day: "Nov 25", icon: <WiDayRain />, humidity: "60%" },
    {
      day: "Nov 26",
      icon: <WiDaySnowThunderstorm />,
      humidity: "80%",
    },
  ];

  const handelChange = (e) => {
    setCity(e.target.value);
  };
  const temperatureData = [72, 73, 72, 70, 68, 70, 72, 74, 73, 74, 76, 78];
  const data = {
    labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    datasets: [
      {
        data: temperatureData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: {
          target: "origin",
          below: "rgb(177, 231, 246)", // And blue below the origin
        },
        borderWidth: 2, // 线条宽度
        pointRadius: temperatureData.map((_, index) => (index === 1 ? 7 : 0)), // 仅第二个数据点加大
        pointBackgroundColor: "rgba(75, 192, 192, 1)", // 标记第二个数据点
        pointBorderColor: temperatureData.map((_, index) =>
          index === 1 ? "rgba(255, 255, 255, 1)" : "rgba(75, 192, 192, 1)"
        ), // 第二个数据点边框颜色为白色
        pointBorderWidth: temperatureData.map((_, index) =>
          index === 1 ? 2 : 0
        ), // 仅第二个数据点有边框
        tension: 0.4, // 使线条顺滑
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // 禁用图例
      },
      title: {
        display: false, // 禁用标题
      },
      datalabels: {
        display: (context) => context.dataIndex === 1,
        align: "top",
        formatter: (value) => {
          return `${value}°F`;
        },
        font: {
          weight: "bold",
        },
        color: "rgba(75, 192, 192, 1)",
      },
    },
    scales: {
      x: {
        display: false, // 不显示x轴
      },
      y: {
        display: false, // 不显示y轴
        suggestedMin: 65,
      },
    },
  };

  return (
    <div className="App">
      <div className="container">
        <div className="left">
          <div className="location">
            <label>Your city </label>
            <input
              type="text"
              name="city"
              value={city}
              onChange={handelChange}
            />
          </div>
          <div className="weater-container">
            <div className="current-time">
              {`${currentDateTime.time}, ${currentDateTime.day},
              ${currentDateTime.date}`}
            </div>
            <div className="current-weater">
              <div className="forecast-icon">
                <WiCloudy />
              </div>
              <div className="temperature">
                72<span className="degree-symbol">°F</span>
              </div>
            </div>
            <div className="current-condition">Cloudy</div>
            <div className="humidity-wind">
              <div className="humidity">
                <div className="title">Humidity</div>
                <div className="value">45%</div>
              </div>
              <div className="wind-speed">
                <div className="title">Wind Speed</div>
                <div className="value">19.2km/j</div>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="chat">
            <div className="title">Temperature</div>
            <div className="chart-container">
              <Line data={data} options={options} plugins={[ChartDataLabels]} />
            </div>
          </div>
          <div className="weekly">
            {weatherData.map((weather, index) => (
              <div
                key={index}
                className={`day-weather ${
                  index === selectedDayIndex ? "selected" : ""
                }`}
                onClick={() => setSelectedDayIndex(index)}
              >
                <div className="day">{weather.day}</div>
                <div className="icon">{weather.icon}</div>
                <div className="title">Humidity</div>
                <div className="value">{weather.humidity}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
