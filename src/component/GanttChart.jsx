
import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsGantt from 'highcharts/modules/gantt';
import HighchartsExporting from 'highcharts/modules/exporting';
import './style.css';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import './final.css'

HighchartsGantt(Highcharts);
HighchartsExporting(Highcharts);

function HighchartsGanttChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [allLineIds, setAllLineIds] = useState([]); 
  const [selectedLineId, setSelectedLineId] = useState(null); 


  useEffect(() => {
    async function fetchUniqueLineIds() {
      try {
        const apiUrl = "http://mm.thirdeye-ai.com/chartserver/resourceplanning?startTime=2023-09-26T00:00:01.000Z&endTime=2023-09-26T23:59:59.999Z&plantId=2014&lineId=all";
        const response = await axios.get(apiUrl);
        const machineData = response.data;
        //console.log(machineData)

        const uniqueLineIds = [...new Set(machineData.map((item) => item.lineId))];
        setAllLineIds(uniqueLineIds);
        console.log(uniqueLineIds)
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    }
    fetchUniqueLineIds();
  }, [setAllLineIds]);

  
  useEffect(() => {
    async function fetchData() {
      try {
        const selectedLineIdValue = selectedLineId ? selectedLineId.value : 'all';
        const apiUrl = `http://mm.thirdeye-ai.com/chartserver/resourceplanning?startTime=${startDate}&endTime=${endDate}&plantId=2014&lineId=${selectedLineIdValue}`;
        const response = await axios.get(apiUrl);
        const machineData = response.data;
        console.log("sjfcgwsrfyvns")
        console.log(machineData)
        setData(machineData);

        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, [startDate, endDate, selectedLineId]);

  const handleSelectChange = (selectedOption) => {
    setSelectedLineId(selectedOption);
  };

  useEffect(() => {
    if (data && data.length > 0 && !loading) {
      const machineIdCategories = Array.from(new Set(data.map((machine) => machine.machineId)));
      console.log("called")
      const chartConfig = {
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
              formatter: function () {
                return this.point.name; 
              },
            },
          },
        },
        xAxis: {
          type: 'datetime',
          title: {
            text: 'Time',
          },
          lineColor: 'transparent',
          tickColor: 'transparent',
        },
        yAxis: {
          categories: machineIdCategories,
          lineColor: 'transparent',
          tickColor: 'transparent',
        },
        series: [
          {
            name: 'Tasks',
            data: data.map((machine) => ({
              name: machine.operatorId,
              y: machineIdCategories.indexOf(machine.machineId),
              x: Date.parse(machine.startTime),
              x2: Date.parse(machine.endTime),
              borderColor: '#579EFF',
              color: '#D7E8FF',
            })),
          },
        ],
      };

      const existingChart = Highcharts.charts[0];
      if (existingChart) {
        existingChart.destroy();
      }

      Highcharts.ganttChart('gantt-container', chartConfig);
    }
  }, [data, loading, startDate, endDate, selectedLineId]);

  return (
    <div>
      <div className='filterId'>
        <Select className='select'
          value={selectedLineId}
          onChange={handleSelectChange}
          options={allLineIds.map((lineId) => ({ value: lineId, label: lineId }))}
          placeholder="Select LineId"
        />
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      </div>
      <div id="gantt-container" className="highcharts-gantt-chart">
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
}

export default HighchartsGanttChart;
