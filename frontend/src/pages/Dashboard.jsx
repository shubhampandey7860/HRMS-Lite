import { useState, useEffect, useMemo } from 'react';
import { employeeAPI, attendanceAPI } from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState({ employees: 0, todayPresent: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const [empRes, attRes] = await Promise.all([
        employeeAPI.getAll(),
        attendanceAPI.getAll({ date: today })
      ]);
      
      setStats({
        employees: empRes.data.length,
        todayPresent: attRes.data.filter(a => a.status === 'Present').length
      });
    } catch (error) {
      setStats({ employees: 0, todayPresent: 0 });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading</div>;

  return (
    <div className="container">
      <h2 style={{ margin: '30px 0 20px', color: 'white', fontSize: '2rem' }}>Dashboard</h2>
      <div className="grid">
        <div className="stat-card">
          <div className="stat-value">{stats.employees}</div>
          <div className="stat-label">Total Employees</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.todayPresent}</div>
          <div className="stat-label">Present Today</div>
        </div>
      </div>
    </div>
  );
}
