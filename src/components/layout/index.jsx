import { Outlet } from "react-router-dom";
import Header from '../header/header';
import Footer from '../footer/index';

const Layout = () => {
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
};

export default Layout;
