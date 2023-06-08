import PropTypes from 'prop-types';

import styles from './LoaderSvg.module.css';

const LoaderSvg = ({size}) => {
	return (
		<svg
			className={styles.root}
			viewBox={`0 0 ${size} ${size}`}
			width={size}
			height={size}
		>
			<circle
				className={styles.circle}
				cx={size / 2}
				cy={size / 2}
				r={size / 2}
				fill="none"
				strokeWidth="2"
				strokeMiterlimit="10"
			/>
		</svg>
	);
};

LoaderSvg.propTypes = {
	size: PropTypes.number,
}

export default LoaderSvg;