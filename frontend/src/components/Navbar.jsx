import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>HRMS Lite</h1>
            <nav className="nav">
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                Dashboard
              </Link>
              <Link to="/employees" className={`nav-link ${location.pathname === '/employees' ? 'active' : ''}`}>
                Employees
              </Link>
              <Link to="/attendance" className={`nav-link ${location.pathname === '/attendance' ? 'active' : ''}`}>
                Attendance
              </Link>
            </nav>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ color: 'white', fontSize: '14px' }}>Welcome, {username}</span>
            <button onClick={handleLogout} className="btn btn-danger" style={{ padding: '8px 16px', fontSize: '13px' }}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
