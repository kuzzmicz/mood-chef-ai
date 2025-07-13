import './App.css';
import {React, useState} from 'react';
function App() {
  const [text, setText] = useState('');
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async() => {
  setLoading(true);
   try{
  const response = await fetch('');
  const data = await response.json(); 
  setRecipe(data.recipe);
   } catch (error) {
  setRecipe("Error!")
  }
  setLoading(false);
}
  return (
    <div className="App">
      <h1>Mood Chef AI</h1>
     <h2>Mood-Based Recipe Suggester</h2>
     
     <input type ="text" 
            value = {text}
            onChange={(e)=> setText(e.target.value)}
            placeholder="Type your sentence..."/>

      <button onClick={handleSubmit}
              disabled={loading}>{loading ? 'Analyzing...' : "Get a recommendation"} </button>
                {recipe && (
                  <div><h2>Recommendation:</h2>
                  <p>{recipe}</p>
                  </div>
                )}
    </div>
  );
}

export default App;
