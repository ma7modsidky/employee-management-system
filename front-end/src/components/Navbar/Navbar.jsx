import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
function Navbar() {
  const { user, logoutUser } = useAuth();
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          EMS
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {!user ? (
            <li>
              <a>Login</a>
            </li>
          ) : (
            <li>
            <details>
              <summary>{user.user_name}</summary>
              <ul className="bg-base-100 rounded-t-none p-2 flex flex-col gap-y-4">
                <li>
                  <a>Account</a>
                </li>
                <li>
                  <a onClick={logoutUser} className="btn btn-error text-white">Logout</a>
                </li>
              </ul>
            </details>
          </li>
          )}
          
          
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
