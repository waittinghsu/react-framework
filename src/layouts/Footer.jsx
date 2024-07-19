import React, { useState } from 'react';
import './styles/Footer.scss';

const Footer = () => {
	const [visible, setVisible] = useState(false);

	return (
			<footer
					className={`footer ${visible ? 'footer-visible' : ''}`}
					onMouseEnter={() => setVisible(true)}
					onMouseLeave={() => setVisible(false)}
			>
				<div className="footer-content">
					<p>Footer Content</p>
				</div>
			</footer>
	);
};

export default Footer;
