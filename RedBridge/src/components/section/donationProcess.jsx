import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    filter: "blur(10px)",
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const DonationProcess = () => {
  return (
    <section className="bg-gradient-to-b from-red-900 to-red-300 py-16 mb-10 mt-20 rounded-2xl mr-5 ml-5 px-4 flex justify-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-white p-10 rounded-3xl shadow-lg w-full max-w-6xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-black">
          Blood Donation Process
        </h2>

        <div className="flex flex-wrap justify-center gap-10  md:gap-16">

          
          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <div className="w-28 h-28 md:w-32 md:h-32 bg-red-900 text-white rounded-full flex flex-col items-center justify-center text-center shadow-xl border-4 border-white rotate-12 hover:scale-105 transition-all duration-300">
              <div className="-rotate-12">
                <div className="text-2xl font-bold">01</div>
                <div className="text-sm font-semibold">Registration</div>
              </div>
            </div>
          </motion.div>

          
          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <div className="w-28 h-28 md:w-32 md:h-32 bg-red-900 text-white rounded-full flex flex-col items-center justify-center text-center shadow-xl border-4 border-white rotate-12 hover:scale-105 transition-all duration-300">
              <div className="-rotate-12">
                <div className="text-2xl font-bold">02</div>
                <div className="text-sm font-semibold">Screening</div>
              </div>
            </div>
          </motion.div>

          
          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <div className="w-28 h-28 md:w-32 md:h-32 bg-red-900 text-white rounded-full flex flex-col items-center justify-center text-center shadow-xl border-4 border-white rotate-12 hover:scale-105 transition-all duration-300">
              <div className="-rotate-12">
                <div className="text-2xl font-bold">03</div>
                <div className="text-sm font-semibold">Donation</div>
              </div>
            </div>
          </motion.div>

         
          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <div className="w-28 h-28 md:w-32 md:h-32 bg-red-900 text-white rounded-full flex flex-col items-center justify-center text-center shadow-xl border-4 border-white rotate-12 hover:scale-105 transition-all duration-300">
              <div className="-rotate-12">
                <div className="text-2xl font-bold">04</div>
                <div className="text-sm font-semibold">Rest</div>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default DonationProcess;
