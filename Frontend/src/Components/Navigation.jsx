import { Link } from "react-router-dom";

function Navigation({ toggleCategories }) {
  return (
    <nav>
      <Link to="/">
        <div className="LogoDiv" onClick={toggleCategories}></div>
      </Link>
    </nav>
  );
}

export default Navigation;
