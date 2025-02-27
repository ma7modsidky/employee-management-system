import { Link, useParams, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="text-sm mb-4">
      <ol className="flex space-x-2">
        {pathnames.map((path, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return (
            <li key={path}>
              {isLast ? (
                <span className="text-gray-500">{path}</span>
              ) : (
                <Link to={routeTo} className="text-blue-500 hover:underline">
                  {path}
                </Link>
              )}
              {!isLast && <span className="mx-2">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;