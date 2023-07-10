import React from 'react';
import AppHeader from '../../components/AppHeader/AppHeader';
import { Outlet } from 'react-router-dom';

import styles from './BaseLayout.module.css';

const BaseLayout = () => {
	return (
		<div className={styles.root}>
			<AppHeader/>
			
			<Outlet/>
		</div>
	);
};

export default BaseLayout;