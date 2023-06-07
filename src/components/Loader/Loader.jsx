import LoaderSvg from './LoaderSvg';

import styles from './Loader.module.css';

const Loader = ({size = 50}) => {
	return (
		<div className={styles.root}>
			<LoaderSvg size={size}/>
		</div>
	);
};

export default Loader;