import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

import Button from "./Button";

function Header({ title, onAdd, showForm }) {
	const location = useLocation();

	return (
		<header className="header">
			<h1>{title}</h1>
			{location.pathname === "/" && (
				<Button
					color={showForm ? "red" : "green"}
					text={showForm ? "Close" : "Add"}
					handleClick={onAdd}
					showForm={showForm}
				/>
			)}
		</header>
	);
}

Header.defaultProps = {
	title: "Task Tracker",
};

Header.propTypes = {
	title: PropTypes.string.isRequired,
};

export default Header;
