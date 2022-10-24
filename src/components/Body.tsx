import React, { useState } from 'react';
import { useAccount } from "wagmi";
import ProjectView from "./ProjectView";
function Body() {
  const [isDonationViewActive, setisDonationViewActive] = useState(false);

  const handleClick = () => {
    setisDonationViewActive(!isDonationViewActive)
  }
  if (!isDonationViewActive) {
    return (
      <>
        <main>
          <section className="topArea container-fluid">
            <div className="container">
              <div className="row TituloCrowdMobile">
                <div className="col-md-8 col-sm-12">
                  <h1 className="h1Crowd">
                    <span className="cane">Arsmuse </span>
                    Crowdfunding
                  </h1>
                  <p className="intro">Deja que tus fans más dedicados apoyen tu trabajo creativo mediante proyectos
                    de Crowdfunding.
                  </p>
                </div>
              </div>
              <div className="row whatIs">
                <div className="col-lg-6 col-md-8 col-sm-12">
                  <h2 className="h2Mobile">¿Qué es Crowdfunding?</h2>
                  <p>Apoyar una idea de crowdfunding significa ayudar a un proyecto, una idea o un artista en curso. Arsmuse es
                    tu destino para apoyar a tus artistas favoritos con beneficios y precios especiales para los primeros
                    patrocinadores.
                    Para agradecer a sus patrocinadores por su apoyo, los creadores de proyectos ofrecen recompensas únicas como
                    una muestra de lo que tienen pensado crear.
                  </p>
                  <div className="buttonsRow">
                    <div>
                      <a className="CTACrowd" href="#">Explorar</a>
                    </div>
                    <div>
                      <a className="ghostCrowd" href="#">Ver m&aacute;s</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="mediumArea container-fluid divParrafo">

            <div className="container">

              <div className="row">

                <h2 className="text-center h2Mobile">Beneficios para los patrocinadores</h2>

                <div className="col-lg-6 col-md-8 col-sm-12">

                  <div className="contenedorImagsPatrocinadores">

                    <div className="divImagenesPatrocinadores">

                      <img src="images/antoniShkrabaProduction.png" alt="" />
                      <img src="images/erikMclean.png" alt="" className="imgMargin" />

                    </div>

                    <div className="divImagenPatrocinadores">
                      <img src="images/mariusMasalar.png" alt="" className="imgMargin" />
                    </div>
                  </div>

                </div>

                <div className="col-lg-6 col-md-8 col-sm-12">
                  <p className="parrafoMediumArea">
                    ¡Hay muchas maneras de ayudar! <br /><br />
                    Las recompensas permiten que los creadores compartan una pieza de su proyecto con la
                    comunidad que los apoyó. Por lo general, se trata de experiencias únicas, ediciones
                    limitadas o copias del trabajo creativo que se está produciendo. <br /><br />
                    Hay diferentes niveles de recompensas en base a la contribución realizada. <br /><br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua. Ut enim Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim<br />
                  </p>

                  <div className="parrafoMediumArea btnCenterMobile">

                    <button className="btn btn-outline-dark btnCardPatrocinado colorMasBorderYellow" type="button">
                      <div className="btnContenidoFlex">
                        <span>
                          <a className="colorMasBorderYellow" href="#">Ver m&aacute;s </a>
                        </span>
                      </div>
                    </button>

                  </div>
                </div>
              </div>

            </div>

          </section>


          <section className="mediumArea divProyectoCrowd container-fluid">

            <div className="container paddingBottom">
              <div className="divArtistName">

                <div className="disPlayArtistName">
                  <h2 className="artistName h2Mobile"> Nombre del Proyecto </h2>
                </div>

                <div className="disPlayAnchorArtistName">
                  <h6 className="artistName"> de
                    <a className="anchorArtistName" href="#"> Artist Name </a>
                  </h6>
                </div>

              </div>

              <div className="row">

                <div className="col-lg-6 col-md-8 col-sm-12">

                  <div className="contenedorImgArtist">

                    <img src="images/artistName.png" alt="" />
                  </div>

                </div>

                <div className="col-lg-6 col-md-8 col-sm-12">

                  <div className="divArtist">

                    <div>
                      <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                        ut aliquip ex ea commodo consequat. Duis aute irure
                      </span>
                    </div>

                    <div className="divPadding">

                      <div className="progress">
                        <div
                          className="progress-bar w-75"
                          role="progressbar"
                          aria-valuenow="75"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>

                      <p className="parrafoContribucion">
                        <span className="spanParrafo"> USD 811 contribuido </span> <br />
                        20% recaudado <br />
                        39 días restantes <br />
                      </p>

                    </div>

                  </div>

                  <div className="anchorBottomArtist divPadding">

                    <div className="anchorFlex">
                      <a className="anchorArtistName" href="#">Conciertos</a>
                      <a className="anchorArtistName" href="#">Buenos Aires, Argentina</a>
                    </div>


                    <button className="btn btn-outline-dark btnCardPatrocinado colorMasBorderYellow" onClick={handleClick} type="button">
                      <div className="btnContenidoFlex">
                        <span>
                          Ver m&aacute;s
                        </span>
                      </div>
                    </button>

                  </div>
                </div>
              </div>
            </div>

            <hr />


            <div className="container divContenedor">

              <div className="row divCreacionProyecto text-center">

                <div className="col-lg-6">

                  <h2 className="h2Mobile">¿Tienes un Proyecto?</h2>

                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris.
                  </p>

                  <div className="btnCrear">
                    <a className="CTA " href="#"> Crear un Proyecto </a>
                  </div>
                </div>
              </div>
            </div>

          </section>


          <section className="seccionSuscribirse">

            <div className="gradienteImg">

              <div className="container divContenedor">

                <div className="row divCreacionProyecto text-center">

                  <div className="divTextoSuscribir">
                    <h2 className="h2Mobile">¡Suscríbete a nuestro newsletter!</h2>

                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br />
                      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>

                  <div className="col-lg-5">
                    <input
                      type="text"
                      className="form-control inputsFormSuscribir"
                      placeholder="Tu mail"
                    />
                  </div>

                  <div className="col-lg-2">

                    <a className="ghostSuscribir" href="#"> SUSCRIBIR </a>

                  </div>
                </div>
              </div>


            </div>

          </section>

        </main>
      </>
    );
  } else {
    return (<ProjectView />);
  }

}

export default Body;