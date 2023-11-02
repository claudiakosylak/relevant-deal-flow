import React from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import styles from "./Navigation.module.sass";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul className={styles.wrapper}>
			<li>
				<h1 className={styles.logo}>Relevant Deal Flow</h1>
			</li>
			<div className={styles.right}>
				{isLoaded && (
					<li>
						<ProfileButton user={sessionUser} />
					</li>
				)}
			</div>
		</ul>
	);
}

export default Navigation;
