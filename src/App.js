import './App.css';
import Heading from './components/heading';
import Calculator from './components/calculator';

function App() {
  return (
    <>
      <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', gap:'10px'}} >
      <Heading/>
      <Calculator/>
      </div>
    </>
  );
}

export default App;
