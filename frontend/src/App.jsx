import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import AppLayout from './layout/AppLayout';
import Landing from './pages/LandingPage';
import Login from './pages/Login';
import Unauthorized from './pages/Unauthorized';
import Dashboard from './pages/Dashboard';
import TodayStatus from './pages/fieldagent/TodayStatus';
import MonthlyStatus from './pages/fieldagent/MonthlyStatus';
import FieldAgents from './pages/admin/FieldAgents';
import AgentDetails from './pages/admin/AgentDetails';
import TodayOverview from './pages/admin/TodayOverview';
import MonthlyReport from './pages/admin/MonthlyReport';
import DailyAttendanceDetails from './pages/admin/DailyAttendanceDetails';
import ChangeFieldAgentPassword from './pages/admin/ChangeFieldAgentPassword';
import UpdateAvatar from './pages/UpdateAvatar';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
           }
          >

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/update-avatar" element={<UpdateAvatar />} />

            <Route
              path="/attendance/today"
              element={
                <ProtectedRoute allowedRoles={['FE']}>
                  <TodayStatus />
                </ProtectedRoute>
              }
            />
            <Route
              path="/attendance/monthly"
              element={
                <ProtectedRoute allowedRoles={['FE']}>
                  <MonthlyStatus />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/field-agents"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <FieldAgents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/field-agents/change-password/:agentId"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ChangeFieldAgentPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/agent/:agentId"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AgentDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/agent/:agentId/date/:date"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <DailyAttendanceDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/today-overview"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <TodayOverview />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/monthly-report"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <MonthlyReport />
                </ProtectedRoute>
              }
            />
          </Route>

          
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
