// Filter.js
import "./Filter.css";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";

import image32 from "../assets/Maskgroup(2).png";
import image33 from "../assets/Maskgroup(3).png";
import image34 from "../assets/Maskgroup(4).png";
import image35 from "../assets/Maskgroup(5).png";
import { useEffect, useState } from "react";
import axios from "axios";

const Filter = () => {
  //const [selectedOption, setSelectedOption] = useState(null);
  const API =
    "http://3.7.85.13/machine/info?companyId=&plantId=1022&machineType=heavyPress";
  const [machineName, setmachineName] = useState([]);
  const [selectMachineName, setSelectMachineName] = useState(null);
  const [data, setData] = useState([]);
  const [skill, setSkill] = useState([]);
  const [state, setState] = useState(null);
  const [employeeId, setemployeeId] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);

  const API2 =
    "http://fr.thirdeye-ai.com/face/getEmpInfo?onlyId=1&frGroupName=J-2%20GGM&companyId=JBMGroup&frGroup=frAttendance";

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(API2);
        const employeeData = response.data.employeeInfo;
        console.log('fewkjfnei',employeeData)
        setEmployeeData(employeeData); // Store the fetched employee data
      } catch (error) {
        console.log("Error fetching employee data:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetch() {
      try {
        const response = await axios.get(API2);
        const machineData = response.data;

        if (machineData && Array.isArray(machineData.employeeInfo)) {
          const arr = machineData.employeeInfo.map((employee) => ({
            ...employee,
          }));
          //console.log('arrrr',arr)
          setData(arr);
        } else {
          console.log("Invalid data structure or missing employeeInfo array.");
        }
      } catch (error) {
        console.log("error", error);
      }
    }
    fetch();
  }, []);

  useEffect(() => {
    async function fetchMachine() {
      try {
        const response = await axios.get(API);
        const machineData = response.data;

        const uniqueMachineNames = Array.from(
          new Set(machineData.map((machine) => machine.machineName))
        );
        //console.log(uniqueMachineNames)

        setmachineName(uniqueMachineNames);
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchMachine();
  }, []);

  const setoprator = (optionSelected) => {
    setSelectMachineName(optionSelected);
  };
  useEffect(() => {
    async function func() {
      try {
        const response = await axios.get(API2);
        const machineData = response.data;

        if (machineData && Array.isArray(machineData.employeeInfo)) {
          const skillSetArray = machineData.employeeInfo.map((employee) => {
            if (employee.mskillLevel && employee.mskillLevel.skillLevel) {
              return employee.mskillLevel.skillLevel;
            } else {
              return null;
            }
          });
          const filteredSkillSet = skillSetArray.filter(
            (skill) => skill !== null
          );
          setSkill(filteredSkillSet);

          console.log(filteredSkillSet);
        } else {
          console.log("Invalid data structure or missing employeeInfo array.");
        }
      } catch (error) {
        console.log("error", error);
      }
    }
    func();
  }, []);

  useEffect(() => {
    async function emp() {
      try {
        const response = await axios.get(API2);
        const machineData = response.data;
        if (machineData && Array.isArray(machineData.employeeInfo)) {
          const skillSetArray = machineData.employeeInfo.map((employee) => {
            if (employee.empId) {
              return employee.empId;
            } else {
              return null;
            }
          });
          const filteredSkillSet = skillSetArray.filter((emp) => emp !== null);
          setemployeeId(filteredSkillSet);

         // console.log(filteredSkillSet);
        } else {
          console.log("Invalid data structure or missing employeeInfo array.");
        }
      } catch (error) {
        console.log("error", error);
      }
    }
    emp();
  }, []);

  const temp = async (event) => {
    try {
      const selectedState = event.target.value;
      setState(selectedState); // Update the selected skill level state
      filterEmployees(selectedState);
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    console.log(state);
  }, [state]);

  const filterEmployees = (selectedState) => {
    if (!selectedState) {
      // If no skill level is selected, don't filter
      setFilteredEmployees([]);
    } else {
      const filteredData = employeeData
        .filter(
          (employee) =>
            employee.mskillLevel &&
            employee.mskillLevel.skillLevel == selectedState
        )
        .map((employee) => ({ value: employee.empId, label: employee.empId }));
        //console.log(filteredData)
      setFilteredEmployees(filteredData); // Store the filtered employees
    }
  };

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get(API2);
      const employeeData = response.data;

      // Log the entire employeeData
      console.log("Employee Data:", employeeData);

      const filteredData = employeeData.employeeInfo
        .filter(
          (employee) =>
            employee.mskillLevel && employee.mskillLevel.skillLevel == state
        )
        .map((employee) => ({ value: employee.empId, label: employee.empId }));

      // Log the filtered data
      //console.log("Filtered Data:", filteredData);

      setFilteredEmployees(filteredData);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  return (
    <div className="main">
      <div>
        <h1 className="skill-heading">Skill Level</h1>
        <div className="container">
          <div className="selectSkill">
            <div className="inner">
              <img src={image32} alt="ascs" />
              <input onChange={temp} value="1" type="radio" name="skillLevel" />
            </div>
            <div>
              <p className="chooseIntro">Basic Knowledge</p>
            </div>
          </div>
          <div className="selectSkill">
            <div className="inner">
              <img src={image33} alt="ascs" />
              <input onChange={temp} type="radio" value="2" name="skillLevel" />
            </div>
            <div>
              <p className="chooseIntro">Teach to Others</p>
            </div>
          </div>
          <div className="selectSkill">
            <div className="inner">
              <img src={image34} alt="ascs" />
              <input onChange={temp} type="radio" value="3" name="skillLevel" />
            </div>
            <div>
              <p className="chooseIntro">Under Supervision</p>
            </div>
          </div>
          <div className="selectSkill">
            <div className="inner">
              <img src={image35} alt="ascs" />
              <input onChange={temp} type="radio" value="4" name="skillLevel" />
            </div>
            <div>
              <p className="chooseIntro">Work Independently</p>
            </div>
          </div>
        </div>
      </div>

      <div className="selection">
        <div>
          <h2 className="heading-h2">Operator</h2>
          <div className="App">
          <Select
              className="dropdown"
              value={state} // Set the selected skill level
              options={filteredEmployees} // Display filtered employees in the dropdown
              onChange={temp}
            />
          </div>
        </div>
      </div>

      <div className="submit">
        <div>
          <button className="cancel">Cancel</button>
        </div>
        <div>
          <button className="done">Done</button>
        </div>
      </div>
    </div>
  );
};

export default Filter;

{
  /* <div>
          <h2 className="heading-h2">Machine</h2>
          <div className="App">
            <Select
              value={selectMachineName}
              onChange={setSelectedOption}
              options={machineName.map((name) => ({ value: name, label: name }))}
            />
          </div>
        </div> */
}
{
  /* <div>
          <h2 className="heading-h2">Line Supervisor</h2>
          <div className="App">
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
          </div>
        </div>
      </div>

      <div className="selection">
        <div>
          <h2 className="heading-h2">Date</h2>
          <div className="App">
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
          </div>
        </div>
        <div>
          <h2 className="heading-h2">Shift</h2>
          <div className="App">
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
          </div>
        </div>
        
        <div>
          <h2 className="heading-h2">Time</h2>
          <div className="App">
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
          </div>
        </div> */
}
{
  /*         
        <div>
        <h2 className="heading-h2" style={{ color: 'white' }}> . </h2>
          <div className="App">
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
          </div>
        </div> */
}
