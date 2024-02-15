import React, { useState } from 'react';
import { ArrowLeft, ArrowDown } from 'lucide-react';

const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto py-3">
      <div
        className="border-b border-noir p-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-alata">{title}</h3>
          {isOpen ? (
            <span className="transform rotate-0 transition-transform">
              <ArrowDown />
            </span>
          ) : (
            <span className="transform rotate-180 transition-transform">
              <ArrowLeft />
            </span>
          )
          }
        </div>
      </div>
      {isOpen && (
        <div className="p-4 border-b border-noir">
          <p className="text-sm font-alata">{content}</p>
        </div>
      )}
    </div>
  );
};

const ShoesCareAccordion = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-28">
      <h1>Questions and answers.</h1>
      <AccordionItem
        title="Who are we and what is Econimal all about? "
        content="Econimal is an online news outlet dedicated to shedding light on endangered species and environmental issues. We are a team of passionate individuals committed to raising awareness about the challenges facing our planet's ecosystems and the importance of protecting biodiversity."
      />
      <AccordionItem
        title="What is the mission of Econimal? "
        content="Our mission at Econimal is to highlight the struggles of endangered species and promote environmental awareness. Through our articles and features, we aim to inspire action and encourage a more sustainable and empathetic approach to the planet's inhabitants."
      />
      <AccordionItem
        title="What topics does Econimal cover?"
        content="Econimal covers a wide range of topics related to ecology, endangered species, conservation efforts, environmental policies, and sustainable living practices. Our goal is to provide comprehensive coverage of issues impacting the planet's ecosystems and wildlife."
      />
      <AccordionItem
        title="What sets Econimal apart from other environmental news outlets?"
        content="What sets Econimal apart is our unwavering commitment to highlighting the struggles of endangered species and fostering environmental awareness. We prioritize in-depth reporting, scientific accuracy, and storytelling that engages and inspires our readers to take action."
      />
      <AccordionItem
        title="How does Econimal source its information and articles?"
        content="Econimal sources its information from reputable scientific journals, environmental organizations, conservation experts, and firsthand reporting. We strive to ensure the accuracy and credibility of all the content we publish."
      />
    </div>
  );
};

export default ShoesCareAccordion;