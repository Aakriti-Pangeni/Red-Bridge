// import React from 'react'

// const Card = () => {
//   return (
//    <>

//       <div className="m-6 p-3 text-2xl font-semibold">
//        Blood Group Types
//       </div>

//       <section className="m-3 p-3 flex flex-wrap gap-5 items-center justify-center">


//       <main className="m-2  w-80  hover:bg-red-900 hover:text-white shadow-lg rounded-xl">
//         <div className="flex justify-center">
//           <img src="./src/assets/img/A+.jpg" alt="A Positive" className="w-70 h-50 m-1 p-1 object-cover shadow-lg rounded-xl" />
//         </div>
//         <h1 className="text-2xl text-center m-1 p-1 font-semibold">A Positive (A+)</h1>
//         <p className="m-1 p-1">
//           A+ is one of the most common blood types, found in a significant portion of the global population. Individuals with A+ blood have the A antigen on their red blood cells and carry the Rh factor (D antigen). They also have anti-B antibodies in their plasma. A+ blood can be safely donated to A+ and AB+ recipients, making it moderately versatile. Due to its prevalence, A+ blood is widely used in routine transfusions, surgeries, and medical treatments.
//         </p>
//       </main>


//       <main className="m-2 border w-80 rounded-2xl shadow">
//         <div className="flex justify-center">
//           <img src="./Assets/Img/a-.jpg" alt="A Negative" className="w-70 h-50 m-1 p-1 object-cover" />
//         </div>
//         <h1 className="text-2xl text-center m-1 p-1 font-semibold">A Negative (A−)</h1>
//         <p className="m-1 p-1">
//          A− is less common than A+, but it plays a critical role in emergencies. People with this blood type have the A antigen but lack the Rh factor, and they produce anti-B and anti-Rh antibodies. This group can donate to A−, A+, AB−, and AB+ individuals, which makes it more flexible in donation compared to A+. Because of its rarity and compatibility range, A− blood is highly valuable in emergency care and for patients with Rh-negative types.
//         </p>
//       </main>


//       <main className="m-2 border w-80 rounded-2xl shadow">
//         <div className="flex justify-center">
//           <img src="./Assets/Img/b+.jpg" alt="B Positive" className="w-70 h-50 m-1 p-1 object-cover" />
//         </div>
//         <h1 className="text-2xl text-center m-1 p-1 font-semibold">B Positive (B+)</h1>
//         <p className="m-1 p-1">
//          B+ is a moderately common blood group that has the B antigen and the Rh factor on red blood cells. People with this group possess anti-A antibodies in their plasma. B+ individuals can donate blood to B+ and AB+ recipients. While not as widely distributed as A+ or O+, B+ is an important type used in blood transfusions, trauma care, and medical treatments in regions where it is more prevalent, such as parts of Asia.
//         </p>
//       </main>


//       <main className="m-2 border w-80 rounded-2xl shadow">
//         <div className="flex justify-center">
//           <img src="./Assets/Img/b-.jpg" alt="B Negative" className="w-70 h-50 m-1 p-1 object-cover" />
//         </div>
//         <h1 className="text-2xl text-center m-1 p-1 font-semibold">B Negative (B−)</h1>
//         <p className="m-1 p-1">
//           B− is a rare but versatile donor type. This group has the B antigen but lacks the Rh factor, and the plasma contains anti-A and anti-Rh antibodies. B− individuals can donate to B−, B+, AB−, and AB+ blood types, making it an important donor group despite its low population percentage. Because it is less commonly found, B− blood is especially valuable for blood banks and hospitals that serve diverse populations.
//         </p>
//       </main>


//       <main className="m-2 border w-80 rounded-2xl shadow">
//         <div className="flex justify-center">
//           <img src="./Assets/Img/o+.jpg" alt="O Positive" className="w-70 h-50 m-1 p-1 object-cover" />
//         </div>
//         <h1 className="text-2xl text-center m-1 p-1 font-semibold">O Positive (O+)</h1>
//         <p className="m-1 p-1">
//           O+ is the most common blood type worldwide, making up a large portion of most populations. People with this blood group do not have A or B antigens but do carry the Rh factor. Their plasma contains both anti-A and anti-B antibodies. O+ individuals can donate red blood cells to all Rh-positive blood types (A+, B+, AB+, and O+). Its abundance and compatibility make O+ extremely important for daily hospital use, surgeries, and emergency transfusions.
//         </p>
//       </main>


//       <main className="m-2 border w-80 rounded-2xl shadow">
//         <div className="flex justify-center">
//           <img src="./Assets/Img/o-.jpg" alt="O Negative" className="w-70 h-50 m-1 p-1 object-cover" />
//         </div>
//         <h1 className="text-2xl text-center m-1 p-1 font-semibold">O Negative (O−)</h1>
//         <p className="m-1 p-1">
//           O− is considered the universal donor for red blood cell transfusions. It lacks A, B, and Rh antigens, which means it does not trigger an immune response in any recipient’s body. O− blood can be safely transfused to any blood type, especially in emergency situations when there is no time to type-match. Although O− is relatively rare, it is in constant demand, especially in trauma centers, ambulances, and for infants or immunocompromised patients.
//         </p>
//       </main>


