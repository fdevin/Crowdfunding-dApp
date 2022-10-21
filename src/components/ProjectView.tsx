import {useProvider,useAccount} from "wagmi"
import type { Crowdfactory } from "../contract-types/Crowdfactory";
import { DEBUG ,PROJ_CONTRACT_ADDRESS } from "../../constants";
import { useCosts, useGoalAmount,useStocks } from "../read";
import { toWei,toBN } from "../utils";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { useCrowdfundingProjectFunctionWriter } from "../hooks";




function ProjectView() {
    //const provider = useProvider()
    const acc = useAccount()
    const raisedAmount = useGoalAmount(PROJ_CONTRACT_ADDRESS);
    const stockVec = useStocks(PROJ_CONTRACT_ADDRESS);
    const costsVec = useCosts(PROJ_CONTRACT_ADDRESS);

 
    const addRecentTransaction = useAddRecentTransaction();

    const handleClick = () => {
        if(!acc.isConnected){
            alert("need to connect your acc");
        } else {
            console.log(acc.address)
        }

    
        console.log(costsVec)
        console.log(raisedAmount)
        console.log(stockVec)
    }

    const handleDonate = async (option: number) => {
        if(option>7) {
            console.log("Invalid value");
            DEBUG && console.log("Invalid Option Value");
        }
        if(costsVec!=undefined){
            console.log("inicia")
            const optionCost = costsVec[option];
            const fee = optionCost.mul(toBN(2))
            const feeAmount = fee.div(100)
            console.log(feeAmount.toString())
            const optionFee = optionCost.add(feeAmount);
            console.log("option fee");

            console.log(optionFee);

        
        } 

            /*const tx = await writeAsync({
                overrides: {
                  value: optionFee,
                },
              });
              
            console.log("tx >>> ", tx);

            addRecentTransaction({
                hash: tx.hash,
                description: `Donate ${optionFee} MATIC`,
              });

        } else {
            DEBUG && console.log("Cannot retrieve the right value");
            return
        }*/
      };

  return (
    <>
        <main className="mainBackground">
            <section className="container-fluid">
                <div className="container paddingBottom">
                    <div className="row mainProject">
                        <div className="cardInnerSingle row">
                            <div className="col-lg-5 col-md-4 col-sm-12">
                                <div className="ImgArtist">
                                    <img className="artistMain roundedList" src="images/ars00.jpg" alt="" />
                                </div>
                            </div>
                            <div className="col-lg-7 col-md-5 col-sm-12">
                                <div className="cardBodyInner">
                                    <div className="divArtist">
                                        <div className="divPadding">
                                            <h2>Nombre del Proyecto</h2>
                                            de <a className="anchorArtistName" href="#">Nombre de Artista</a>
                                            <p className="bigger">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="progressArea">
                                        <div className="upperProgress">
                                            <div className="topProg">
                                                <span className="bolder">811</span> 
                                                USD contribuidos
                                            </div>
                                            <div className="rightProg"><span className="bolder">25</span> Contribuyentes</div>
                                        </div>
                                        <div className="progress">
                                            <div className="progress-bar w-75" role="progressbar" aria-valuenow="75"
                                                aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <div className="lowerProgress">
                                            <div className="leftProg">11% recaudado de 8000 USD</div>
                                            <div className="rightProg"><span className="bolder">25</span> D&iacute;as resteantes
                                            </div>
                                        </div>
                                    </div>

                                    <div className="buttonSocial">
                                        <a className="CTA" href="#">Contribuir al proyecto</a>
                                        <button className="btn btn-outline-dark btnSeguir" type="button">
                                            <div className="btnContenidoFlex">
                                                <img className="btnIcon" src="images/icon-heart.png"
                                                    alt="add to favorites" />
                                                <span>
                                                    <a href="#">Seguir </a></span>
                                            </div>
                                        </button>
                                        <div className="socialArea">
                                            <a className="btnIconos" href="#" role="button">
                                                <div className="iconFacebook"></div>
                                            </a>
                                            <a className="btnIconos" href="#" role="button">
                                                <div className="iconTwitter"></div>
                                            </a>
                                            <a className="btnIconos" href="#" role="button">
                                                <div className="iconClip"></div>
                                            </a>
                                        
                                        </div>
                                    </div>

                                    <div className="categories">    
                                        <a className="anchorArtistName" href="#">Conciertos</a>, 
                                        <a className="anchorArtistName" href="#">Buenos Aires, Argentina</a>
                                    </div>
                                
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="singleMain">
                <div className="container paddingBottom">
                    <div className="row">
                        <div className="col-12 col-md-7">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est.</p>

                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum aute
                                irure dolo.</p>

                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum velit
                                esse cillum dolore eu fugiat nulla pariatur.</p>
                        </div>

                        <aside className="col-sm-12 col-md-4">
                            <h2>Apoyar Este Proyecto</h2>
                            <div className="rewardCard">
                                <div className="rewardCardBody">
                                <h3>Contribuir sin Recompensa</h3>
                                <div className="input-group mb-3 greenInput">
                                    <input type="text" className="form-control" placeholder="15" aria-label="15"
                                        aria-describedby="amount"/>
                                    <span className="input-group-text" id="amount">USD</span>
                                </div>
                                <p className="bigger">Apoya el proyecto sin recompensa, simplemente porque te resulta
                                    interesante.</p>
                                    <a  onClick={()=>{handleDonate(7)}} className="CTA">Contribuir</a>
                            </div>
                            </div>
                            <div className="rewardCard prizes">
                                <div className="prizeScale">
                                <h3>Bronce</h3>
                            </div>
                            <div className="rewardCardBody">
                                <p className="bigNum">150 USD</p>
                                <p className="itemReward">Reward Name</p>
                                <p>Apoya el proyecto sin recompensa, simplemente porque te resulta
                                    interesante.</p>
                                    <div className="smaller"><p>Incluye:</p>
                                    <ul><li>Lorem Ipsum</li>
                                        <li>Lorem Ipsum</li></ul>    
                                    </div>
                                    <p className="bigger">Sí, quiero ser contribuyente nivel bronce!</p>
                                <a onClick={()=>{handleDonate(0)}}  className="CTA">Contribuir</a>
                                <p className="backers">22 patrocinadores</p>
                            </div>
                            </div>
                            <div className="rewardCard prizes">
                                <div className="prizeScale">
                                <h3>Plata</h3>
                            </div>
                            <div className="rewardCardBody">
                                <p className="bigNum">200 USD</p>
                                <p className="itemReward">Reward Name</p>
                                <p>Apoya el proyecto sin recompensa, simplemente porque te resulta
                                    interesante.</p>
                                    <div className="smaller"><p>Incluye:</p>
                                    <ul><li>Lorem Ipsum</li>
                                        <li>Lorem Ipsum</li></ul>    
                                    </div>
                                    <p className="bigger">Sí, quiero ser contribuyente nivel plata!</p>
                                <a  onClick={()=>{handleDonate(1)}} className="CTA">Contribuir</a>
                                <p className="backers">22 patrocinadores</p>
                            </div>
                            </div>
                            <div className="rewardCard prizes">
                                <div className="prizeScale">
                                <h3>Oro</h3>
                            </div>
                            <div className="rewardCardBody">
                                <p className="bigNum">500 USD</p>
                                <p className="itemReward">Reward Name</p>
                                <p>Apoya el proyecto sin recompensa, simplemente porque te resulta
                                    interesante.</p>
                                    <div className="smaller"><p>Incluye:</p>
                                    <ul><li>Lorem Ipsum</li>
                                        <li>Lorem Ipsum</li></ul>    
                                    </div>
                                    <p className="bigger">Sí, quiero ser contribuyente nivel oro!</p>
                                <a  onClick={()=>{handleDonate(2)}} className="CTA">Contribuir</a>
                                <p className="backers">22 patrocinadores</p>
                            </div>
                            </div>
                            <div className="rewardCard prizes">
                                <div className="prizeScale">
                                <h3>Diamante</h3>
                            </div>
                            <div className="rewardCardBody">
                                <p className="bigNum">750 USD</p>
                                <p className="itemReward">Reward Name</p>
                                <p>Apoya el proyecto sin recompensa, simplemente porque te resulta
                                    interesante.</p>
                                    <div className="smaller"><p>Incluye:</p>
                                    <ul><li>Lorem Ipsum</li>
                                        <li>Lorem Ipsum</li></ul>    
                                    </div>
                                    <p className="bigger">Sí, quiero ser contribuyente nivel diamante!</p>
                                <a onClick={()=>{handleDonate(3)}} className="CTA">Contribuir</a>
                                <p className="backers">22 patrocinadores</p>
                            </div>
                            </div>
                            <div className="rewardCard prizes">
                                <div className="prizeScale">
                                <h3>Platino</h3>
                            </div>
                            <div className="rewardCardBody">
                                <p className="bigNum">1000 USD</p>
                                <p className="itemReward">Reward Name</p>
                                <p>Apoya el proyecto sin recompensa, simplemente porque te resulta
                                    interesante.</p>
                                    <div className="smaller"><p>Incluye:</p>
                                    <ul><li>Lorem Ipsum</li>
                                        <li>Lorem Ipsum</li></ul>    
                                    </div>
                                    <p className="bigger">Sí, quiero ser contribuyente nivel platino!</p>
                                <a onClick={()=>{handleDonate(4)}}  className="CTA">Contribuir</a>
                                <p className="backers">22 patrocinadores</p>
                            </div>
                            </div>
                            <div className="rewardCard prizes">
                                <div className="prizeScale">
                                <h3>Paladio</h3>
                            </div>
                            <div className="rewardCardBody">
                                <p className="bigNum">2500 USD</p>
                                <p className="itemReward">Reward Name</p>
                                <p>Apoya el proyecto sin recompensa, simplemente porque te resulta
                                    interesante.</p>
                                    <div className="smaller"><p>Incluye:</p>
                                    <ul><li>Lorem Ipsum</li>
                                        <li>Lorem Ipsum</li></ul>    
                                    </div>
                                    <p className="bigger">Sí, quiero ser contribuyente nivel paladio!</p>
                                <a onClick={()=>{handleDonate(5)}}  className="CTA">Contribuir</a>
                                <p className="backers">22 patrocinadores</p>
                            </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
            <div className="marginGradientBG">
                <img src="images/bg-foot2.png" alt="" className="footerGradienteImg"/>
            </div>
        </main>
    </>
  );
}

export default ProjectView;