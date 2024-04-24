import Navbar from "../componenents/Navbar";
import Footer from "../componenents/Footer";

const AboutPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="max-w-screen-lg mx-auto">
          <h1 className="text-2xl font-semibold mb-4">About Us</h1>
          <p>This is the About Us page content.</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
