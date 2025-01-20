import { useContext } from "react";
import { Link } from "react-router-dom";
import { PageContext } from "../Data/PageContext";

interface HeaderMenuItemProps {
  link: string,
  text: string
}

function HeaderMenuItem({ link, text }: HeaderMenuItemProps) {
  const { activePage, setActivePage } = useContext(PageContext);

  const onItemClicked = () => {
    setActivePage(text);
  };

  return (
    <>
      <Link
        className={`nav-item nav-link headeranchor ${activePage === text ? 'active' : ''}`}
        to={link}
        onClick={onItemClicked}>
        {text}
      </Link>
    </>
  );
}

export default HeaderMenuItem;
