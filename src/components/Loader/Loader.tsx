import { FC } from "react";
import LoaderSvg from './LoaderSvg';

import styles from './Loader.module.css';

type TLoaderProps = {
	size?: number;
}

const Loader: FC<TLoaderProps> = ({size = 50}) => {
	return (
		<div className={styles.root}>
			<LoaderSvg size={size}/>
		</div>
	);
};

export default Loader;