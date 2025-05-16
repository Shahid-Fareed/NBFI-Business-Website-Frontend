const GoogleMap = () => {
    return (
      <div className="w-full h-54">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.32812214941!2d73.04498137605385!3d33.596789941641774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df94840bc55555%3A0xb4bccafbbb8b7afa!2sAWTIL!5e0!3m2!1sen!2s!4v1735291221522!5m2!1sen!2s"
          width="100%"
          height="200px"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    );
  };
  
  export default GoogleMap;
  