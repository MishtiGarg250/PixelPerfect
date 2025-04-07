import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "../sub/MagicButton";

const socialMedia = [
  { id: "1", img: "/path-to-image/facebook.png", link: "https://facebook.com" },
  { id: "2", img: "/path-to-image/twitter.png", link: "https://twitter.com" },
  { id: "3", img: "/path-to-image/linkedin.png", link: "https://linkedin.com" }
];

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10 text-white bg-[#0D0D0D] border-t border-gray-800" id="contact">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-200 lg:max-w-[45vw] leading-tight">
          Ready to take <span className="text-purple-400">your</span> digital presence to the next level?
        </h1>
        <p className="text-gray-400 md:mt-6 mt-4 max-w-[600px]">
          Reach out to me today and let&apos;s discuss how I can help you achieve your goals.
        </p>
        <a href="mailto:aryansrivastava9059@gmail.com" className="mt-6">
          <MagicButton
            title="Let's get in touch"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>

      <div className="flex mt-16 md:flex-row flex-col justify-between items-center px-6 md:px-12 mx-auto">
        <p className="text-gray-500 text-sm md:text-base">
          &copy; 2025 <span className="text-purple-400">Pixel Perfect</span> | All Rights Reserved
        </p>

        <div className="flex items-center gap-5">
          {socialMedia.map((info) => (
            <a key={info.id} href={info.link} target="_blank" rel="noopener noreferrer">
              <div className="w-12 h-12 flex justify-center items-center rounded-lg bg-opacity-20 bg-gray-800 backdrop-blur-md border border-gray-700 hover:bg-purple-500 transition-all duration-300 cursor-pointer">
                <img src={info.img} alt="social media icon" className="w-6 h-6 filter brightness-90" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
