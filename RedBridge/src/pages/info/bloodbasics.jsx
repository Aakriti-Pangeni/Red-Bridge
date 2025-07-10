import React from 'react';
import MainLayout from '../../shared/sidebar/mainlayout';


const BloodBasics = () => {
  const sections = [
    {
      title: 'Blood Basics',
      text:
        'Blood is a red liquid that flows throughout your body. It travels through blood vessels and reaches every organ, keeping them alive and working properly. Blood has many important jobs. It carries oxygen from your lungs to your whole body and brings back carbon dioxide to be removed. It also transports nutrients from the food you eat to your cells. Blood helps fight infections by carrying special white cells that protect you. It controls body temperature and helps heal wounds. Blood also removes waste products like urea and carbon dioxide. An adult human has about 4 to 6 liters of blood. Without blood, our body cannot survive. That’s why blood is called the “river of life.',
      image: '/src/assets/img/compo.jpg',
      imgLeft: false,
    },
    {
      title: 'Plasma',
      text:
        'Plasma is the yellowish liquid part of your blood. It makes up about 55% of your total blood volume. Plasma is mostly water, but it also contains important proteins, salts, and nutrients. It helps transport these substances all over your body. Plasma carries hormones, enzymes, and vitamins that help organs function. It also carries waste materials to the kidneys and liver so they can be removed from your body. One of its major jobs is to support the immune system by carrying antibodies. Plasma also helps in blood clotting and wound healing. When someone gets burned or has a serious illness, donated plasma can help them recover. Even though it is not red, plasma plays a big role in keeping us healthy',
      image: '/src/assets/img/plasma.jpg',
      imgLeft: true,
    },
    {
      title: 'Red Blood Cells (RBC)',
      text:
        "Red blood cells are the most common cells in your blood. They are round, flat, and have a dip in the center. These cells carry oxygen from your lungs to every part of your body. They contain a protein called hemoglobin, which makes blood red and helps bind oxygen. Once oxygen is delivered, red blood cells carry carbon dioxide back to your lungs to be exhaled. Without enough red blood cells, a person feels weak and tired, which is known as anemia. Red blood cells live for about 120 days and are constantly made in the bone marrow. They are very important for energy, brain function, and keeping your body alive. A blood test often checks how many red cells you have to know if you're healthy. Donating blood helps provide red cells to people who have lost a lot of blood or have illnesses like cancer.",
      image: '/src/assets/img/rbc.jpg',
      imgLeft: false,
    },
    {
      title: 'White Blood Cells (WBC)',
      text:
        "White blood cells are your body’s natural defenders. Their main job is to fight infections caused by bacteria, viruses, and other germs. When you get sick or injured, white blood cells quickly move to the affected area to help you heal. There are different types of white cells, each with a special job like destroying harmful invaders or creating memory cells for future protection. They are fewer in number than red cells but are more powerful in fighting diseases. White blood cells are made in your bone marrow, just like red cells. When your body is under attack, it produces more white cells. If your white cell count is too low, it becomes easier to get sick. That’s why a strong immune system depends on healthy white cells. Donated white blood cells can also help very sick patients, like those with cancer or weak immunity.",
      image: '/src/assets/img/wbc.jpg',
      imgLeft: true,
    },
    {
      title: 'Platelets',
      text:
        'Platelets are very small pieces of cells in your blood. Their main job is to stop bleeding when you get a cut or injury. When you are hurt, platelets rush to the damaged area and stick together. They form a clot, which acts like a net to stop the bleeding and start healing. Without enough platelets, even small injuries could lead to serious blood loss. Platelets are also made in the bone marrow and live for about 7 to 10 days. Some diseases, like dengue or cancer, can reduce platelet count and make bleeding dangerous. That’s why hospitals often need platelet donations. Donated platelets can save lives in emergencies. Even though they are small, platelets are heroes that help us heal.',
      image: '/src/assets/img/platelets.jpg',
      imgLeft: false,
    },
  ];

  return (
    <>
    <MainLayout>
    <section className="bg-white">

     
      <div className="relative mt-1 pt-16">
        <img
          src="/first.jpg" 
          alt="Blood Info Banner"
          className="w-full h-74 object-cover opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl text-red-800  flex justify-center items-center font-bold drop-shadow-lg">
            Learn About Blood
          </h1>
        </div>
      </div>

   
      <div className="space-y-10 px-4 py-6">
        {sections.map((sec, i) => (
          <div
            key={i}
            className={`flex flex-col ${
              sec.imgLeft ? 'md:flex-row-reverse' : 'md:flex-row'
            } justify-center items-center gap-10 bg-gray-100 rounded-lg shadow-md p-6`}
          >
            <div className="md:w-1/2 w-full">
              <h2 className="text-xl font-bold text-red-900 mb-4 text-center md:text-left">
                {sec.title}
              </h2>
              <p className="text-gray-700">{sec.text}</p>
            </div>
            <div className="md:w-1/2 w-full flex justify-center">
              <img
                src={sec.image}
                alt={sec.title}
                className="w-full max-w-md object-contain rounded-lg"
              />
            </div>
          </div>
        ))}

        
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 bg-gray-100 rounded-lg shadow-md p-6">
          <div className="md:w-1/2 w-full">
            <h2 className="text-xl font-bold text-red-900 mb-4 text-center md:text-left">
              Blood Donation
            </h2>
            <p className="text-gray-700 mb-3">
              Donating blood is a safe and kind act. It helps people in
              accidents, surgeries, and other emergencies. One donation can save
              up to three lives. The process is simple and takes around 30
              minutes. Your body replaces the donated blood in a few days.
              Anyone healthy can donate regularly.
            </p>
            <h3 className="font-semibold text-red-900 mb-2">
              You are eligible to donate blood if:
            </h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-1">
              <li>You are between 18 and 65 years old.</li>
              <li>Your weight is 50 kg or more.</li>
              <li>You are in good health and not currently sick.</li>
              <li>You have no major illnesses (like heart or liver diseases).</li>
              <li>Your hemoglobin level is normal.</li>
              <li>You feel energetic and fit on the day of donation.</li>
            </ul>
          </div>
          <div className="md:w-1/2 w-full flex justify-center">
            <img
              src="/src/assets/img/donation.jpg"
              alt="Blood Donation"
              className="w-full max-w-md object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
    </MainLayout>
    </>
  );
};

export default BloodBasics;
