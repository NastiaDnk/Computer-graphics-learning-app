import HomePage from './components/home-page-components/HomePage/HomePage.js';
import MultipleChoice from './components/test-page-component/multipleChoice.js';
import FractalPage from 'C:\\Users\\Milka\\Desktop\\University\\Course_3\\CG\\Lab_2\\Whootie_project\\whootie-project\\src\\components\\fractal-page-components\\FractalPage\\FractalPage.js';
import ColorPage from './components/color-page-component/ColorPage.js'
//import FractalPage from './components/color-page-component/ColorPage.js';
import MovementPage from './components/movement-page-component/MovementPage.js'
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import TestPage from './components/test-page-component/TestPage.js';
import Quiz from './components/quiz-component/ColorsQuiz.js';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fractals" element={<FractalPage />} />
          <Route path="/colours" element={<ColorPage/>}/>
          <Route path="/movement" element={<MovementPage/>}/>
          <Route path="/tests" element={<TestPage />} />
        </Routes>
      </Router>
       {/*<FractalHeader/>
      <FractalMain/>
     <HomePage></HomePage>*/}
      
    </div>
  );
}

export default App;
