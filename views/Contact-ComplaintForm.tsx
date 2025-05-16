'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import ContactForm from './contactForm';

const ContactFormWrapper = ({ sectionData }: any) => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LdRkxwrAAAAAFC7XzdGbP1SNI2H8HtKFG2sYfVv">
      <ContactForm  sectionData= {sectionData}/>
      </GoogleReCaptchaProvider>
  );
};

export default ContactFormWrapper;
