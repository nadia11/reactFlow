import 'reactflow/dist/style.css';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Layout from './components/layout';
import { ChatFlow } from './pages/chatBot/chatFlow';
import DefaultActions from './pages/chatBot/defaultAction';
import Login from './pages/chatBot/login';
import MyBots from './pages/chatBot/myBots';
import KeywordAction from './pages/chatBot/keywordAction';
import UnderConstruction from './pages/shared/underConstruction';
import { Toaster } from 'react-hot-toast';
import ReplyActionPage from './pages/chatBot/replyActionPage';
import Register from './pages/chatBot/register';
import TestBot from './pages/chatBot/testBot';

interface PrivateRouteProps {
  children: React.ReactNode; // Specify the type for children
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children })=> {
  const token = sessionStorage.getItem('token'); // Check token in session storage
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  const location = useLocation();
  // Define routes that should not include the Layout
  const noLayoutRoutes = ['/login', '/register'];
  const isNoLayoutRoute = noLayoutRoutes.some((route) => route === location.pathname);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      {isNoLayoutRoute ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <ChatFlow />
                </PrivateRoute>
              }
            />
            <Route
              path="/myBots"
              element={
                <PrivateRoute>
                  <MyBots />
                </PrivateRoute>
              }
            />
            <Route
              path="/bot/:id?"
              element={
                <PrivateRoute>
                  <TestBot />
                </PrivateRoute>
              }
            />
            <Route
              path="/defaultActions"
              element={
                <PrivateRoute>
                  <DefaultActions />
                </PrivateRoute>
              }
            />
            <Route
              path="/keywordActions"
              element={
                <PrivateRoute>
                  <KeywordAction />
                </PrivateRoute>
              }
            />
            <Route
              path="/replyActions"
              element={
                <PrivateRoute>
                  <ReplyActionPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<UnderConstruction />} />
          </Routes>
        </Layout>
      )}
    </>
  );
}

export default App;
