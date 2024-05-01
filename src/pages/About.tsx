import React from "react";
import Navbar from "../componenents/Navbar";
import Footer from "../componenents/Footer";

const AboutPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 flex-grow">
        <div className="max-w-screen-lg mx-auto" style={{ width: "90%", margin: "auto" }}>
          <h1 className="text-3xl font-semibold mb-4">About Us</h1>
          <p className="text-lg mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            tristique fringilla nunc, in fringilla ante accumsan vel. Nulla
            facilisi. Sed vitae orci tortor. Sed eu nulla nec ex efficitur
            bibendum. Phasellus vel varius nunc, sit amet convallis dolor.
            Donec ultricies odio a justo feugiat, at aliquet sem suscipit.
            Fusce at neque ac leo sollicitudin sagittis. Nullam lobortis,
            sapien non cursus malesuada, magna nunc maximus elit, ac ultrices
            purus tortor at risus.
          </p>
          <p className="text-lg">
            Etiam auctor ligula sed purus convallis, sed vehicula tortor
            vehicula. Ut sed velit lorem. Sed volutpat ante ut fermentum
            ullamcorper. Nulla a tellus ac dui pellentesque consequat. Mauris
            faucibus sapien sit amet bibendum rutrum. Sed eget viverra velit.
            Proin vitae nibh in velit scelerisque euismod. Donec in leo nunc.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
