import React, {useState, useEffect} from 'react';
import { v4 as uuid} from 'uuid';
import TeamForm from './TeamForm';
import TeamMembers from './TeamMembers'

import './App.css';

const initialTeamMembersList = [
  {
    id: uuid(), // uuid is a lib to generate random, unique ids
    username: 'Samuel',
    email: 'sam@samuelOden.com',
    role: 'Back-End',
  },
]


const initialFormValues = {
  name: '',
  email: '',
  role: '',
}


const fakeAxiosGet = () => {
  return Promise.resolve({ status: 200, success: true, data: initialTeamMembersList })
}
const fakeAxiosPost = (url, { name, email, role }) => {
  const newTeamMember = { id: uuid(), name, email, role }
  return Promise.resolve({ status: 200, success: true, data: newTeamMember })
}



function App() {
  const [teamMembersList, setTeamMembersList] = useState([])
  const [formValues, setFormValues] = useState(initialFormValues)

  const updateForm =(inputName, inputValue) => {
    setFormValues({...formValues, [inputName]: inputValue})
  }

  const submitForm = () => {
    const teamMember ={
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      role: formValues.role,
    }

    if(!teamMember.name || !teamMember.email) return


    fakeAxiosPost('fake.com', teamMember)
    .then(res => {
      setTeamMembersList([...teamMembersList, res.data])
    })
    .catch(err => {
      debugger
    })
    .finally(() => {
      setFormValues(initialFormValues)
    })
  }

  useEffect(() => {
    fakeAxiosGet('fakeapi.com').then(res => setTeamMembersList(res.data))
  }, [])




  return (
    <div className="App">
      <header className="App-header">Team Member List</header>

      <TeamForm
      values={formValues}
      update={updateForm}
      submit={submitForm}
      />

      {
        teamMembersList.map(teamMember => {
          return (
            <TeamMembers key={teamMember.id} details={teamMember} />
          )
        })
      }
    </div>
  );
}

export default App;
