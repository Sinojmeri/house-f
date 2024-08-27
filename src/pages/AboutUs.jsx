import AboutUsInfo from './AboutUsInfo';

const AboutUs = () => {
  return (
    <div
      id="about-us"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      // className="flex justify-center items-center h-screen"
    >
      <h1 className="text-5xl font-bold text-black">ABOUT LEADG2</h1>

      <AboutUsInfo />
    </div>
  );
};

export default AboutUs;
