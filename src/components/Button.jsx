import PropTypes from "prop-types";

function Button({ color, text, handleClick }) {
	return (
		<button onClick={handleClick} style={{ backgroundColor: color }} className="btn">
			{text}
		</button>
	);
}

Button.defaultProps = {
	color: "steelblue",
};

Button.propTypes = {
	color: PropTypes.string,
	text: PropTypes.string,
	handleClick: PropTypes.func.isRequired,
};

export default Button;
