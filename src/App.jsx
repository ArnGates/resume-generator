import { useState } from "react";
import ResumeForm from "./components/ResumeForm";
import TemplateOne from "./templates/TemplateOne";
import TemplateTwo from "./templates/TemplateTwo";

export default function App() {
  const [resumeData, setResumeData] = useState(null);

  const handleFormSubmit = (data) => {
    setResumeData(data); // Save form data
  };

  const renderTemplate = () => {
    switch (resumeData.selectedTemplate) {
      case "TemplateTwo":
        return <TemplateTwo data={resumeData} />;
      default:
        return <TemplateOne data={resumeData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {!resumeData ? (
        <ResumeForm onSubmit={handleFormSubmit} />
      ) : (
        <div>
          {renderTemplate()}
          <button
            onClick={() => setResumeData(null)}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Back to Form
          </button>
        </div>
      )}
    </div>
  );
}
