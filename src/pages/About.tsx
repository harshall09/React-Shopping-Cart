import Navbar from "../componenents/Navbar";

const AboutPage:React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-semibold mb-4">About Us</h1>
        <p>This is the About Us page content.</p>
      </div>
    </>
  );
};

export default AboutPage;
