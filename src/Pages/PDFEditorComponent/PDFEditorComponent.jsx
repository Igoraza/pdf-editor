import React, { useEffect, useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { AiOutlineCloudUpload, AiOutlineFilePdf } from 'react-icons/ai';
import { BsDownload } from 'react-icons/bs';
import 'tailwindcss/tailwind.css';

export default function PDFEditorComponent() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [pdfFile, setPdfFile] = useState(null);
  const [editedPdfUrl, setEditedPdfUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      setPdfFile(arrayBuffer);
      setMessage('PDF file uploaded successfully.');
    } else {
      setMessage('Please upload a valid PDF file.');
    }
  };

  const handleEditPdf = async () => {
    if (!pdfFile) {
      setMessage('No PDF file to process.');
      return;
    }

    try {
      const pdfDoc = await PDFDocument.load(pdfFile);
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      setEditedPdfUrl(url);
      setMessage('PDF processed successfully.');
    } catch (error) {
      setMessage('Error processing PDF file.');
    }
  };

  const handleDownloadPdf = () => {
    if (editedPdfUrl) {
      saveAs(editedPdfUrl, 'edited.pdf');
      setMessage('PDF downloaded successfully.');
    } else {
      setMessage('No edited PDF to download.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">PDF Editor</h1>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md flex flex-col items-center">
        <label
          htmlFor="pdf-upload"
          className="flex flex-col items-center text-lg font-medium text-gray-700 cursor-pointer"
        >
          <AiOutlineCloudUpload className="text-6xl text-green-500" />
          <span className="mt-2">Upload your PDF</span>
          <input
            id="pdf-upload"
            type="file"
            accept="application/pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
        {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
      </div>
      {pdfFile && (
        <button
          onClick={handleEditPdf}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300"
        >
          <AiOutlineFilePdf className="mr-2" />
          Process PDF
        </button>
      )}
      {editedPdfUrl && (
        <div className="w-full max-w-2xl flex flex-col items-center bg-white rounded-lg shadow-md p-4">
          <iframe
            src={editedPdfUrl}
            width="100%"
            height="600"
            className="mb-4 border rounded-lg shadow-sm"
            title="PDF Preview"
          />
          <button
            onClick={handleDownloadPdf}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300"
          >
            <BsDownload className="mr-2" />
            Download Edited PDF
          </button>
        </div>
      )}
    </div>
  );
}
