import React, { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import { ref as dbRef, push, set } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, database } from '../firebase'; // adjust path as needed

const JoinForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preference1: '',
    reason1: '',
    preference2: '',
    reason2: '',
    preference3: '',
    reason3: '',
    resume: null,
    photo: null,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const resumeInputRef = useRef(null);
  const photoInputRef = useRef(null);

  const options = [
    'Joint Secretary',
    'Joint Program Director of Events',
    'Joint Program Director of Finance',
    'Joint Program Director of Publicity',
    'Joint Skill Developer in Personality',
    'Joint Skill Developer in Writing',
    'Joint Art Developer',
    'Joint Video Editor',
    'Joint Aptitude Developer',
    'Joint Web Developer',
    'Joint Pacer'
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.preference1) newErrors.preference1 = 'Preference 1 is required';
    if (!formData.reason1.trim()) newErrors.reason1 = 'Reason 1 is required';
    if (!formData.resume) newErrors.resume = 'Resume is required';
    if (!formData.photo) newErrors.photo = 'Photo is required';
    else {
      const validResume = ['application/pdf'];
      const validPhotos = ['image/jpeg', 'image/png'];
      if (formData.resume && !validResume.includes(formData.resume.type)) {
        newErrors.resume = 'Resume must be a PDF file';
      }
      if (formData.photo && !validPhotos.includes(formData.photo.type)) {
        newErrors.photo = 'Photo must be JPG or PNG';
      }
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    setSubmitted(true);

    try {
      const resumeRef = storageRef(storage, `resumes/${formData.name}-${Date.now()}-${formData.resume.name}`);
      await uploadBytes(resumeRef, formData.resume);
      const resumeURL = await getDownloadURL(resumeRef);

      const photoRef = storageRef(storage, `photos/${formData.name}-${Date.now()}-${formData.photo.name}`);
      await uploadBytes(photoRef, formData.photo);
      const photoURL = await getDownloadURL(photoRef);

      const newEntryRef = push(dbRef(database, 'registrations'));
      await set(newEntryRef, {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        preference1: formData.preference1,
        reason1: formData.reason1,
        preference2: formData.preference2,
        reason2: formData.reason2,
        preference3: formData.preference3,
        reason3: formData.reason3,
        resumeURL,
        photoURL,
        submittedAt: new Date().toISOString(),
      });

      toast.success('🎉 Registration successful!');
      setLoading(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        preference1: '',
        reason1: '',
        preference2: '',
        reason2: '',
        preference3: '',
        reason3: '',
        resume: null,
        photo: null,
      });
      resumeInputRef.current.value = '';
      photoInputRef.current.value = '';
    } catch (error) {
      console.error("❌ Firebase error:", error);
      toast.error('Submission failed. Please try again.');
      setLoading(false);
      setSubmitted(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-10 p-8 bg-gray-900 text-white rounded-xl shadow-2xl font-sans">
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">Join PACE</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* Name */}
          <label className="mt-4 mb-1 font-semibold">Full Name</label>
          <input name="name" value={formData.name} onChange={handleChange} className="p-3 rounded-md bg-gray-800 border border-gray-600 text-white" />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}

          {/* Phone */}
          <label className="mt-4 mb-1 font-semibold">Phone Number</label>
          <input name="phone" value={formData.phone} onChange={handleChange} className="p-3 rounded-md bg-gray-800 border border-gray-600 text-white" />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}

          {/* Email */}
          <label className="mt-4 mb-1 font-semibold">Email</label>
          <input name="email" value={formData.email} onChange={handleChange} className="p-3 rounded-md bg-gray-800 border border-gray-600 text-white" />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

          {/* Preferences */}
      {[1, 2, 3].map((num) => {
        const ordinal = num === 1 ? '1st' : num === 2 ? '2nd' : '3rd';
          return (
          <div key={num} className="mt-6">
          <label className="block mb-1 font-semibold">{ordinal} Preference</label>
          <select
              name={`preference${num}`}
              value={formData[`preference${num}`]}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-600 text-white"
            >
          <option value="">-- Select Preference --</option>
              {options.map((opt, idx) => (
              <option key={idx} value={opt}>{opt}</option>
            ))}
          </select>
        {num === 1 && errors.preference1 && <p className="text-red-500 text-sm mt-1">{errors.preference1}</p>}

        <label className="block mt-4 mb-1 font-semibold">Why this preference?</label>
        <textarea
          name={`reason${num}`}
          value={formData[`reason${num}`]}
          onChange={handleChange}
          className="w-full p-3 rounded-md bg-gray-800 border border-gray-600 text-white h-24"
        />
        {num === 1 && errors.reason1 && <p className="text-red-500 text-sm mt-1">{errors.reason1}</p>}
      </div>
      );
    })}


          {/* Resume Upload */}
          <label className="mt-4 mb-1 font-semibold">Upload Resume (PDF)</label>
          <input type="file" name="resume" onChange={handleChange} accept=".pdf" ref={resumeInputRef} className="p-3 rounded-md bg-gray-800 border border-gray-600 text-white" />
          {errors.resume && <p className="text-red-500 text-sm mt-1">{errors.resume}</p>}

          {/* Photo Upload */}
          <label className="mt-4 mb-1 font-semibold">Upload Passport Photo (JPG/PNG)</label>
          <input type="file" name="photo" onChange={handleChange} accept="image/jpeg, image/png" ref={photoInputRef} className="p-3 rounded-md bg-gray-800 border border-gray-600 text-white" />
          {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo}</p>}

          {/* Submit Button */}
          <button type="submit" disabled={loading}
            className={`mt-6 py-3 px-6 rounded-lg font-bold text-black text-lg bg-yellow-400 ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-yellow-300'}`}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>

     {loading && <Loader />}

      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default JoinForm;
