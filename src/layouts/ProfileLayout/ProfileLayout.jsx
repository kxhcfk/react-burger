import { Outlet } from 'react-router-dom';
import ProfileSidebar from '../../components/ProfileSidebar/ProfileSidebar';
import styles from './ProfileLayout.module.css';

const ProfileLayout = () => {
	return (
		<main className="pt-30 pb-30">
			<div className="container">
				<div className={styles.wrapper}>
					<ProfileSidebar/>
					
					<Outlet/>
				</div>
			</div>
		</main>
	);
};

export default ProfileLayout;