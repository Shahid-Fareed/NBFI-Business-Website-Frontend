"use client";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useTranslation } from 'react-i18next';
import WhyMutualFundBlue from './typeMutualFund'

const ContactForm = ({ sectionData }: any) => {
    const [activeTab, setActiveTab] = useState("contact");
    const { executeRecaptcha } = useGoogleReCaptcha();
    const { i18n } = useTranslation();

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phonenumber: "",
        location: "",
        query: "",
        message: "",
        existing: "",
        cnic: "",

    });
    const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [isError, setIsError] = useState(false);

    // Set active tab based on URL hash when the component mounts
    useEffect(() => {
        if (window.location.hash === "#complaint") {
            setActiveTab("complaint");
        }
    }, []);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        window.location.hash = tab === "complaint" ? "#complaint" : "#contact";
        setErrors({});
        setResponseMessage("");
        setIsError(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setErrors((prevErrors: any) => ({ ...prevErrors, [name]: "" }));
    };

    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPhoneNumber = (number: string) => /^03\d{9}$/.test(number);
    const isValidCnic = (cnic: string) => /^\d{5}-\d{7}-\d{1}$/.test(cnic);

    const validateForm = (type: string) => {
        const newErrors: any = {};

        if (!formData.firstname) newErrors.firstname = "First name is required.";
        if (!formData.lastname) newErrors.lastname = "Last name is required.";
        if (!formData.email || !isValidEmail(formData.email)) newErrors.email = "Enter a valid email address.";
        if (!formData.phonenumber || !isValidPhoneNumber(formData.phonenumber)) newErrors.phonenumber = "Enter a valid Pakistani phone number (e.g., 03XXXXXXXXX).";
        if (!formData.message) newErrors.message = "Message is required.";

        if (type === "complaint") {
            if (!formData.existing) newErrors.existing = "Please select if you are an existing client.";
            if (formData.existing === "yes") {
                if (!formData.cnic) newErrors.cnic = "CNIC is required.";
                else if (!isValidCnic(formData.cnic)) newErrors.cnic = "Enter CNIC in XXXXX-XXXXXXX-X format.";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleFormSubmit = async (e: React.FormEvent, type: string) => {
        e.preventDefault();
        setResponseMessage("");
        setIsError(false);

        if (!validateForm(type)) {
            setIsError(true);
            return;
        }

        if (!executeRecaptcha) {
            setResponseMessage("reCAPTCHA not ready. Please try again.");
            setIsError(true);
            return;
        }

        setLoading(true);

        try {
            const token = await executeRecaptcha("submit_form");
            if (!token) throw new Error("Failed reCAPTCHA");

            const endpoint =
                type === "contact"
                    ? `${process.env.NEXT_PUBLIC_BACKEND_URI}/contactform/create`
                    : `${process.env.NEXT_PUBLIC_BACKEND_URI}/complaintform/create`;

            const payload =
                type === "contact"
                    ? { ...formData, recaptchaToken: token  }
                    
                    
                    : {
                        firstname: formData.firstname,
                        lastname: formData.lastname,
                        email: formData.email,
                        phonenumber: formData.phonenumber,
                        message: formData.message,
                        existing: formData.existing,
                        ...(formData.existing === "yes" && { cnic: formData.cnic }),
                        recaptchaToken: token,
                    };

            const response = await axios.post(endpoint, payload);
            setResponseMessage(response.data.message || "Form submitted successfully!");
            setIsError(false);
            setFormData({
                firstname: "",
                lastname: "",
                email: "",
                phonenumber: "",
                location: "",
                query: "",
                message: "",
                existing: "",
                cnic: "",
            });
            setErrors({});
        } catch (error: any) {
            setResponseMessage(
                error.response?.data?.message || "An error occurred while submitting the form."
            );
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };


    return (

        <div className="container max-auto py-10 md:px-0 px-4">
            {/* Tabs */}
            <div className="flex border-b-4 gap-7 mb-6 relative">
                <div className="grid grid-cols-3 gap-1 absolute right-0 -bottom-1">
                    <span className="w-4 h-1 bg-primary text-primary"></span>
                    <span className="w-4 h-1 bg-[#946B29] text-[#946B29]"></span>
                    <span className="w-4 h-1 bg-awtgreen text-awtgreen"></span>
                </div>
                <button
                    className={`py-2 text-primary text-xl rounded-none px-0 border-0 -mb-1 focus:outline-none bg-transparent ${activeTab === "contact" ? "border-b-4 border-primary" : ""}`}
                    onClick={() => handleTabChange("contact")}
                >
                    Contact Form
                </button>
                <button
                    className={`py-2 text-primary text-xl rounded-none px-0 border-0 -mb-1 focus:outline-none bg-transparent ${activeTab === "complaint" ? "border-b-4 border-primary" : ""}`}
                    onClick={() => handleTabChange("complaint")}
                >
                    Complaint & Inquiry Form
                </button>
            </div>

            {/* Form */}
            <div>
                {activeTab === "contact" && (
                    <form
                        className="grid gap-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1"
                        onSubmit={(e) => handleFormSubmit(e, "contact")}
                    >

                        <div className="w-full">
                            <input
                                type="text"
                                name="firstname"
                                placeholder="First Name"
                                value={formData.firstname}
                                onChange={handleInputChange}
                                className="p-2 border rounded focus:outline-none w-full"
                                required
                            />
                        </div>


                        <div className="w-full">
                            <input
                                type="text"
                                name="lastname"
                                placeholder="Last Name"
                                value={formData.lastname}
                                onChange={handleInputChange}
                                className="p-2 border rounded focus:outline-none w-full"
                                required
                            />
                        </div>


                        <div className="w-full">
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="p-2 border rounded focus:outline-none w-full"
                                required
                            />
                            {errors["email"] && <p className="text-sm mt-1" style={{color:"red"}}>{errors["email"]}</p>}
                        </div>
                        <div className="w-full">
                            <input
                                type="text"
                                name="phonenumber"
                                placeholder="03xxxxxxxxx"
                                value={formData.phonenumber}
                                onChange={handleInputChange}
                                className="p-2 border rounded focus:outline-none w-full"
                                required
                            />
                            {errors["phonenumber"] && <p className="text-sm mt-1" style={{color:"red"}}>{errors["phonenumber"]}</p>}
                        </div>

                        <div className="w-full">
                            <input
                                type="text"
                                name="location"
                                placeholder="Location"
                                value={formData.location}
                                onChange={handleInputChange}
                                className="p-2 border rounded focus:outline-none w-full"

                            />
                        </div>

                        <div className="w-full">
                            <input
                                type="text"
                                name="query"
                                placeholder="Query"
                                value={formData.query}
                                onChange={handleInputChange}
                                className="p-2 border rounded focus:outline-none w-full"
                            />
                        </div>

                        <textarea
                            name="message"
                            placeholder="Message"
                            value={formData.message}
                            onChange={handleInputChange}
                            className="p-2 border rounded focus:outline-none col-span-full"
                            rows={4}
                            required
                        />

                        <button
                            type="submit"
                            className="py-2 bg-awtgreen text-white rounded w-full sm:w-auto col-span-full md:col-span-1 md:col-start-3"
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                    </form>
                )}

                {activeTab === "complaint" && (
                    <form
                        className="grid gap-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1"
                        onSubmit={(e) => handleFormSubmit(e, "complaint")}
                    >
                        <div className="w-full">
                            <input
                                type="text"
                                name="firstname"
                                placeholder="First Name"
                                value={formData.firstname}
                                onChange={handleInputChange}
                                className="p-2 border rounded focus:outline-none w-full"
                                required
                            />
                        </div>

                        <div className="w-full">
                            <input
                                type="text"
                                name="lastname"
                                placeholder="Last Name"
                                value={formData.lastname}
                                onChange={handleInputChange}
                                className="p-2 border rounded focus:outline-none w-full"
                                required
                            />
                        </div>

                        <div className="w-full">
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="p-2 border rounded focus:outline-none w-full"
                                required
                            />
                            {errors["email"] && <p className="text-sm mt-1 " style={{color:"red"}}>{errors["email"]}</p>}
                        </div>

                        <div className="w-full">
                            <input
                                type="text"
                                name="phonenumber"
                                placeholder="03xxxxxxxxx"
                                value={formData.phonenumber}
                                onChange={handleInputChange}
                                className="p-2 border rounded focus:outline-none w-full"
                                required
                            />
                            {errors["phonenumber"] && <p className="text-sm mt-1 " style={{color:"red"}}>{errors["phonenumber"]}</p>}
                        </div>

                        <div className="flex items-center gap-4">
                            <label className="font-medium">Are you an existing client?</label>
                            <label className="flex items-center gap-1">
                                <input
                                    type="radio"
                                    name="existing"
                                    value="yes"
                                    checked={formData.existing === "yes"}
                                    onChange={handleInputChange}
                                />
                                Yes
                            </label>
                            <label className="flex items-center gap-1">
                                <input
                                    type="radio"
                                    name="existing"
                                    value="no"
                                    checked={formData.existing === "no"}
                                    onChange={handleInputChange}
                                />
                                No
                            </label>
                        </div>

                        {formData.existing === "yes" && (
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="cnic"
                                    placeholder="xxxxx-xxxxxxx-x"
                                    value={formData.cnic}
                                    onChange={handleInputChange}
                                    className="p-2 border rounded focus:outline-none w-full"
                                    required
                                />
                                {errors["cnic"] && <p className="text-sm mt-1" style={{color:"red"}}>{errors["cnic"]}</p>}
                            </div>
                        )}


                        <textarea
                            name="message"
                            placeholder="Your Complaint or Inquiry"
                            value={formData.message}
                            onChange={handleInputChange}
                            className="p-2 border rounded focus:outline-none col-span-full"
                            rows={4}
                            required
                        />

                        <button
                            type="submit"
                            className="py-2 bg-awtgreen text-white rounded w-full sm:w-auto md:max-md:col-span-full col-span-1 md:col-start-1"
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                    </form>

                )}

            </div>

            {responseMessage && (
                <div
                    className="mt-4 text-center"
                    style={{ color: isError ? "red" : "green" }}
                >
                    {responseMessage}
                </div>
            )}


            {activeTab === "complaint" && (
                <div className='bg-primary mt-10 p-10'>
                    <h2 className='text-3xl sm:text-4xl text-white mb-3 heading-title' dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? sectionData?.title : sectionData?.title_urdu }}></h2>
                    <div className='mt-6 grid grid-cols-1 sm:grid-cols-3 gap-10'>
                        {sectionData?.blocks.map((items: any, index: any) => (
                            <div key={items?.id} className='relative p-4'>
                                <h3 className='text-9xl font-semibold text-white opacity-10 absolute left-0 -top-5' dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? items?.subtitle : items?.subtitle_urdu }}></h3>
                                <h3 className='text-white text-xl font-medium' dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? items?.title : items?.title_urdu }}></h3>
                                <p className='text-white text-sm' dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? items?.description : items?.description_urdu }}>
                                </p>
                            </div>
                        ))}

                    </div>
                </div>
            )}

        </div>
    );
};

export default ContactForm;
