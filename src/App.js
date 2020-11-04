import React, {Fragment} from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import MainComponent from "./components/MainComponent";

function App() {
  return (
    <Fragment>
     <MainComponent/>
    </Fragment>
  );
}

export default App;
