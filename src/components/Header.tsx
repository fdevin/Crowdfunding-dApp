import { ConnectButton } from "@rainbow-me/rainbowkit";

function Header() {
  // for testing no projects yet
  // const totalPublishedProjs = 0;
  return (
          <header className="container">
            <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
                <a className="navbar-brand anchorLogo" href="#">
                <img src="images/logo-header.svg" alt="Arsmuse Logo"/>
                </a>

                <button className="navbar-toggler btnButtonCollapse" 
                type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon spanButtonCollapse"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                <hr className="hrUp"/>

                <ul className="navbar-nav me-auto ulMarket">
                    <li className="nav-item">
                        <a className="nav-link anchorNavBar marginArchorNav" href="#">Marketplace</a>
                    </li>
                    <li className="nav-item offset-md-1">
                        <a className="nav-link anchorNavBar marginArchorNav" href="#">Crowdfounding</a>
                    </li>
                </ul>

                <ul className="navbar-nav ms-auto">
                    <li className="nav-item dropdown liAyuda">
                        <a className="nav-link dropdown-toggle anchorNavBar" href="#" id="navbarDropdown" 
                        role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Ayuda
                        </a>
                        <ul className="dropdown-menu ulAyuda" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item ulAyudaItemTop" href="#">Centro de Ayuda</a></li>
                        <li><a className="dropdown-item ulAyudaItem " href="#">FAQ</a></li>
                        </ul>
                    </li>

                    <hr className="hrDown"/>

                    <li className="nav-item liIniciarSesion">
                    <a className="nav-link anchorNavBar liSesion" href="#">Iniciar Sesión</a>
                    <div className="lineaVertical hiddenElement"></div>
                    </li>
                </ul>
            
                <div className="divBtnConectar">
                        <ConnectButton
                            showBalance={false}
                            accountStatus={{
                                smallScreen: "avatar",
                                largeScreen: "full",
                            }}
                        />
                </div>

                <div className="divSelect hiddenElement">
                    <form action="">
                    <select defaultValue="1" className="form-select selectIdiomas">
                        <option value="1">ES</option>
                        <option value="2">EN</option>
                        <option value="3">FR</option>
                    </select>
                    </form>
                </div>
                </div>
            </div>
            </nav>
        </header>
  );
}

export default Header;