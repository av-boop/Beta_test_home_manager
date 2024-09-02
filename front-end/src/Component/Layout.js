import NavMenu from "./Common/Header/NavMenu";
import AllRoutes from "./AllRoutes";

function Layout() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <NavMenu/>
          </div>
          <div className="col-md-10">
            <AllRoutes />
          </div>
        </div>
      </div>
    );
}

export default Layout;