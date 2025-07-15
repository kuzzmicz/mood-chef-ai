import './App.css';
import {React, useState} from 'react';
import { motion } from 'framer-motion';
import {FaSmileBeam, FaMeh, FaFrown} from 'react-icons/fa';
function App() {
  const [text, setText] = useState('');
  const [recipe, setRecipe] = useState('');
  const [mood, setMood] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');
  
  const handleSubmit = async() => {
  setLoading(true);
   try{
  const response = await fetch('http://localhost:5000/analyze',
    {method: 'POST', 
     headers: { 'Content-Type': 'application/json'},
     body: JSON.stringify({text})
    }
  );
  const data = await response.json(); 
  setRecipe(data.recipe);
  setMood(data.mood);
  setImage(data.image);
   } catch (error) {
  setRecipe("Error!")
  }
  setLoading(false);
}
  return (
    <div className="App min-h-screen bg-gray-300 flex flex-col items-center justify-center p-4">
      <div className="bg-gray-100 p-4 rounded-md">
        
      <h1 className="text-3xl font-bold underline mb-4">👨‍🍳 Mood Chef AI 🤖</h1>
     <h2 className="text-xl font-bold mb-3">Mood-Based Recipe Suggester</h2>
     
     <input type ="text" 
            value = {text}
            onChange={(e)=> setText(e.target.value)}
            placeholder="Type your sentence..."
            className="w-full max-w-md p-2 mb-4 border-rounded"/>

      <button onClick={handleSubmit}
              disabled={loading}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400">
                {loading ? 'Analyzing...' : "Get a recommendation"} </button>
                {recipe && (
                  <motion.div 
                   initial={{opacity: 0, y: 20}}
                   animate = {{opacity: 1, y: 0}}
                   transition= {{duration: 0.5}}
                  className="mt-4 p-4 bg-white rounded shadow">
                    <h2 className="text-xl font-semibold">Recommendation:</h2>
                    {image && 
                    (<img src={`http://localhost:5000${image}`} 
                      alt={recipe}
                      className="w-full h-48 object-cover rounded mb-4"/>
                    
                    )}
                  <p className="text-m font-semibold">{recipe}</p>
                  {mood && <p className = "flex items-center">Mood: {mood}
                    {mood==='positive'? <FaSmileBeam className='ml-2 text-green-500'/> :
                    mood === 'negative' ? <FaFrown className='ml-2 text-red-500'/> :
                    <FaMeh className='ml-2 text-yellow-500'/>}
                    </p>}
                  </motion.div>
                )}
    </div></div>
  );
}

export default App;
