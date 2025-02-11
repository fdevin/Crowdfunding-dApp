// @ts-nocheck
import { useProvider, useAccount } from "wagmi"
import type { Crowdfactory } from "../contract-types/Crowdfactory";
import { DEBUG, PROJ_CONTRACT_ADDRESS } from "../../constants";
import { useCosts, useGoalAmount, useNumOfContributions, useCostsWFee, useProjTitle, useRaisedAmount, useStocks, useFeePerTier } from "../read";
import { toWei, toBN } from "../utils";
import { useAddRecentTransaction, useConnectModal } from "@rainbow-me/rainbowkit";
import { useCrowdfundingProjectFunctionWriter, useModal } from "../hooks";
import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { ethers, utils } from "ethers";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { usePriceFeed } from "../price-feed";
import axios from 'axios'
import useAsyncEffect from 'use-async-effect'
import { formatEther } from "ethers/lib/utils";
import Modal from "./Modal";

function ProjectView() {
    //const provider = useProvider()
    const acc = useAccount()
    const raisedAmount = useRaisedAmount(PROJ_CONTRACT_ADDRESS);
    const numOfContributions = useNumOfContributions(PROJ_CONTRACT_ADDRESS);
    const [maticPrice, setMaticPrice] = useState([0]);
    const [selectedOption, setSelectedOption] = useState([0]);

    const stockVec = useStocks(PROJ_CONTRACT_ADDRESS);
    const costsVec = useCosts(PROJ_CONTRACT_ADDRESS);
    const costsWFee = useCostsWFee(PROJ_CONTRACT_ADDRESS);
    const feeVec = useFeePerTier(PROJ_CONTRACT_ADDRESS);
    const goalAmount = useGoalAmount(PROJ_CONTRACT_ADDRESS);
    const projTittle = useProjTitle(PROJ_CONTRACT_ADDRESS);
    const { openConnectModal } = useConnectModal();
    const [amount, setAmount] = useState<string>("");
    const { isOpen, toggle } = useModal();

    // custom hook we made in hooks.ts for writing functions
    const { writeAsync, isError } = useCrowdfundingProjectFunctionWriter({
        contractAddress: PROJ_CONTRACT_ADDRESS || "",
        functionName: "makeDonation",
    });

    const addRecentTransaction = useAddRecentTransaction();

    const handleClick = () => {
        if (!acc.isConnected) {
            alert("need to connect your acc");

            openConnectModal && openConnectModal()

            return;
            // Todo:: add backendcheck once an acc is logged in.

        } else {
            console.log(acc.address)
        }

    }

    // onChange handler for amount
    const handleAmount = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const value = e.target.value;
        DEBUG && console.log("amount: ", value);

        // set amount
        setAmount(value);
    };

    const handleDonate = async (option: number) => {
        console.log("MAAAATIC")
        console.log(maticPrice)
        setSelectedOption(option)
        toggle(true)
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    };

    const handleDonateTransaction = async () => {

        if (!acc.isConnected) {
            alert("need to connect your acc");

            openConnectModal && openConnectModal()
            return;
        }
        if (selectedOption > 7) {
            console.log("Invalid value");
            DEBUG && console.log("Invalid Option Value");
        }

        if (costsVec != undefined) {
            console.log("inicia")
            if (selectedOption == 7) {

                const freeAmount = toWei((maticPrice * (amount * 1.02)).toString())

                if (freeAmount.isZero()) {
                    return;
                }

                const tx = await writeAsync({
                    args: [selectedOption],
                    overrides: {
                        value: freeAmount,
                        gasLimit: 10000000,

                    },
                });
                console.log("tx >>> ", tx);

                addRecentTransaction({
                    hash: tx.hash,
                    description: `Donate ${freeAmount} MATIC`,
                });
            } else {

                const optionCost = costsWFee[selectedOption];
                //const fee = optionCost.mul(toBN(2))
                //const feeAmount = fee.div(100)
                //console.log(feeAmount.toString())
                //const optionFee = optionCost.add(feeAmount);
                //console.log("option fee");

                console.log(optionCost)
                const tx = await writeAsync({
                    args: [selectedOption],
                    overrides: {
                        value: optionCost,
                        gasLimit: 10000000,
                    },
                });
                console.log("tx >>> ", tx);

                addRecentTransaction({
                    hash: tx.hash,
                    description: `Donate ${optionCost} MATIC`,
                });
            }


        } else {
            DEBUG && console.log("Cannot retrieve the right value");
            return
        }


    };

    const getActualDonationString = () => {
        if (raisedAmount == undefined || goalAmount == undefined) {
            return ""
        }
        var numRaisedAmount = parseFloat(utils.formatEther(raisedAmount))
        var numGoalAmount = parseFloat(utils.formatEther(goalAmount))

        var currentPercentage = numRaisedAmount * 100 / numGoalAmount

        return `${currentPercentage.toFixed(3)}% recaudado de ${maticToUSD(numGoalAmount)} USD`
    }

    const maticContribution = () => {
        if (raisedAmount != undefined) {
            return utils.formatEther(raisedAmount)
        }
        else {
            return "";
        }
    };

    useAsyncEffect(async () => {
        const currPrice = await usePriceFeed()
        setMaticPrice(currPrice)
        console.log(costsVec)
    }, []);

    const maticToUSD = (maticAmount: any) => {
        if (maticPrice)
            return (maticAmount * maticPrice).toFixed(3)
        else {
            return 0
        }
    };
    const getOptUSDPrice = (option: any) => {
        if (costsVec) {
            return maticToUSD(formatEther(costsVec[option]))
        }
        else return 0
    }

    return (
        <>
            <main className="mainBackground">
                {costsVec && costsWFee && feeVec &&
                    <Modal isOpen={isOpen} toggle={toggle}>
                        {(selectedOption != 7) && <>
                            <div>
                                <h2>Vas a donar $ {maticToUSD(formatEther(costsVec[selectedOption]))}</h2>
                            </div>
                            <div>
                                Tu donación nos ayuda a generar más y mejores proyectos, muchas gracias! Si necesitas ayuda para continuar,<a>haz click aquí</a> , de lo contrario continúa el proceso debajo de estas líneas.
                            </div>
                            <div style={{ "display": "block", "flexDirection": "column", "marginTop": "10px" }}>
                                <div>Tu donación: $ {maticToUSD(formatEther(costsVec[selectedOption]))}</div>
                                <div>Fee administrativo: $ {maticToUSD(formatEther(feeVec[selectedOption]))}</div>
                                <div>Total: $ {maticToUSD(formatEther(costsWFee[selectedOption]))} ({formatEther(costsWFee[selectedOption])} MATIC)</div>
                            </div>
                            <div style={{ "display": "flex", "flexDirection": "column", "align-items": "center", "justifyContent": "center" }}>
                                <a onClick={() => { handleDonateTransaction() }} className="CTA">Donar</a>
                            </div>
                            <div>
                                <span>Al hacer la donación el usuario acepta los términos y condiciones.</span>
                            </div>
                            <div>
                                <span>Tasa de cambio referencial: {maticPrice}$ por Matic</span>
                            </div>
                        </>

                        }
                        {(selectedOption == 7) && <>
                            <div>
                                <h2>Vas a donar ${amount}</h2>
                            </div>
                            <div>
                                Tu donación nos ayuda a generar más y mejores proyectos, muchas gracias! Si necesitas ayuda para continuar,<a>haz click aquí</a> , de lo contrario continúa el proceso debajo de estas líneas.
                            </div>
                            <div style={{ "display": "block", "flexDirection": "column", "marginTop": "10px" }}>
                                <div>Tu donación: $ {amount}</div>
                                <div>Fee administrativo: $ {amount - amount / 1.02}</div>
                                <div>Total: $ {amount * 1.02} ({maticPrice * (amount * 1.02)} MATIC)</div>
                            </div>
                            <div style={{ "display": "flex", "flexDirection": "column", "align-items": "center", "justifyContent": "center" }}>
                                <a onClick={() => { handleDonateTransaction() }} className="CTA">Donar</a>
                            </div>
                            <div>
                                <span>Al hacer la donación el usuario acepta los términos y condiciones.</span>
                            </div>
                            <div>
                                <span>Tasa de cambio referencial: {maticPrice}$ por Matic</span>
                            </div>
                        </>

                        }

                    </Modal>}
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
                                                <h2>{projTittle}</h2>
                                                de <a className="anchorArtistName" href="#">Nombre de Artista</a>
                                                <p className="bigger">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                                </p>
                                            </div>

                                        </div>
                                        <div className="progressArea">
                                            <div className="upperProgress">
                                                <div className="topProg">
                                                    <span className="bolder">{maticToUSD(maticContribution())} </span>
                                                    USD contribuidos
                                                </div>
                                                <div className="rightProg"><span className="bolder">{numOfContributions?.toString()}</span> Contribuyentes</div>
                                            </div>
                                            <ProgressBar now={raisedAmount?.mul(100).div(goalAmount || 1).toString()} />

                                            <div className="lowerProgress">
                                                <div className="leftProg">{getActualDonationString()}</div>
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
                                                aria-describedby="amount" onChange={handleAmount} />
                                            <span className="input-group-text" id="amount">USD</span>
                                        </div>
                                        <p className="bigger">Apoya el proyecto sin recompensa, simplemente porque te resulta
                                            interesante.</p>
                                        <a onClick={() => { handleDonate(7) }} className="CTA">Contribuir</a>
                                    </div>
                                </div>
                                <div className="rewardCard prizes">
                                    <div className="prizeScale">
                                        <h3>Bronce</h3>
                                    </div>
                                    <div className="rewardCardBody">
                                        <p className="bigNum">{getOptUSDPrice(0)} USD</p>
                                        <p className="itemReward">Reward Name</p>
                                        <p>Apoya el proyecto sin recompensa, simplemente porque te resulta
                                            interesante.</p>
                                        <div className="smaller"><p>Incluye:</p>
                                            <ul><li>Lorem Ipsum</li>
                                                <li>Lorem Ipsum</li></ul>
                                        </div>
                                        <p className="bigger">Sí, quiero ser contribuyente nivel bronce!</p>
                                        <a onClick={() => { handleDonate(0) }} className="CTA">Contribuir</a>
                                        <p className="backers">22 patrocinadores</p>
                                    </div>
                                </div>
                                <div className="rewardCard prizes">
                                    <div className="prizeScale">
                                        <h3>Plata</h3>
                                    </div>
                                    <div className="rewardCardBody">
                                        <p className="bigNum">{getOptUSDPrice(1)} USD</p>
                                        <p className="itemReward">Reward Name</p>
                                        <p>Apoya el proyecto sin recompensa, simplemente porque te resulta
                                            interesante.</p>
                                        <div className="smaller"><p>Incluye:</p>
                                            <ul><li>Lorem Ipsum</li>
                                                <li>Lorem Ipsum</li></ul>
                                        </div>
                                        <p className="bigger">Sí, quiero ser contribuyente nivel plata!</p>
                                        <a onClick={() => { handleDonate(1) }} className="CTA">Contribuir</a>
                                        <p className="backers">22 patrocinadores</p>
                                    </div>
                                </div>
                                <div className="rewardCard prizes">
                                    <div className="prizeScale">
                                        <h3>Oro</h3>
                                    </div>
                                    <div className="rewardCardBody">
                                        <p className="bigNum">{getOptUSDPrice(2)}  USD</p>
                                        <p className="itemReward">Reward Name</p>
                                        <p>Apoya el proyecto sin recompensa, simplemente porque te resulta
                                            interesante.</p>
                                        <div className="smaller"><p>Incluye:</p>
                                            <ul><li>Lorem Ipsum</li>
                                                <li>Lorem Ipsum</li></ul>
                                        </div>
                                        <p className="bigger">Sí, quiero ser contribuyente nivel oro!</p>
                                        <a onClick={() => { handleDonate(2) }} className="CTA">Contribuir</a>
                                        <p className="backers">22 patrocinadores</p>
                                    </div>
                                </div>
                                <div className="rewardCard prizes">
                                    <div className="prizeScale">
                                        <h3>Diamante</h3>
                                    </div>
                                    <div className="rewardCardBody">
                                        <p className="bigNum">{getOptUSDPrice(3)} USD</p>
                                        <p className="itemReward">Reward Name</p>
                                        <p>Apoya el proyecto sin recompensa, simplemente porque te resulta
                                            interesante.</p>
                                        <div className="smaller"><p>Incluye:</p>
                                            <ul><li>Lorem Ipsum</li>
                                                <li>Lorem Ipsum</li></ul>
                                        </div>
                                        <p className="bigger">Sí, quiero ser contribuyente nivel diamante!</p>
                                        <a onClick={() => { handleDonate(3) }} className="CTA">Contribuir</a>
                                        <p className="backers">22 patrocinadores</p>
                                    </div>
                                </div>
                                <div className="rewardCard prizes">
                                    <div className="prizeScale">
                                        <h3>Platino</h3>
                                    </div>
                                    <div className="rewardCardBody">
                                        <p className="bigNum">{getOptUSDPrice(4)} USD </p>
                                        <p className="itemReward">Reward Name</p>
                                        <p>Apoya el proyecto sin recompensa, simplemente porque te resulta
                                            interesante.</p>
                                        <div className="smaller"><p>Incluye:</p>
                                            <ul><li>Lorem Ipsum</li>
                                                <li>Lorem Ipsum</li></ul>
                                        </div>
                                        <p className="bigger">Sí, quiero ser contribuyente nivel platino!</p>
                                        <a onClick={() => { handleDonate(4) }} className="CTA">Contribuir</a>
                                        <p className="backers">22 patrocinadores</p>
                                    </div>
                                </div>
                                <div className="rewardCard prizes">
                                    <div className="prizeScale">
                                        <h3>Paladio</h3>
                                    </div>
                                    <div className="rewardCardBody">
                                        <p className="bigNum">{getOptUSDPrice(5)}   USD</p>
                                        <p className="itemReward">Reward Name</p>
                                        <p>Apoya el proyecto sin recompensa, simplemente porque te resulta
                                            interesante.</p>
                                        <div className="smaller"><p>Incluye:</p>
                                            <ul><li>Lorem Ipsum</li>
                                                <li>Lorem Ipsum</li></ul>
                                        </div>
                                        <p className="bigger">Sí, quiero ser contribuyente nivel paladio!</p>
                                        <a onClick={() => { handleDonate(5) }} className="CTA">Contribuir</a>
                                        <p className="backers">22 patrocinadores</p>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </section>
                <div className="marginGradientBG">
                    <img src="images/bg-foot2.png" alt="" className="footerGradienteImg" />
                </div>
            </main>
        </>
    );
}

export default ProjectView;