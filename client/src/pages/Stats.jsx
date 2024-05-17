import { useState } from "react";
import styled from "styled-components";
import YearDropdown from "../assets/components/YearDropdown"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  defaults,
} from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import Wrapper from '../assets/wrappers/StatsContainer';

  defaults.maintainAspectRatio = false;
  defaults.responsive = true;


  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const Stats = () => {
  const [monthlySums, setMonthlySums] = useState([]);

    const totalsForGraphic = Array.from({ length: 12 }, (_, i) => {
      const monthIndex = i + 1; 
      const monthData = monthlySums.find((item) => item._id === monthIndex);
      return monthData ? monthData.total : 0;
    });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "R$ gasto por mês",
      },
    },
  };

  const labels = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Nobembro",
    "Dezembro",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "R$",
        data: totalsForGraphic,
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
          "rgba(255, 0, 255, 0.8)",
          "rgba(0, 255, 255, 0.8)",
          "rgba(218, 165, 32, 0.8)",
          "rgba(128, 0, 128, 0.8)",
          "rgba(0, 128, 0, 0.8)",
          "rgba(255, 140, 0, 0.8)",
        ],
      },
    ],
  };



  console.log("estamos recebendo issooooo", monthlySums)
  return (
    <Wrapper>

    <div>
      <YearDropdown onMonthlySumsChange = {setMonthlySums}/>
      <GraphicContainer>
        <Bar options={options} data={data} />
      </GraphicContainer>
    </div>
    </Wrapper>
  )
}

const GraphicContainer = styled.div`
  width: 100%;
  height: 300px;
  @media (min-width: 768px) {
    height: 400px;
  }
  @media (min-width: 1120px) {
    height: 500px;
  }
  canvas {
    width: 100% !important;
    height: 100% !important;
  }
`;


export default Stats