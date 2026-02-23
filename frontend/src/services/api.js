import axios from 'axios';

const EMPLOYEE_API = import.meta.env.VITE_EMPLOYEE_API_URL || 'https://hrms-employee-service-88t0.onrender.com';
const ATTENDANCE_API = import.meta.env.VITE_ATTENDANCE_API_URL || 'https://hrms-attendance-service.onrender.com';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const employeeClient = axios.create({ 
  baseURL: EMPLOYEE_API, 
  timeout: 5000,
  headers: getAuthHeader()
});

const attendanceClient = axios.create({ 
  baseURL: ATTENDANCE_API, 
  timeout: 5000 
});

employeeClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const employeeAPI = {
  getAll: () => employeeClient.get('/employees/'),
  getById: (id) => employeeClient.get(`/employees/${id}/`),
  create: (data) => employeeClient.post('/employees/', data),
  delete: (id) => employeeClient.delete(`/employees/${id}/`),
};

export const attendanceAPI = {
  getAll: (params) => attendanceClient.get('/attendance/', { params }),
  create: (data) => attendanceClient.post('/attendance/', data),
  getSummary: (employeeId) => attendanceClient.get('/attendance/summary/', { params: { employee_id: employeeId } }),
};
