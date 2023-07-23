import { FC } from "react";

import styles from './LoaderSvg.module.css';

type TLoaderSvg = {
	size?: number;
}

const LoaderSvg: FC<TLoaderSvg> = ({size= 50}) => {
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

export default LoaderSvg;