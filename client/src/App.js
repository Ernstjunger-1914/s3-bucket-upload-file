import axios from 'axios';
import { useState } from 'react';
import './App.css';

async function postImage({image, description}) {
  const formData = new FormData();

  formData.append("image", image);
  formData.append("description", description);

  const result = await axios.post('/images', formData, { headers: {'Content-Type': 'multipart/form-data'}});

  return result.data
}

function App() {
  const [file, setFile] = useState();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([])

  const upload = async e=> {
    e.preventDefault();
    const result = await postImage({image: file, description});
    setImage([result.image, ...image]);
  }

  const fileSelected = e=> {
    const file = e.target.files[0];
    
    setFile(file);
  }

  return (
    <div className="App">
      <form onSubmit={upload}>
        <input onChange={fileSelected} type="file" accept='image/*' />
        <input value={description} onChange={e=> setDescription(e.target.value)} type="text" />
        <button type="submit">Submit</button>
      </form>
      {image.map(image=> {
        <div key={image}>
          <img src={image}></img>
        </div>
      })}

      <img src="/images/a97be1ce084bd31931f6e1c9c160cb0e"></img>
    </div>
  );
}

export default App;
