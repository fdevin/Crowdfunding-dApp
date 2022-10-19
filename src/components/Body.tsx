import { DEBUG } from "../constants";

function Body() {

  return (
    <>
        <main>
        <section className="topArea container-fluid">
        <div className="container"/>
        <div className="row TituloCrowdMobile">
            <div className="col-md-8 col-sm-12">
            <h1 className="h1Crowd">
            <span className="cane">Arsmuse</span> 
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
        </section>
        </main>
    </>
  );
}

export default Body;