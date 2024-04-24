import Navbar from "../componenents/Navbar";
import Footer from "../componenents/Footer";

const AboutPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 flex-grow">
        <div className="max-w-screen-lg mx-auto">
          <h1 className="text-2xl font-semibold mb-4">About Us</h1>
          <p>This is the About Us page content.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
