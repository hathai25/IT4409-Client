import PropTypes from 'prop-types';
import {useState} from 'react';
import Spinner from "../Spinner/index.jsx";
import {Image} from "antd";
import {ERROR_IMG_LINK} from "../../../constants.js";

const AntImage = ({src, fallback = ERROR_IMG_LINK, width, height, alt, className, classNameWrapper,layout, children, ...rest}) => {
  const [loadImg, setLoadImg] = useState(true);
  const [imageSrc, setImageSrc] = useState(src);
  return (
    <div style={{position: 'relative'}} className={classNameWrapper}>
      {loadImg && (
        <Spinner/>
      )}
      <Image
        unoptimized={false}
        layout={layout}
        className={className}
        style={{opacity: loadImg ? '0' : '1'}}
        src={imageSrc}
        width={width}
        height={height}
        alt={alt}
        onLoad={() => setLoadImg(false)}
        onError={() => {
          setImageSrc(fallback);
        }}
        objectFit='cover'
        objectPosition="center top"
        {...rest}
      />
      {!loadImg && children}
    </div>
  );
};

Image.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  alt: PropTypes.string,
  className: PropTypes.string,
  layout: PropTypes.string,
};

Image.defaultProps = {
  alt: '',
  layout: 'responsive',
};

export default AntImage;
