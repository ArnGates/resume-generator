import { useState } from "react";

export default function ResumeForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    education: "",
    experience: "",
    skills: "",
    interests: "",
    languages: "",
    selectedTemplate: "TemplateOne",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in all required fields (Name, Email, Phone)");
      return;
    }
    onSubmit(formData);
  };

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 border">
      <div className="mt-2 bg-yellow-400 text-black py-1">
        <marquee behavior="scroll" direction="left" className="font-semibold">
          🚀 New templates coming soon! Stay tuned for exciting updates. 🎉 Note: refresh the main page if resume pdf layout is mess after download! Thankyou
        </marquee>
      </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4 sm:mb-6">
          Create Your Resume
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input type="text" name="name" placeholder="Full Name *" value={formData.name} onChange={handleChange} className="input" required />
              <input type="email" name="email" placeholder="Email *" value={formData.email} onChange={handleChange} className="input" required />
              <input type="tel" name="phone" placeholder="Phone *" value={formData.phone} onChange={handleChange} className="input" required />
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="input" />
              <select name="gender" value={formData.gender} onChange={handleChange} className="input">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="input" />
            </div>
          </div>

          {/* Education & Work Experience */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
              Education & Work
            </h3>
            <textarea name="education" placeholder="Education * (Degree, Institution, Year)" value={formData.education} onChange={handleChange} className="input h-16 sm:h-20" required />
            <textarea name="experience" placeholder="Work Experience * (Separate positions with commas)" value={formData.experience} onChange={handleChange} className="input h-16 sm:h-20" required />
          </div>

          {/* Skills & Interests */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
              Skills & Interests
            </h3>
            <textarea name="skills" placeholder="Skills * (Separate skills with commas)" value={formData.skills} onChange={handleChange} className="input h-16 sm:h-20" required />
            <textarea name="interests" placeholder="Interests (Separate interests with commas)" value={formData.interests} onChange={handleChange} className="input h-16 sm:h-20" />
            <textarea name="languages" placeholder="Languages * (Separate languages with commas)" value={formData.languages} onChange={handleChange} className="input h-16 sm:h-20" required />
          </div>

          {/* Template Selection */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
              Select Template
            </h3>
            <select name="selectedTemplate" value={formData.selectedTemplate} onChange={handleChange} className="input">
              <option value="TemplateOne">Classic Template</option>
              <option value="TemplateTwo">Simple Template</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Generate Resume
          </button>
        </form>
      </div>

      {/* Tailwind Utility Classes */}
      <style>{`
        .input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 14px;
        }

        @media screen and (max-width: 640px) {
          .input {
            font-size: 16px;
            padding: 12px;
          }
        }
      `}</style>
    </div>
  );
}
