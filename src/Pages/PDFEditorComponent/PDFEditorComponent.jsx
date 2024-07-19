import React, { useEffect, useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import 'tailwindcss/tailwind.css';

export default function PDFEditorComponent() {
    useEffect(() => {
        window.scrollTo(0,0)
    },[])
  const [pdfFile, setPdfFile] = useState(null);
  const [editedPdfUrl, setEditedPdfUrl] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      setPdfFile(arrayBuffer);
    }
  };

  const handleEditPdf = async () => {
    if (!pdfFile) return;

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(pdfFile);

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Create a Blob from the PDFBytes and create a URL
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    // Set the edited PDF URL to state
    setEditedPdfUrl(url);
  };

  const handleDownloadPdf = () => {
    if (editedPdfUrl) {
      saveAs(editedPdfUrl, 'edited.pdf');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 space-y-4">
      <div className="w-full max-w-md">
        <label
          htmlFor="pdf-upload"
          className="block text-lg font-medium text-gray-700"
        >
          Upload your PDF
        </label>
        <input
          id="pdf-upload"
          type="file"
          accept="application/pdf"
          onChange={handleFileUpload}
          className="mt-2 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      {pdfFile && (
        <button
          onClick={handleEditPdf}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600"
        >
          Process PDF
        </button>
      )}
      {editedPdfUrl && (
        <div className="w-full max-w-2xl flex flex-col items-center">
          <iframe
            src={editedPdfUrl}
            width="100%"
            height="600"
            className="mb-4 border rounded-lg shadow-sm"
            title="PDF Preview"
          />
          <button
            onClick={handleDownloadPdf}
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-sm hover:bg-green-600"
          >
            Download Edited PDF
          </button>
        </div>
      )}
    </div>
  );
}
