import React from "react"
import "@/styles/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram, faPinterestP, faYoutube, faLinkedinIn,  faTiktok} from "@fortawesome/free-brands-svg-icons";
import "@/App.css"

const currentYear = new Date().getFullYear();

function Footer() {
    return (
        <footer className="footer bg-[#0f145b] text-white mt-20 py-8">
            <div className="px-4">

                <div className="flex flex-wrap">
                    <div className="footer-description flex flex-col w-full md:w-[50%]">
                        <div className="footer flex items-center gap-4">
                            <img className="footer-logo w-16 h-16 sm:w-13 sm:h-13" src="src/assets/fyonka.png" alt="Fyonka Logo" />
                            <h1 className="text-2xl font-semibold md:mt-4 sm:mt-3 xs:mt-5 custom1:mt-4">FYONKA</h1>
                        </div>
                        <p className="description text-lg font-medium italic text-gray-300 sm:text-center leading-relaxed md:mt-5 xs:mt-3 xs:text-center custom1:mt-2 custom1:w-[90%]">
                        Fyonka is your go-to for gifting. Shop bespoke and custom-made gift boxes to friends and family. Shop from our online collection of ready-made gift boxes, build your own gift box or customize corporate gift boxes.
                        </p>
                    </div>

                    <div className="footer-links w-full md:w-[25%] mt-6 md:mt-10 only-532-1040">
                        <h3 className="flex-links text-lg font-bold">Links</h3>
                        <div className="footer-flex-links flex gap-20 mt-4 footer-icons">
                            <ul className="list-none">
                                <li><a href="/about" className="text-gray-400 hover:text-white">About</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Gift Tips</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Press</a></li>
                            </ul>
                            <ul className=" list-none">
                                <li><a href="#" className="text-gray-400 hover:text-white">FAQs</a></li>
                                <li><a href="/contact" className="text-gray-400 hover:text-white">Contact Us</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-contact w-full md:w-[25%] mt-6 md:mt-10 text-center md:text-left items-center md:items-start only-532-1040">
                        <h3 className="text-lg font-bold">Let's Chat</h3>
                        <p className="text-gray-300 mt-2">Questions? We're here for you Sunday to Thursday 10am to 6pm EET.</p>
                        <hr className="my-4 border-gray-600" />
                        <p className="text-gray-300">
                        <a href="mailto:hello@giftopia.com" className="hover:text-white">hello@fyonka.com</a> | +2 01285057040
                        </p>
                        <hr className="my-4 border-gray-600" />
                        <div className="footer-icons text-xl flex gap-4 mt-4 flex-wrap">
                            <a href="https://www.facebook.com/giftopiia" target="_blank" className="text-gray-300 hover:text-white"><FontAwesomeIcon icon={faFacebookF} /></a>
                            <a href="https://x.com/i/flow/login?redirect_after_login=%2Fgiftopiia" target="_blank" className="text-gray-300 hover:text-white"><FontAwesomeIcon icon={faTwitter} /></a>
                            <a href="https://www.instagram.com/giftopiia" target="_blank" className="text-gray-300 hover:text-white"><FontAwesomeIcon icon={faInstagram} /></a>
                            <a href="https://www.pinterest.com/giftopiia/_saved/" target="_blank" className="text-gray-300 hover:text-white"><FontAwesomeIcon icon={faPinterestP} /></a>
                            <a href="https://www.youtube.com/channel/UC5whQ0r5_IfLHXeWZU9-2ug" target="_blank" className="text-gray-300 hover:text-white"><FontAwesomeIcon icon={faYoutube} /></a>
                            <a href="https://www.linkedin.com/company/giftopiia/" target="_blank" className="text-gray-300 hover:text-white"><FontAwesomeIcon icon={faLinkedinIn} /></a>
                            <a href="https://www.tiktok.com/@giftopiia" target="_blank" className="text-gray-300 hover:text-white"><FontAwesomeIcon icon={faTiktok} /></a>
                        </div>
                    </div>
                </div>


                <div className="bottom-links mt-12 text-center md:text-left">
                    <p className="text-sm font-medium text-gray-300">
                        Fyonka <span className="mx-2">|</span> Online Gift shop <span className="mx-2">|</span> 26 Abd El-Moneim Riad, Kafr Abdo <span className="mx-2">|</span> Alexandria <span className="mx-2">|</span> Egypt <span className="mx-2">|</span> +201285057040
                    </p>
                    <p className="text-sm font-medium text-gray-300 mt-2">
                        © {currentYear}, Fyonka <span className="mx-2">|</span> <a href="#" className="hover:text-white">Privacy</a> <span className="mx-2">|</span> <a href="#" className="hover:text-white">Terms</a> <span className="mx-2">|</span> <a href="#" className="hover:text-white">Refund Policy</a>
                    </p>
                </div>

                <div className="madeBy mt-4">
                    <p className="text-lg font-semibold text-gray-200 text-center md:text-right">Made4U By BENS</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
