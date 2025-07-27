
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DonorCheckList = () => {
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    chronicDisease: "",
    testedPositive: "",
    bloodTransfusion: "",
    onMedication: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // 1. Check all answered
  const unanswered = Object.entries(formData).filter(
    ([, v]) => v !== "yes" && v !== "no"
  );
  if (unanswered.length) {
    toast.error("Please answer all questions.");
    return;
  }

  // 2. Validate eligibility
  if (
    formData.age !== "yes" ||
    formData.weight !== "yes" ||
    formData.chronicDisease !== "no" ||
    formData.testedPositive !== "no" ||
    formData.bloodTransfusion !== "no" ||
    formData.onMedication !== "no"
  ) {
    toast.error("You are not eligible to register as a donor.");
    return;
  }

  // 3. If passed, go to donor registration form
  toast.success("You are eligible to donate blood!");
  
    navigate("/register");
  
};


  return (
    <>
      <section className="w-full flex flex-col p-7 justify-center items-center bg-gray-200">
        <div className="bg-white shadow-md rounded-lg px-8 py-5 w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-4 text-sm text-gray-700">
            <h2 className="text-xl font-bold text-red-900 text-center mb-6">
              Donor Health Eligibility Checklist
            </h2>

            {/* --- all your existing questions stay exactly the same --- */}
            {/* age */}
            <div>
              <p className="mb-3 font-semibold">
                Are you at least 18 years old and under 65 years of age?
              </p>
              <div className="flex ml-5 gap-30">
                <label>
                  <input
                    type="radio"
                    name="age"
                    value="yes"
                    onChange={handleChange}
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="age"
                    value="no"
                    onChange={handleChange}
                  />{" "}
                  No
                </label>
              </div>
            </div>

            {/* weight */}
            <div>
              <p className="mb-3 font-semibold">Is your weight 50 kg or more?</p>
              <div className="flex ml-5 gap-30">
                <label>
                  <input
                    type="radio"
                    name="weight"
                    value="yes"
                    onChange={handleChange}
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="weight"
                    value="no"
                    onChange={handleChange}
                  />{" "}
                  No
                </label>
              </div>
            </div>

            {/* chronicDisease */}
            <div>
              <p className="mb-3 font-semibold">
                Do you have any chronic diseases such as cancer, diabetes, or related conditions?
              </p>
              <div className="flex ml-5 gap-30">
                <label>
                  <input
                    type="radio"
                    name="chronicDisease"
                    value="yes"
                    onChange={handleChange}
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="chronicDisease"
                    value="no"
                    onChange={handleChange}
                  />{" "}
                  No
                </label>
              </div>
            </div>

            {/* testedPositive + bloodTransfusion */}
            <div>
              <p className="mb-3 font-semibold">
                Have you ever tested positive for Hepatitis C, Syphilis, or HIV/AIDS?
              </p>
              <div className="flex ml-5 gap-30">
                <label>
                  <input
                    type="radio"
                    name="testedPositive"
                    value="yes"
                    onChange={handleChange}
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="testedPositive"
                    value="no"
                    onChange={handleChange}
                  />{" "}
                  No
                </label>
              </div>

              <p className="mt-4 mb-3 font-semibold">
                Have you received any blood transfusion in the last 12&nbsp;months?
              </p>
              <div className="flex ml-5 gap-30">
                <label>
                  <input
                    type="radio"
                    name="bloodTransfusion"
                    value="yes"
                    onChange={handleChange}
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="bloodTransfusion"
                    value="no"
                    onChange={handleChange}
                  />{" "}
                  No
                </label>
              </div>
            </div>

            {/* onMedication */}
            <div>
              <p className="mb-3 font-semibold">
                Are you currently on continuous medication for any of the following conditions?
              </p>
              <ul className="list-disc list-inside text-sm mb-3 ml-3">
                <li className="mb-1.5">High blood pressure</li>
                <li className="mb-1.5">Diabetes (especially insulin‑dependent)</li>
                <li>Thyroid disorders</li>
              </ul>
              <div className="flex ml-5 gap-30">
                <label>
                  <input
                    type="radio"
                    name="onMedication"
                    value="yes"
                    onChange={handleChange}
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="onMedication"
                    value="no"
                    onChange={handleChange}
                  />{" "}
                  No
                </label>
              </div>
            </div>

            {/* submit */}
            <div className="flex justify-center text-center pt-4">
              <button
                type="submit"
                className="h-9 w-56 mt-3 bg-[#660000] hover:bg-[#800000] text-white flex justify-center items-center font-medium py-2 rounded-2xl"
              >
                Submit To Register
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default DonorCheckList;
