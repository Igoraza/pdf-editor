import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-300 text-gray-900 p-10 flex flex-col md:flex-row justify-between flex-wrap">
      <div className="mb-8 md:mb-0">
        <h2 className="text-3xl font-bold mb-2">IGORAZA</h2>
        <p className="text-sm mb-4">Innovation meets Reality</p>
        <a href="https://www.igoraza.com/contact.html" target='_blank'>
        <button className="bg-green-500 w-44 hover:bg-green-600 text-gray-900 btn border-none rounded-full flex items-center">
          CONTACT US
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
        </a>
      </div>

      <div className="mb-8 md:mb-0">
        <a href="#" className="block mb-2 text-green-600 font-bold">Home</a>
        <a href="https://www.igoraza.com/works.html" target='_blank' className="block mb-2">Works</a>
        <a href="https://www.igoraza.com/services.html" target='_blank' className="block mb-2">Services</a>
        <a href="https://www.igoraza.com/contact.html" target='_blank' className="block">Contact</a>
      </div>

      <div className="mb-8 md:mb-0">
        <a href="https://www.igoraza.com/privacy.html" target='_blank' className="block mb-2 text-black">Privacy Policy</a>
        <a href="https://www.igoraza.com/termsandcondition.html" target='_blank' className="block mb-2 text-black">Terms & Conditions</a>
        <a href="https://www.igoraza.com/cookies.html" target='_blank' className="block mb-2 text-black">Cookie Policy</a>
        <a href="https://www.igoraza.com/career.html" target='_blank' className="block text-black">Careers</a>
      </div>

      <div className="mb-8 md:mb-0">
        <p className="mb-2">IGORAZA PVT.LTD.</p>
        <p className="mb-2">CIN:U62099KL2023PTC082259</p>
        <p className="mb-2">Alappuzha, Kerala,</p>
        <p>India</p>
      </div>

      <div>
        <h3 className="font-bold mb-2">Contact Us</h3>
        <a href="mailto:team@igoraza.com" className="block mb-2">team@igoraza.com</a>
        <a href="tel:+917736886026">+917736886026</a>
      </div>
    </footer>
  );
}