import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function TemplateTwo({ data = {} }) {
  const resumeRef = useRef();
  const [isGenerating, setIsGenerating] = useState(false);

  // Default Data
  const safeData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+123 456 7890",
    dob: "01 Jan 1995",
    gender: "Male",
    address: "123 Main Street, City, Country",
    education: "Bachelor's Degree in Computer Science",
    experience: "Software Developer at ABC Corp (2019 - Present)",
    skills: "JavaScript, React, Node.js, CSS, HTML",
    interests: "Reading, Coding, Traveling",
    languages: "English, Spanish",
    profile:
      "A motivated and adaptable graduate with a strong willingness to learn and grow professionally. Possesses excellent communication skills, a keen eye for detail, and a proactive approach to problem-solving.",
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

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "#f3f4f6",
          padding: "1rem",
          overflowX: "auto",
        }}
      >
        <div
          ref={resumeRef}
          style={{
            width: "210mm",
            height: "297mm",
            background: "#ffffff",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "2rem",
            transform: "scale(1)",
            transformOrigin: "top center",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              textAlign: "center",
              borderBottom: "2px solid #ccc",
              paddingBottom: "1rem",
              background: "#2d3748",
              color: "white",
              padding: "1rem",
              borderRadius: "10px",
            }}
          >
            <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>{safeData.name}</h1>
            <p>
              {safeData.email} | {safeData.phone}
            </p>
            <p>{safeData.address}</p>
          </div>

          {/* Profile */}
          <div style={{ marginTop: "1rem" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                borderBottom: "2px solid #ccc",
                paddingBottom: "0.5rem",
              }}
            >
              Profile
            </h2>
            <p>{safeData.profile}</p>
          </div>

          {/* Contact Details */}
          <div style={{ marginTop: "1rem" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                borderBottom: "2px solid #ccc",
                paddingBottom: "0.5rem",
              }}
            >
              Contact Details
            </h2>
            <p>
              <strong>Date of Birth:</strong> {safeData.dob}
            </p>
            <p>
              <strong>Gender:</strong> {safeData.gender}
            </p>
          </div>

          {/* Education */}
          <div style={{ marginTop: "1rem" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                borderBottom: "2px solid #ccc",
                paddingBottom: "0.5rem",
              }}
            >
              Education
            </h2>
            <p>{safeData.education}</p>
          </div>

          {/* Experience */}
          <div style={{ marginTop: "1rem" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                borderBottom: "2px solid #ccc",
                paddingBottom: "0.5rem",
              }}
            >
              Work Experience
            </h2>
            <p>{safeData.experience}</p>
          </div>

          {/* Skills */}
          <div style={{ marginTop: "1rem" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                borderBottom: "2px solid #ccc",
                paddingBottom: "0.5rem",
              }}
            >
              Skills
            </h2>
            <ul>
              {safeData.skills.split(",").map((skill, index) => (
                <li key={index}>• {skill.trim()}</li>
              ))}
            </ul>
          </div>

          {/* Interests */}
          <div style={{ marginTop: "1rem" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                borderBottom: "2px solid #ccc",
                paddingBottom: "0.5rem",
              }}
            >
              Interests
            </h2>
            <ul>
              {safeData.interests.split(",").map((interest, index) => (
                <li key={index}>• {interest.trim()}</li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          <div style={{ marginTop: "1rem" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                borderBottom: "2px solid #ccc",
                paddingBottom: "0.5rem",
              }}
            >
              Languages
            </h2>
            <ul>
              {safeData.languages.split(",").map((language, index) => (
                <li key={index}>• {language.trim()}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Download Button */}
        <button
          onClick={handleDownloadPDF}
          disabled={isGenerating}
          style={{
            marginTop: "2rem",
            padding: "1rem 2rem",
            background: "#4299e1",
            color: "white",
            border: "none",
            borderRadius: "0.375rem",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          {isGenerating ? "Generating PDF..." : "Download PDF"}
        </button>

        {/* Force Desktop View on Mobile */}
        <style>{`
          body {
            min-width: 1024px;
            overflow-x: auto;
          }
          @media screen and (max-width: 1024px) {
            html, body {
              zoom: 100%;
              transform: scale(1);
              overflow-x: auto;
            }
          }
          @media print {
            body {
              margin: 0;
              padding: 0;
              -webkit-print-color-adjust: exact;
            }
          }
        `}</style>
      </div>
    </>
  );
}
