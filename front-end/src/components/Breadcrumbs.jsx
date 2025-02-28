// Breadcrumbs.jsx
import { useLocation, Link } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="text-sm breadcrumbs">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <li key={name}>{name}</li>
          ) : (
            <li key={name}>
              <Link to={routeTo}>{name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumbs;