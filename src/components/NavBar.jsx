import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
  <nav>
    <ul style={{
        listStyle: 'none',
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem',
        margin: 0,
        padding: 0
    }}>
        <li>
            <Link
                to="/"
                style={{
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: '500'
                }}
            >
                Home
            </Link>
        </li>
        <li>
            <Link
                to="/liked"
                style={{
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: '500'
                }}
            >
                Liked
            </Link>
        </li>
    </ul>
  </nav>
  );
}