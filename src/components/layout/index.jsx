import { Outlet } from "react-router-dom";
import Header from '../header/header';
import Footer from '../footer/index';

const Layout = () => {
  const { pathname } = useLocation();
  const excludedRoutes = ['signin', 'signup', 'reset'];
  const noHeadOrFoot = excludedRoutes.includes(pathname.split('/')[1]);

  return (
    <>
      {!noHeadOrFoot && <Header />}
      <main>
        <Outlet />
      </main>
      {!noHeadOrFoot && <Footer />}
    </>
  );
};

export default Layout;
