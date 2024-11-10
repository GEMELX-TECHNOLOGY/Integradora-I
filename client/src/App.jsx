import { UserProvider } from "@/context/UserContext"
import Rutas from "@/context/Routes"
function App() {

  return (
    <>
    <UserProvider>
      <Rutas/>
    </UserProvider>
    </>
  )
}

export default App
