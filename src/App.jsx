import './App.css'
import config from './data/config'

function App() {
    return <h1 className="text-3xl font-bold underline">{config.ENV}</h1>
}

export default App
