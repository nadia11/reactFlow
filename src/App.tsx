import 'reactflow/dist/style.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import { ChatFlow } from './pages/chatFlow';
import Login from './pages/login';
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ChatFlow />} /> {/* Main Dashboard */}
        <Route path="/login" element={<Login/>} /> {/* Login Page */}
      </Routes>
    </Layout>
  );
}

export default App;
