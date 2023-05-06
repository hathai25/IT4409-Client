import { Button } from "antd";
import "./style.scss";
import PropTypes from "prop-types";

const AntButton = ({text, theme, ...props}) => {
  return(
    <Button
      className={theme === "dark" ? "btn-dark" : "btn-light"}
      {...props}
    >
      {text}
    </Button>
  )
}

AntButton.defaultProps = {
  theme: "dark"
}

AntButton.propTypes = {
  text: PropTypes.string.isRequired,
  theme: PropTypes.string
}

export default AntButton;