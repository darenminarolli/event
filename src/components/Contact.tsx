const Contact = () => {
    return (
      <section
        id="contact"
        className="w-full flex flex-wrap justify-between my-14 md:my-24 md:py-24 "
      >
        <h1 className="header-text">#Contact Us</h1>
        <div className="w-full min-h-[400px] h-full grid md:grid-cols-2 col-span-2 text-slate-100 bg-slate-900 rounded-lg shadow-lg p-2 md:p-16  ">
          <div>
            <h2 className="text-3xl font-bold mb-6 ">Where to find us...</h2>
            <address className="not-italic text-2xl mb-10">
              <p className="mb-4">
                <strong>Our Office:</strong> 123 Main Street,
                <br />
                Anytown, AT 12345
                <br />
                Albania
              </p>
              <p className="mb-4">
                <strong>Email:</strong>{" "}
                <a href="mailto:info@example.com" className="text-blue-500">
                  darenminarolli@gmail.com
                </a>
              </p>
              <p className="mb-4">
                <strong>Phone:</strong>{" "}
                <a href="tel:+355676320588" className="text-blue-500">
                  +355 67 632 0588
                </a>
              </p>
            </address>
            <h2 className="text-3xl font-bold opacity-50">
              For any question, don't hesitate to contact us!
            </h2>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-6  ">Our Location:</h1>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.26582271626!2d19.815634476575255!3d41.324832699872246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13503104d126d74f%3A0xe97a1dc10d54dd99!2s8RF9%2BX84%2C%20Tirana%2C%20Albania!5e0!3m2!1sen!2s!4v1715949344841!5m2!1sen!2s"
              width="500"
              height="350"
              className="border-solid rounded-lg  w-full  "
              // allowfullscreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    );
  };
  
  export default Contact;
  