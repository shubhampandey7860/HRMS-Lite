import { useState, useEffect } from 'react';
import { employeeAPI, attendanceAPI } from '../services/api';

export default function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterEmployee, setFilterEmployee] = useState('');
  const [formData, setFormData] = useState({
    employee_id: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Present'
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadAttendance();
  }, [filterDate, filterEmployee]);

  const loadData = async () => {
    try {
      const empRes = await employeeAPI.getAll();
      setEmployees(empRes.data);
      await loadAttendance();
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const loadAttendance = async () => {
    try {
      const params = {};
      if (filterDate) params.date = filterDate;
      if (filterEmployee) params.employee_id = filterEmployee;
      
      const response = await attendanceAPI.getAll(params);
      setAttendance(response.data);
    } catch (err) {
      console.error('Failed to load attendance', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await attendanceAPI.create(formData);
      setSuccess('Attendance marked successfully');
      setFormData({
        employee_id: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Present'
      });
      loadAttendance();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to mark attendance');
    }
  };

  const getEmployeeName = (empId) => {
    const emp = employees.find(e => e.employee_id === empId);
    return emp ? emp.full_name : empId;
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      <h2 style={{ margin: '30px 0 20px' }}>Attendance Management</h2>

      <div className="card">
        <h3>Mark Attendance</h3>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Employee *</label>
            <select
              className="form-control"
              value={formData.employee_id}
              onChange={(e) => setFormData({...formData, employee_id: e.target.value})}
              required
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.employee_id}>
                  {emp.employee_id} - {emp.full_name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Date *</label>
            <input
              type="date"
              className="form-control"
              value={formData.date}
              max={new Date().toISOString().split('T')[0]}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Status *</label>
            <select
              className="form-control"
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              required
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Mark Attendance</button>
        </form>
      </div>

      <div className="card">
        <h3>Attendance Records</h3>
        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label>Filter by Date</label>
            <input
              type="date"
              className="form-control"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </div>
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label>Filter by Employee</label>
            <select
              className="form-control"
              value={filterEmployee}
              onChange={(e) => setFilterEmployee(e.target.value)}
            >
              <option value="">All Employees</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.employee_id}>
                  {emp.employee_id} - {emp.full_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {attendance.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <p>No attendance records found.</p>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((att) => (
                <tr key={att.id}>
                  <td>{att.employee_id}</td>
                  <td>{getEmployeeName(att.employee_id)}</td>
                  <td>{att.date}</td>
                  <td>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500',
                      background: att.status === 'Present' ? '#d4edda' : '#f8d7da',
                      color: att.status === 'Present' ? '#155724' : '#721c24'
                    }}>
                      {att.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
