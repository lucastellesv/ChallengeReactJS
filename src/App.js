import React from "react";
import { useState, useEffect} from 'react';
import api from "./services/api";

import "./styles.css";

function App() {
  const[projects, setProjects] = useState([]);
  useEffect(() => {
    api.get('repositories').then (response => {
      setProjects(response.data);
    });
  }, []);
    async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: Date.now(),
      url: "https://www.repositoriolucas.com",
      techs: ["ReactJS"]
    });
    setProjects([...projects, response.data]);
  }

  async function handleRemoveRepository(id) {
      api.delete(`repositories/${id}`)

      const repositoryIndex = projects.findIndex( repository => repository.id === id);
      projects.splice(repositoryIndex, 1);
      
      setProjects([...projects]);
  }

  return (
    <>
      <ul data-testid="repository-list">
          {projects.map(project => <li key={project.id}>{project.title}
            <button onClick={() => handleRemoveRepository(project.id)}>
            Remover
          </button>
          </li>)}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
