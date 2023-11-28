import './App.css'
import GanttChart from './component/GanttChart'
import Button from 'react-bootstrap/Button';
import  { useState } from 'react';
import Modalbox from './component/Modalbox';
function App() {
  const [modalShow, setModalShow] = useState(false);

  return (

    <>
    
    {/* <Filter></Filter> */}
    <Button variant="primary" onClick={() => setModalShow(true)}>
       Filter
      </Button>
      <Modalbox
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    <GanttChart></GanttChart>
     
    </>
  )
}

export default App
