import React from 'react'
import '@/styles/Contact.css'

const Contact = () => {
  return (
    <div className='container-contact'>
        <div className="contact-section">
            <div className="contact-image">
                <img src="/src/assets/contact.webp" alt="Contact" />
            </div>
            <div className="contact-info">
                <h2>Contact Info</h2>
                <p><strong>Call Us</strong> | +2 01202028848</p>
                <p><strong>Email us</strong> | hello@giftopiia.com</p>
                <p><strong>Working Hours</strong> | Sunday to Thursday 10:00 AM to 6:00 PM EET.</p>
                <p>Send us an email through the form. We usually respond within one business day.</p>
            </div>
        </div>
        <div className="contact-form-container">
            <h2 className="contact-title">CONTACT US</h2>
            <div className="underline"></div>
            <p className="contact-description">
                Have a question, or want a product recommendation? Get in touch.
            </p>

            <form className="contact-form">
                <div className="form-row">
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                </div>

                <input type="text" placeholder="Phone Number" className="full-width" />

                <textarea
                    placeholder="Message"
                    className="full-width textarea"
                    rows="4"></textarea>

                <p className="privacy-note">
                    This site is protected by hCaptcha and the hCaptcha Privacy Policy and Terms of Service apply.
                </p>

                <button type="submit" className="send-button">SEND</button>
            </form>
        </div>
    </div>
  )
}

export default Contact
