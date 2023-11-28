import Modal from 'react-bootstrap/Modal';
import "./Filter.css";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

import image32 from "../assets/Maskgroup(2).png";
import image33 from "../assets/Maskgroup(3).png";
import image34 from "../assets/Maskgroup(4).png";
import image35 from "../assets/Maskgroup(5).png";
import { useEffect, useState } from "react";
import axios from "axios";

function Modalbox(props) {

    const API =
    "http://3.7.85.13/machine/info?companyId=&plantId=1022&machineType=heavyPress";
  const API2 =
    "http://fr.thirdeye-ai.com/face/getEmpInfo?onlyId=1&frGroupName=J-2%20GGM&companyId=JBMGroup&frGroup=frAttendance";

  const API3 = "http://3.7.85.13/plantInfo?i4Usage=true&plantCode=2014";

  const [state, setState] = useState(null);
  const [employeeData, setEmployeeData] = useState([]);
  const [machineName, setmachineName] = useState([]);
  const [supervisor, setSupervisor] = useState([]);
  const [shiftData, setshiftData] = useState([]);
  const [completeshiftData, setcompleteshiftData] = useState([]);
  const [shift, setShift] = useState(null);
 // const [shiftName, setShiftName] = useState(null);
  const [selectMachineName, setSelectMachineName] = useState(null);
  const [operator, setOperator] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [startDate, setStartDate] = useState(new Date());

  const temp = async (event) => {
    try {
      const selectedState = event.target.value;
      setState(selectedState);
      //filterEmployees(selectedState);
    } catch (e) {
      console.log("error", e);
    }
  };
  // const func = async (event) => {
  //   try {
  //     const selectedState = event;
  //     console.log("skvnisf", event);
  //     setShiftName(selectedState);
  //     //filterEmployees(selectedState);
  //   } catch (e) {
  //     console.log("error", e);
  //   }
  // };

  useEffect(() => {
    console.log(state);
  }, [state]);

  // useEffect(() => {
  //   console.log("efgd", shiftName);
  // }, [shiftName]);

  useEffect(() => {
    async function fetchShift() {
      try {
        const response = await axios.get(API3);
        const shiftData = response.data[0];
        const shiftarray = shiftData.shifts.map((shift) => shift);
        console.log("shiftrray", shiftarray);
        setcompleteshiftData(shiftarray);
      } catch (e) {
        console.log("Error", e);
      }
    }
    fetchShift();
  }, []);

  useEffect(() => {
    async function fetchShift() {
      try {
        const response = await axios.get(API3);
        const plantData = response.data[0];
        console.log(plantData);
        const shiftNames = plantData.shifts.map((shift) => shift.shiftName);
        setshiftData(shiftNames);
        //console.log("Shift Names:fgedrh", shiftNames);
      } catch (e) {
        console.log("Error", e);
      }
    }
    fetchShift();
  }, []);

  useEffect(() => {
    async function fetchShifttime() {
      try {
        const response = await axios.get(API3);
        const plantData = response.data[0];
        //console.log(plantData)
        const shiftNamest = plantData.shifts.map((shift) => shift);
        console.log("sfd", shiftNamest);
        const shiftNames = plantData.shifts.map((shift) => shift.shiftEndTime);
        //setshiftData(shiftNames)
        console.log("Shift Names:", shiftNames);
      } catch (e) {
        console.log("Error", e);
      }
    }
    fetchShifttime();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(API2);
        const employeeData = response.data.employeeInfo;
        //console.log("fewkjfnei", employeeData);
        setEmployeeData(employeeData); // Store the fetched employee data
      } catch (error) {
        console.log("Error fetching employee data:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchMachine() {
      try {
        const response = await axios.get(API);
        const machineData = response.data;

        const uniqueMachineNames = Array.from(
          new Set(machineData.map((machine) => machine.machineName))
        );

        setmachineName(uniqueMachineNames);
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchMachine();
  }, []);

  const setoperator = (optionSelected) => {
    setOperator(optionSelected);
  };
  const setmachine = (optionSelected) => {
    console.log(optionSelected)
    setSelectMachineName(optionSelected);
  };
  const setsupervisor = (optionSelected) => {
    setSupervisor(optionSelected);
  };
  const setstartTime = (optionSelected) => {
    setStartTime(optionSelected);
  };
  const setendTime = (optionSelected) => {
    setEndTime(optionSelected);
  };

  const setshift = (optionSelected) => {
    console.log(optionSelected)
    console.log(optionSelected.value);
    setShift(optionSelected);
    //console.log(shift);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
        <div className="main">
        <div>
          <h1 className="skill-heading">Skill Level</h1>
          <div className="container">
            <div className="selectSkill">
              <div className="inner">
                <img src={image32} alt="ascs" />
                <input
                  onChange={temp}
                  value="1"
                  type="radio"
                  name="skillLevel"
                />
              </div>
              <div>
                <p className="chooseIntro">Basic Knowledge</p>
              </div>
            </div>
            <div className="selectSkill">
              <div className="inner">
                <img src={image33} alt="ascs" />
                <input
                  onChange={temp}
                  type="radio"
                  value="2"
                  name="skillLevel"
                />
              </div>
              <div>
                <p className="chooseIntro">Teach to Others</p>
              </div>
            </div>
            <div className="selectSkill">
              <div className="inner">
                <img src={image34} alt="ascs" />
                <input
                  onChange={temp}
                  type="radio"
                  value="3"
                  name="skillLevel"
                />
              </div>
              <div>
                <p className="chooseIntro">Under Supervision</p>
              </div>
            </div>
            <div className="selectSkill">
              <div className="inner">
                <img src={image35} alt="ascs" />
                <input
                  onChange={temp}
                  type="radio"
                  value="4"
                  name="skillLevel"
                />
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
                value={operator}
                options={employeeData
                  .filter(
                    (emp) =>
                      emp.mskillLevel && emp.mskillLevel.skillLevel == state
                  )
                  .map((emp) => ({
                    value: emp.empId,
                    label: emp.empId,
                  }))}
                onChange={setoperator}
              />
            </div>
          </div>
          <div>
            <h2 className="heading-h2">Machine</h2>
            <div className="App">
              <Select
                value={selectMachineName}
                onChange={setmachine}
                options={machineName.map((name) => ({
                  value: name,
                  label: name,
                }))}
              />
            </div>
          </div>
          <div>
            <h2 className="heading-h2">Line Supervisor</h2>
            <div className="App">
              <Select
                defaultValue={supervisor}
                onChange={setsupervisor}
                options={employeeData
                  .filter((emp) => !emp.empId.includes("Contractual"))
                  .map((emp) => ({
                    value: emp.empId,
                    label: emp.empId,
                  }))}
              />
            </div>
          </div>
          <div>
            <h2 className="heading-h2">Shift Incharge</h2>
            <div className="App">
              <Select
                defaultValue={supervisor}
                onChange={setsupervisor}
                options={employeeData
                  .filter((emp) => !emp.empId.includes("Contractual"))
                  .map((emp) => ({
                    value: emp.empId,
                    label: emp.empId,
                  }))}
              />
            </div>
          </div>
        </div>

        <div className="selection">
          <div>
            <h2 className="heading-h2">Date</h2>
            <div className="App">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>
          <div>
            <h2 className="heading-h2">Shift</h2>
            <div className="App">
              <Select
                value={shift}
                onChange={setshift}
                options={shiftData.map((name) => ({
                  value: name,
                  label: name,
                }))}
              />
            </div>
          </div>
          <div>
            <h2 className="heading-h2">Time</h2>
            <div className="App">
            <Select
                //value={startTime} // Use 'startTime' to set the selected value
                //onChange={setstartTime} // Update 'startTime' based on selection
                isDisabled={true}
                value={completeshiftData
                  .filter((name) => name.shiftName === shift?.value)
                  .map((name) => ({
                    value: name.shiftStartTime,
                    label: name.shiftStartTime,
                  }))}
              />
            </div>
          </div>
          <div>
        <h2 className="heading-h2" style={{ color: 'white' }}> . </h2>
          <div className="App">
          <Select
                // value={endTime} // Use 'startTime' to set the selected value
               // onChange={setendTime} // Update 'startTime' based on selection
                isDisabled={true}
                value={completeshiftData
                  .filter((name) => name.shiftName === shift?.value)
                  .map((name) => ({
                    value: name.shiftEndTime,
                    label: name.shiftEndTime,
                  }))}
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
      
    </Modal>
  );
}


export default Modalbox