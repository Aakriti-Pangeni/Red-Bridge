import React, { useState } from 'react'
import MainLayout from '../shared/sidebar/mainlayout'


const faqs = [
  {
    question: 'How do I register as a blood donor?',
    answer: 'You can register by clicking on the "Register" button on the homepage and filling out your details including your blood group and location.'
  },
  {
    question: 'Who can become a blood donor?',
    answer: 'Anyone who is healthy, above 18 years old, and meets the donation criteria can become a donor.'
  },
  {
    question: 'How do I find a blood donor?',
    answer: 'Use the search feature to filter donors by blood group and location. You’ll see a list of available donors near you.'
  },
  {
    question: 'How often can I donate blood?',
    answer: 'You can usually donate blood every 3 months. However, this may vary depending on health conditions and local guidelines.'
  },
 
  {
    question: 'How can I contact the developers or support?',
    answer: 'You can reach out via the “Contact Us” page or email support@redbridge.com for help.'
  },
  {
    question: 'Can I register both as donor and recipient?',
    answer: 'Yes, you can register as both. The system allows you to act as a donor or request blood whenever needed.'
  }
]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <MainLayout>
    <section className=" py-16   px-6 md:px-20">
      <h2 className="text-2xl md:text-3xl font-bold text-center  mt-11 text-red-900 mb-10">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4 max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center p-4 text-left font-medium text-red-800 hover:bg-red-200 transition"
            >
              {faq.question}
              <span className="text-xl">{openIndex === index ? '▲' : '▼'}</span>
            </button>
            {openIndex === index && (
              <div className="p-4 text-gray-700 border-t border-red-200 bg-red-50">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
    </MainLayout>
  )
}

export default FAQ