//       <main className="m-2 border w-80 rounded-2xl shadow">
//         <div className="flex justify-center">
//           <img src="./Assets/Img/ab+.jpg" alt="AB Positive" className="w-70 h-50 m-1 p-1 object-cover" />
//         </div>
//         <h1 className="text-2xl text-center m-1 p-1 font-semibold">AB Positive (AB+)</h1>
//         <p className="m-1 p-1">
//           AB+ is known as the universal recipient blood group because it has both A and B antigens and also the Rh factor, allowing these individuals to receive red blood cells from any other group. This type does not produce anti-A, anti-B, or anti-Rh antibodies, making it highly flexible for transfusions. While AB+ is rare, its ability to receive from all other groups makes it essential for patients with complex medical conditions or those requiring frequent transfusions.
//         </p>
//       </main>

//       <main className="m-2 border w-80 rounded-2xl shadow">
//         <div className="flex justify-center">
//           <img src="./Assets/Img/ab-.jpg" alt="AB Negative" className="w-70 h-50 m-1 p-1 object-cover" />
//         </div>
//         <h1 className="text-2xl text-center m-1 p-1 font-semibold">AB Negative (AB−)</h1>
//         <p className="m-1 p-1">
//           AB− is one of the rarest blood groups, possessing both A and B antigens but lacking the Rh factor. Individuals with AB− can only receive blood from A−, B−, AB−, or O− and can donate to AB− and AB+. Due to its rarity and narrow compatibility as a recipient, it is used in specialized transfusion cases, such as for patients with rare antigen profiles or immunological sensitivities. This group is highly valuable in blood registry databases.
//         </p>
//       </main>
//     </section>
//     </>
//   );
// };



// export default Card

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDroplet} from "@fortawesome/free-solid-svg-icons"


const Table = () => {
  return (
    <>
      <section className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10 px-4 md:px-10 mt-10 mb-10">

        {/* Left Side: Table */}
<div className="w-full md:w-1/2">
  <h1 className="bg-red-900 text-white m-1 p-2.5 font-semibold flex text-lg rounded-lg justify-center">
    Compatible Blood Type Donors
  </h1>

  <div className="mt-3 ml-1 max-w-xl overflow-x-auto">
    <table className="w-full border-0">
      <thead className="bg-gray-200 text-left">
        <tr>
          <th className="border-b-2 px-4 py-2">Blood Type</th>
          <th className="border-b-2 px-4 py-2">Donate Blood To</th>
          <th className="border-b-2 px-4 py-2">Receive Blood From</th>
        </tr>
      </thead>
      <tbody>
        {[
          {
            type: "A+",
            donate: "A+, AB+",
            receive: "A+, A-, O+, O-"
          },
          {
            type: "O+",
            donate: "O+, A+, B+, AB+",
            receive: "O+, O-"
          },
          {
            type: "B+",
            donate: "B+, AB+",
            receive: "B+, B-, O+, O-"
          },
          {
            type: "AB+",
            donate: "AB+",
            receive: "Everyone"
          },
          {
            type: "A-",
            donate: "A+, A-, AB+, AB-",
            receive: "A-, O-"
          },
          {
            type: "O-",
            donate: "Everyone",
            receive: "O-"
          },
          {
            type: "B-",
            donate: "B+, B-, AB+, AB-",
            receive: "B-, O-"
          },
          {
            type: "AB-",
            donate: "AB+, AB-",
            receive: "AB-, A-, B-, O-"
          }
        ].map((row, i) => (
          <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-red-200"}>
            <td className="border-b-1 px-4 py-2 font-bold text-red-700">{row.type}</td>
            <td className="border-b-1 px-4 py-2">{row.donate}</td>
            <td className="border-b-1 px-4 py-2">{row.receive}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


        <div className="w-full mt-20 md:w-1/2">

          <h2 className="text-3xl font-bold mb-6">Who are Eligible to Donate Blood?</h2>
          <ul className="space-y-3 text-base">
            <li className="flex items-start">
              <span className=" mr-2">

                <FontAwesomeIcon icon={faDroplet}  beat className="text-red-700" />

              </span>
              <span>Age between 18 and 60 years</span>
            </li>
            <li className="flex items-start">
              <span className=" mr-2">

                <FontAwesomeIcon icon={faDroplet}  beat className="text-red-700" />

              </span>

              <span>Haemoglobin - not less than 12.5 g/dl</span>

            </li>
            <li className="flex items-start">
              <span className=" mr-2">

                <FontAwesomeIcon icon={faDroplet}  beat className="text-red-700" />

              </span>

              <span>Pulse - between 50 and 100/minute with no irregularities</span>
            </li>
            <li className="flex items-start">
              <span className=" mr-2">

                <FontAwesomeIcon icon={faDroplet}  beat className="text-red-700" />

              </span>

              <span>Blood Pressure - Systolic 100–180 mm Hg and Diastolic 50–100 mm Hg</span>
            </li>
            <li className="flex items-start">
             <span className=" mr-2">

                <FontAwesomeIcon icon={faDroplet}  beat className="text-red-700" />

              </span>
              <span>Temperature - Normal (oral temperature not exceeding 37.5°C)</span>
            </li>
            <li className="flex items-start">
             <span className=" mr-2">

                <FontAwesomeIcon icon={faDroplet}  beat className="text-red-700" />

              </span>
              <span>Body weight - not less than 45 Kg</span>
            </li>
          </ul>
        </div>

      </section>
    </>
  )
}

export default Table