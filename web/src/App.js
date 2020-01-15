import React, { useState, useEffect } from 'react';
import api from './services/Api'

import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

// Componente: Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação
//             Criar para evitar repetição de código ou para isolar comportamentos (Post no facebook i.e.)
// Propriedade: Informação que um componente PAI passa para o componente FILHO (similar a um parametro)
// Estado: Informações mantida pelo componente (Lembrar: imutabilidade)

// TODO: Adicionar funcionalidades de deleção e edição

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() =>{
    async function loadDevs(){
      const response = await api.get('/devs')
      setDevs(response.data);
    }

    loadDevs();
  }, [])

  async function handleAddDev(data){

    const response = await api.post('/devs', data)

    //Não pode usar .push devido ao conceito de imutabilidade
    setDevs([...devs, response.data]) //Todos da array devs + o novo
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>
      <main>
        <ul>
          {devs.map(dev =>(
              <DevItem dev={dev} key={dev._id} />
            )
          )}
          
        </ul>
      </main>
    </div>
  );
}

export default App;
