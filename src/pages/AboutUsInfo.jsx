import { Link } from 'react-router-dom';
import phone from '/phone.png';
import email from '/message.png';
import instagram from '/instagram.png';

const AboutUsInfo = () => {
  return (
    <div className="flex flex-col items-center justify-between p-8 border rounded-lg w-[80vw] max-w-4xl mx-auto space-y-6">
      <div className="w-full text-left space-y-4">
        {/* First Information Section */}
        <div>
          <h3 className="text-lg font-semibold">WHO ARE WE</h3>
          <p className="text-sm">
            Welcome to LeadG2, your one-stop solution for seamless and
            stress-free bookings! Our mission is to make the process of booking
            appointments, reserving tables, scheduling services, and planning
            events as effortless as possible for both customers and businesses.
            At LeadG2, we understand that your time is valuable. That's why
            we've designed our platform to be intuitive and user-friendly,
            allowing you to find, compare, and book services with just a few
            clicks. Whether you're scheduling a spa day, reserving a table at
            your favorite restaurant, or booking a fitness class, EasyBook
            provides a simple, streamlined experience.
          </p>
        </div>

        {/* Second Information Section */}
        <div>
          <h3 className="text-lg font-semibold">
            WE'RE DIFFERENT THAN THE REST
          </h3>
          <p className="text-sm">
            At LeadG2, we believe that booking an appointment, reserving a
            table, or scheduling a service should be a hassle-free experience.
            While many booking apps are available, here's what sets us apart
            from the rest: 1. Personalized Experience We understand that every
            customer is unique. That's why our platform learns from your
            preferences and past bookings to offer tailored recommendations that
            perfectly match your needs. Whether you prefer a specific stylist, a
            particular cuisine, or a favorite spa treatment, EasyBook remembers
            and delivers options that are just right for you.
          </p>
        </div>
      </div>

      {/* Buttons centered at the bottom */}

      <h2 class="text-2xl font-bold mb-6 text-center">Contact Us</h2>
      <div className="flex items-center justify-center space-x-2">
        <img src={email} width={30} height={10} alt="Email Icon" />
        <p class="text-lg font-semibold mb-2">Email: LeadG2@gmail.com</p>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <img src={phone} width={30} height={10} alt="Phone Icon" />
        <p className="text-lg font-semibold">Phone: +355698324554</p>
      </div>

      <Link to={'https://www.instagram.com/'} target="_blank">
        <div className="flex items-center justify-center space-x-2">
          <img src={instagram} width={30} height={10} alt="Email Icon" />
          <p class="text-lg font-semibold mb-2">Instagram: Lead2G</p>
        </div>
      </Link>
    </div>
  );
};

export default AboutUsInfo;
