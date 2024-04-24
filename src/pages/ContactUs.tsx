import Navbar from "../componenents/Navbar";
import Footer from "../componenents/Footer";

const ContactUsPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 flex-grow">
        <div className="max-w-screen-lg mx-auto">
          <h1 className="text-2xl font-semibold mb-4">Contact Us</h1>
          <p>This is the Contact Us page content.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUsPage;
