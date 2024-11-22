import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { CrudProvider } from './context'
import UsersCrud from './components/UsersCrud/UsersCrud'
import ClientsCrud from './components/ClientsCrud/ClientsCrud'
import Navbar from './components/Navbar/Navbar'
import Notas from './components/Notas/Notas'

function App() {

  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <CrudProvider>
        <Routes>
          <Route path='/users' element={<UsersCrud/>}/>
          <Route path='/clients' element={<ClientsCrud/>}/>
          <Route path='/notas' element={<Notas/>}/>
        </Routes>
      </CrudProvider>
      </BrowserRouter>
    </>
  )
}

export default App
