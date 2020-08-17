import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api'

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Felipe Mamede ${Date.now()}`,
    })

    const repository = response.data;

    setRepositories([...repositories, repository])
  
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);
    if (response.status === 204) {
      const filteredRepositories = repositories.filter((repository) => {
        return repository.id !== id;
      });
      setRepositories(filteredRepositories);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map((repository) => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>

    </div>
  );
}

export default App;
