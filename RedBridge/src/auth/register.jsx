import React from 'react'
import { useState } from 'react'

const RegisterDonor = () => {

    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        email: '',
        dateOfBirth: '',
        gender: '',
        bloodGroup: '',
        location: '',
        password: '',
        confirmPassword: '',

    })

    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prv) => ({
            ...prv,
            [name]: value,
        })
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();


        setIsSubmitting(true);

        try {
            await new Promise((res) => setTimeout(res, 1500));
            alert('Message sent successfully');
            setFormData({
                name: '',
                contact: '',
                email: '',
                dateOfBirth: '',
                gender: '',
                bloodGroup: '',
                location: '',
                password: '',
                confirmPassword: '',
            });
            setErrors({});
        } catch (err) {
            setErrors({ submit: 'An unexpected error occurred' });
        } finally {
            setIsSubmitting(false);
        }

    };


    return (
        <>
            <section className='w-full flex flex-col  p-7  justify-center items-center bg-gray-200 '>
                
                
              
                <div className="bg-white shadow-md rounded-lg px-8 py-5 w-full max-w-md ">
                {errors.submit && <div className="text-red-600 mb-4 text-sm">{errors.submit}</div>}
                <form onSubmit={handleSubmit} className="space-y-5">
                     <h1 className='flex justify-center text-red-900 text-xl font-bold '>Donor Registration Form</h1>

                    <div className='flex flex-col' >
                            <label className='block text-sm font-medium mb-0.5'>Full Name:</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your Full Name"
                                className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-50"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label className='block text-sm font-medium mb-0.5'>Contact:</label>
                            <input
                                type="tel"
                                name="contact"
                                placeholder="Enter your contact"
                                className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-50"
                                value={formData.contact}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label className='block text-sm font-medium mb-0.5'>Email:</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your Email"
                                className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-50"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>


                        <div className='flex flex-col'>
                            <label className='block text-sm font-medium mb-0.5'>Date Of Birth:</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                placeholder="Enter your date of birth"
                                className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-50"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='flex gap-16'>
                            <div className='flex flex-col'>
                            <label htmlFor="gender" className="block text-sm font-medium mb-0.5">Gender:</label>
                            <select 
                            id="gender"
                            name="gender"
                            className=" w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-50" 
                             value={formData.gender}
                              onChange={handleChange}
                              required >
                              <option value="">Select Gender</option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                                <option value='Others'>Others</option>
                            </select>
                            </div>
                            
                            <div className='flex flex-col'>
                            <label htmlFor="bloodGroup" className="block text-sm font-medium mb-0.5">Blood Group:</label>
                            <select 
                            id="bloodGroup"
                            name="bloodGroup"
                            className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-50"
                              value={formData.bloodGroup}
                              onChange={handleChange}
                               required >
                                <option value="">Select Blood Group</option>
                                <option value='A+'>A+</option>
                                <option value='A-'>A-</option>
                                <option value='B+'>B+</option>
                                <option value='B-'>B-</option>
                                <option value='AB+'>AB+</option>
                                <option value='AB-'>AB-</option>
                                <option value='O+'>O+</option>
                                <option value='O-'>O-</option>
                            </select>
                            </div>
                        </div>

                        <div className='flex flex-col'>
                            <label className='block text-sm font-medium mb-0.5'>Location(District/City):</label>
                            <input
                                type="text"
                                name="location"
                                placeholder="Enter your District/City"
                                className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-50"
                                value={formData.location}
                                onChange={handleChange}
                                required
                            />
                        </div>


                        <div className='flex flex-col'>
                            <label className='block text-sm font-medium mb-0.5'>Create Password:</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-50"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label className='block text-sm font-medium mb-0.5'>Confirm Password:</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-50" 
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    
                    <div className='flex justify-center'  > 
                    <button
                        type="submit"
                        className="h-9 w-56 mt-3 bg-[#660000] hover:bg-[#800000] text-white font-medium py-2 rounded-2xl"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'submitting...' : 'Submit'}

                    </button>
                    </div>
                </form>

            </div>
            </section>
        </>
    )
}


export default RegisterDonor
