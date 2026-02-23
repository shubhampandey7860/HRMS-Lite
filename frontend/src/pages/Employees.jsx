import { useState, useEffect } from 'react';
import { employeeAPI } from '../services/api';

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    employee_id: '',
    full_name: '',
    email: '',
    department: ''
  });

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const response = await employeeAPI.getAll();
      setEmployees(response.data);
    } catch (err) {
      setError('Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await employeeAPI.create(formData);
      setSuccess('Employee added successfully');
      setFormData({ employee_id: '', full_name: '', email: '', department: '' });
      loadEmployees();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add employee');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this employee?')) return;

    try {
      await employeeAPI.delete(id);
      setSuccess('Employee deleted successfully');
      loadEmployees();
    } catch (err) {
      setError('Failed to delete employee');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      <h2 style={{ margin: '30px 0 20px' }}>Employee Management</h2>

      <div className="card">
        <h3>Add New Employee</h3>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Employee ID *</label>
            <input
              type="text"
              className="form-control"
              value={formData.employee_id}
              onChange={(e) => setFormData({...formData, employee_id: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              className="form-control"
              value={formData.full_name}
              onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              className="form-control"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Department *</label>
            <input
              type="text"
              className="form-control"
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Add Employee</button>
        </form>
      </div>

      <div className="card">
        <h3>Employee List</h3>
        {employees.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">👥</div>
            <p>No employees found. Add your first employee above.</p>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.employee_id}</td>
                  <td>{emp.full_name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.department}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="btn btn-danger"
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                    >
                      Delete
                    </button>
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
