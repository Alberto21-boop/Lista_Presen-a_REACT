import React, { useState, useEffect } from 'react'

import './styles.css';
import { Card } from '../../components/Card';


export function Home() {
  const [studentName, setStudentName] = useState('');
  const [students , setStudents] = useState([]);
  const[users, setUser] = useState({name: '', avatar: ''});

  function handleAddStudents(){
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };

    setStudents(prevState => [...prevState, newStudent]);
  }

  useEffect(() => {
    fetch('https://api.github.com/users/Alberto21-boop')
    .then(response => response.json())
    .then(data => {
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      })

    })
  }, []);

  return (
    <div className='container'>
       <header>
       <h1>Lista de Presença</h1>
       <div>
        <strong>{users.name}</strong>
        <img src={users.avatar} alt="Foto De Perfil" />
       </div>
       </header>

       <input 
          type="text" 
          placeholder='Digite um nome ...'
          onChange={e => setStudentName(e.target.value)} 
        />

       <button type='button' onClick={handleAddStudents}>
           Adicionar
       </button>

       {
        students.map(students => (
          <Card 
            key={students.time}
            name={students.name} 
            time={students.time}
          />))
       }

    </div>
  )
}
