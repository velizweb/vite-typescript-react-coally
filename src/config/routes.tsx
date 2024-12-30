import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import TaskTable from "../pages/TaskTable";
import { ProtectedRoute } from "./ProtecteRoute";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<TaskTable />} />
      </Route>
      <Route path="/*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};