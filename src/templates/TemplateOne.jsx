import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function TemplateTwo({ data = {} }) {
  const resumeRef = useRef();
  const [isGenerating, setIsGenerating] = useState(false);

  // Function to convert comma-separated values into a bullet list
  const formatList = (text) => {
    if (!text) return null;
    return text.split(",").map((item, index) => (
      <li key={index} className="list-item">{item.trim()}</li>
    ));
  };

  // Default Data
  const safeData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+123 456 7890",
    dob: "01 Jan 1995",
    gender: "Male",
    address: "123 Main Street, City, Country",
    education: "Bachelor's in Computer Science",
    experience: "Software Developer at ABC Corp (2019 - Present), Intern at XYZ Ltd (2018)",
    skills: "JavaScript, React, Node.js, CSS, HTML",
    interests: "Reading, Coding, Traveling",
    languages: "English, Spanish",
    profile: "A self-motivated and adaptable individual with a strong desire to learn and develop new skills. Quick to grasp new concepts and capable of working both independently and in a team. Passionate about personal and professional growth, with a positive attitude toward challenges and opportunities.",
    ...data,
  };

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      const element = resumeRef.current;
      if (!element) throw new Error("Resume content not found");

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(canvas, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${safeData.name.replace(/ /g, "_") || "resume"}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("PDF generation failed. Please check the console.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <meta name="viewport" content="width=1024" />

      <div className="template-container">
        {/* Resume Wrapper */}
        <div ref={resumeRef} className="resume-wrapper">
          {/* Sidebar Section */}
          <div className="sidebar-section">
            <h1 className="name-header">{safeData.name}</h1>
            <p>{safeData.email} | {safeData.phone}</p>
            <p>{safeData.address}</p>
            <h2 className="section-heading">Profile</h2>
            <p>{safeData.profile}</p>

            <h2 className="section-heading">Contact Details</h2>
            <p><strong>Date of Birth:</strong> {safeData.dob}</p>
            <p><strong>Gender:</strong> {safeData.gender}</p>
          </div>

          {/* Main Content Section */}
          <div className="main-content-section">
            <h2 className="section-heading">Education</h2>
            <p>{safeData.education}</p>

            <h2 className="section-heading">Work Experience</h2>
            <ul>{formatList(safeData.experience)}</ul>

            <h2 className="section-heading">Skills</h2>
            <ul>{formatList(safeData.skills)}</ul>

            <h2 className="section-heading">Interests</h2>
            <ul>{formatList(safeData.interests)}</ul>

            <h2 className="section-heading">Languages</h2>
            <ul>{formatList(safeData.languages)}</ul>
          </div>
        </div>

        {/* Download Button */}
        <button onClick={handleDownloadPDF} disabled={isGenerating} className="download-button">
          {isGenerating ? "Generating PDF..." : "Download PDF"}
        </button>
      </div>

      {/* CSS Styles */}
      <style>{`
        /* Base Container */
        .template-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: #f3f4f6;
          padding: 1rem;
          overflow-x: auto;
        }

        /* Resume Wrapper */
        .resume-wrapper {
          display: flex;
          flex-direction: row;
          width: 210mm;
          min-height: 297mm;
          background: #ffffff;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 2rem;
          transform: scale(1);
          transform-origin: top center;
          overflow: hidden;
        }

        /* Sidebar */
        .sidebar-section {
          width: 33%;
          background: #2d3748;
          color: white;
          padding: 2rem;
          border-radius: 10px;
        }

        /* Main Content */
        .main-content-section {
          width: 67%;
          padding: 2rem;
        }

        /* Name Header */
        .name-header {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        /* Section Headings */
        .section-heading {
          font-size: 1.5rem;
          font-weight: bold;
          border-bottom: 2px solid #ccc;
          padding-bottom: 0.5rem;
          margin-top: 1rem;
        }

        /* List Items */
        .list-item {
          margin-left: 1rem;
          list-style-type: disc;
        }

        /* Download Button */
        .download-button {
          margin-top: 2rem;
          padding: 1rem 2rem;
          background: #4299e1;
          color: white;
          border: none;
          border-radius: 0.375rem;
          cursor: pointer;
          font-weight: 600;
        }

        /* Mobile Responsive Styles */
        @media screen and (max-width: 768px) {
          .template-container {
            padding: 1rem;
          }

          .resume-wrapper:not(.pdf-generation) {
            flex-direction: column;
            width: 100%;
            min-height: auto;
            margin: 0 auto;
          }

          .resume-wrapper:not(.pdf-generation) .sidebar-section,
          .resume-wrapper:not(.pdf-generation) .main-content-section {
            width: 100%;
            padding: 1rem;
          }

          .resume-wrapper:not(.pdf-generation) .name-header {
            font-size: 1.5rem;
            margin-bottom: 1rem;
          }

          .resume-wrapper:not(.pdf-generation) .section-heading {
            font-size: 1.1rem;
            margin: 1rem 0;
          }

          .resume-wrapper:not(.pdf-generation) .list-item {
            margin-left: 1rem;
          }

          .download-button {
            width: 100%;
            padding: 0.75rem;
            font-size: 0.9rem;
          }
        }

        /* PDF Generation Lock */
        .resume-wrapper.pdf-generation {
          flex-direction: row !important;
          width: 210mm !important;
          min-height: 297mm !important;
        }

        .resume-wrapper.pdf-generation .sidebar-section,
        .resume-wrapper.pdf-generation .main-content-section {
          width: 33% !important;
          width: 67% !important;
          padding: 2rem !important;
        }
      `}</style>
    </>
  );
}
