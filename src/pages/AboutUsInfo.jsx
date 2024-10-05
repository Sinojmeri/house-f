import { Link } from 'react-router-dom';
import phone from '/phone.png';
import email from '/message.png';
import instagram from '/instagram.png';

export function AboutUsInfo() {
  return (
    <div className="flex flex-col items-center justify-between p-8 border rounded-lg w-[80vw] max-w-4xl mx-auto space-y-6">
      <div className="w-full text-left space-y-4">
        {/* First Information Section */}
        <div>
          <h3 className="text-lg font-semibold">WHO ARE WE</h3>
          <p className="text-sm">
            Welcome to HouseHub! At HouseHub, we believe that finding the
            perfect place to stay should be as enjoyable as the journey itself.
            We&apos;re passionate about connecting travelers with unique,
            comfortable, and memorable accommodations around the world. Whether
            you&apos;re planning a cozy weekend getaway, a family vacation, or a
            business trip, our goal is to make your booking experience seamless
            and stress-free.
          </p>
        </div>

        {/* Second Information Section */}
        <div>
          <h3 className="text-lg font-semibold">WHAT WE DO</h3>
          <p className="text-sm">
            We simplify the search for your next stay by offering a
            user-friendly platform that highlights a wide range of
            accommodations tailored to fit every preference and budget. Our
            easy-to-use website and app allow you to browse detailed listings,
            view high-quality photos, read honest reviews, and compare options
            with just a few clicks. We’re committed to providing you with the
            best tools and information to make an informed decision.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
      <div className="flex items-center justify-center space-x-2">
        <img src={email} width={30} height={10} alt="Email Icon" />
        <p className="text-lg font-semibold mb-2">Email: HouseHub@gmail.com</p>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <img src={phone} width={30} height={10} alt="Phone Icon" />
        <p className="text-lg font-semibold">Phone: +355682040868</p>
      </div>

      <Link to={'https://www.instagram.com/'} target="_blank">
        <div className="flex items-center justify-center space-x-2">
          <img src={instagram} width={30} height={10} alt="Email Icon" />
          <p className="text-lg font-semibold mb-2">Instagram: HouseHub</p>
        </div>
      </Link>
    </div>
  );
}

export default AboutUsInfo;
