
function Footer() {
  // for testing no projects yet
  // const totalPublishedProjs = 0;

  return (
    <>
    <footer className="footerBG">
      <div className="logoVerdeFooter">
        <img src="images/logoFooter.svg" className="footerLogo"/>
      </div>

      <div className="container">
        
        <div className="container text-center text-white">
          <div className="container paddingFooter">
            <section>
              <a className="btnIconos" href="#" role="button">
                  <div className="iconTwitter"></div>
              </a>
              <a className="btnIconos" href="#" role="button">
                  <div className="iconFacebook"></div>
              </a>
              <a className="btnIconos" href="#" role="button">
                  <div className="iconInstagram"></div>
              </a>
              <a className="btnIconos" href="#" role="button">
                  <div className="iconLinkedin"></div>
              </a>
              <a className="btnIconos" href="#" role="button">
                  <div className="iconMedium"></div>
              </a>
              <a className="btnIconos" href="#" role="button">
                  <div className="iconDiscord"></div>
              </a>
              <a className="btnIconos" href="#" role="button">
                  <div className="iconTelegram"></div>
              </a>
            </section>
          </div>
        </div>

        <div className="row divNavPills">
          <div className="col-md-12">
            <ul className="nav nav-pills nav-fill">
              <li className="nav-item">
                <a className="nav-link anchorNavPillsFooter" href="#">Litepaper</a>
              </li>
              <li className="nav-item">
                <a className="nav-link anchorNavPillsFooter" href="#">Contacto</a>
              </li>
              <li className="nav-item">
                <a className="nav-link anchorNavPillsFooter" href="#">
                  Términos y condiciones
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link anchorNavPillsFooter" href="#">Privacidad</a>
              </li>
              <li className="nav-item">
                <p className="nav-link derechosReservadosFooter">
                  © 2022 ArsMuse Todos los Derechos Reservados.
                </p>
              </li>
            </ul>
          </div>
        </div> 

      </div>
    
  </footer>
    </>
  );
}

export default Footer;