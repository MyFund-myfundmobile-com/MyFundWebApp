import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faWhatsapp,
  faTelegram,
  faYoutube,
  faTiktok,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-[#351265] w-full">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* First Column: Logo */}
        <div className="flex flex-wrap justify-between">
          <div className="w-full sm:w-1/2 md:w-1/5 mb-6">
            <Image
              src="/images/myfund.png"
              alt="MyFund Logo"
              width={120}
              height={40}
              className="mb-4"
            />
          </div>

          {/* Second Column: Company */}
          <div className="w-full sm:w-1/2 md:w-1/5 mb-6">
            <h5 className="text-white font-bold mb-4">Company</h5>
            <ul className="text-gray-400 text-sm font-product-sans space-y-2">
              <li>
                <Link href="/about-us">About Us</Link>
              </li>
              <li>
                <Link href="/policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms and Conditions</Link>
              </li>
              <li>
                <a
                  href="http://medium.com/@myfundmobile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blog
                </a>
              </li>
              <li>
                <Link href="/faq">FAQs</Link>
              </li>
              <li>
                <Link href="/register">Create Free Account</Link>
              </li>
              <li>
                <Link href="/login">
                  Log in
                  <svg
                    fill="currentColor"
                    className="h-4 w-4 ml-2 inline"
                    viewBox="0 0 20 21"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Arrow Right</title>
                    <polygon points="16.172 9 10.101 2.929 11.515 1.515 20 10 19.293 10.707 11.515 18.485 10.101 17.071 16.172 11 0 11 0 9"></polygon>
                  </svg>
                </Link>
              </li>
              <li>
                <Link href="/admin">Admin</Link>
              </li>
            </ul>
          </div>

          {/* Third Column: Product */}
          <div className="w-full sm:w-1/2 md:w-1/5 mb-6">
            <h5 className="text-white font-bold mb-4">Products</h5>
            <ul className="text-gray-400 text-sm font-product-sans space-y-2">
              <li>QuickSave</li>
              <li>AutoSave</li>
              <li>QuickInvest</li>
              <li>AutoInvest</li>
              <li>Sponsorship Investment</li>
              <li>Ownership Investment</li>
            </ul>
          </div>

          {/* Fourth Column: Programmes */}
          <div className="w-full sm:w-1/2 md:w-1/5 mb-6">
            <h5 className="text-white font-bold mb-4">Programmes</h5>
            <ul className="text-gray-400 text-sm font-product-sans space-y-2">
              <li>Wealth Leadership Academy</li>
              <li>Financial Mentoring Class</li>
              <li>
                <a
                  href="https://chat.whatsapp.com/L8t5CzMEpKM5Ma2FXwv0mF"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Monthly Cashflow Game
                </a>
              </li>
              <li>Multiple Skills of Income</li>
            </ul>
          </div>

          {/* Fifth Column: Contact */}
          <div className="w-full sm:w-1/2 md:w-1/5 mb-6">
            <h5 className="text-white font-bold mb-4">Contact</h5>
            <ul className="text-gray-400 text-sm font-product-sans space-y-2">
              <li>Message Admin</li>
              <li>
                <Link
                  href="https://wa.me/2349032719396"
                  legacyBehavior
                >
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp ↗
                  </a>
                </Link>
              </li>
              <li>
                <a href="mailto:care@myfundmobile.com">
                  Email: care@myfundmobile.com
                </a>
              </li>
              <li>Call: +2349032719396</li>
              <li>
                <a href="https://www.myfundmobile.com/resubscribe?email={{user.email}}">
                  Get Practicaly Money Tips by Mail
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-4 my-6">
          <Link
            href="https://facebook.com/myfundmobile"
            legacyBehavior
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <FontAwesomeIcon
                icon={faFacebook}
                size="lg"
                className="text-white group-hover:text-blue-600"
              />
            </a>
          </Link>
          <Link
            href="https://twitter.com/myfundmobile"
            legacyBehavior
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <FontAwesomeIcon
                icon={faTwitter}
                size="lg"
                className="text-white group-hover:text-blue-400"
              />
            </a>
          </Link>
          <Link
            href="https://instagram.com/myfundmobile1"
            legacyBehavior
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                size="lg"
                className="text-white group-hover:text-pink-500"
              />
            </a>
          </Link>
          <Link
            href="https://wa.me/2349032719396"
            legacyBehavior
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <FontAwesomeIcon
                icon={faWhatsapp}
                size="lg"
                className="text-white group-hover:text-green-500"
              />
            </a>
          </Link>
          <Link
            href="https://t.me/2349032719396"
            legacyBehavior
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <FontAwesomeIcon
                icon={faTelegram}
                size="lg"
                className="text-white group-hover:text-blue-400"
              />
            </a>
          </Link>
          <Link
            href="https://youtube.com/myfundmobile"
            legacyBehavior
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <FontAwesomeIcon
                icon={faYoutube}
                size="lg"
                className="text-white group-hover:text-red-600"
              />
            </a>
          </Link>
          <Link
            href="https://tiktok.com/myfundmobile"
            legacyBehavior
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <FontAwesomeIcon
                icon={faTiktok}
                size="lg"
                className="text-white group-hover:text-black"
              />
            </a>
          </Link>
          <Link
            href="https://linkedin.com/company/myfundmobile"
            legacyBehavior
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <FontAwesomeIcon
                icon={faLinkedin}
                size="lg"
                className="text-white group-hover:text-blue-700"
              />
            </a>
          </Link>
        </div>

        {/* Address */}
        <div className="text-center text-gray-400 text-xs font-product-sans mt-6">
          <p>
            <strong className="font-bold text-white ">MyFund</strong>
            <br />
            Save, Buy Properties, Earn Rent
            <br />
            13, Gbajabiamila Street, Ayobo, Lagos, Nigeria.
          </p>
          <p className="mt-4">
            MyFund (Vcorp Systems Limited) is duly registered under the Lagos
            State Ministry as an independent financial institution on June 2022
          </p>
          <p className="mt-4">
            MyFund, MyFund Mobile and MyFund Tech are registered Trademarks of
            Vcorp Systems Limited - RC 1508170
          </p>
          <p className="mt-4">
            ©2024 MyFund Financial Technology. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
