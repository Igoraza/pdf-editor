import React, { useState } from 'react';
import axios from 'axios';
import { FiDownload, FiLink } from 'react-icons/fi';

const UrlInputComponent = ({ handleUrlChange, handleUrlSubmit, conversionStatus }) => (
  <div className="flex flex-col items-center w-full">
    <input
      type="text"
      placeholder="Enter URL"
      onChange={handleUrlChange}
      className="mt-4 p-2 border rounded-md w-full max-w-sm"
    />
    <button
      onClick={handleUrlSubmit}
      className="bg-green-500 hover:bg-green-600 hover:scale-110 transition duration-300 ease-in-out w-36 h-12 rounded-md shadow-md shadow-black/25 ring-1 ring-green-600/90 inset-ring-1 inset-ring-white/5 inset-shadow-sm inset-shadow-white/10 text-white font-bold mt-4 flex items-center justify-center gap-x-2"
    >
      <FiLink />
      Convert
    </button>
    {conversionStatus.message && (
      <p className={`mt-4 font-semibold ${conversionStatus.success ? 'text-green-500' : 'text-red-500'}`}>
        {conversionStatus.message}
      </p>
    )}
  </div>
);

const DownloadComponent = ({ handleDownload }) => (
  <button
    onClick={handleDownload}
    className="bg-blue-500 hover:bg-blue-600 hover:scale-110 transition duration-300 ease-in-out w-36 h-12 rounded-md shadow-md shadow-black/25 ring-1 ring-blue-600/90 inset-ring-1 inset-ring-white/5 inset-shadow-sm inset-shadow-white/10 text-white font-bold mt-4 flex items-center justify-center gap-x-2"
  >
    <FiDownload />
    Download
  </button>
);

const Url2Pdf = () => {
  const [url, setUrl] = useState('');
  const [conversionStatus, setConversionStatus] = useState({ success: false, message: '' });
  const [fileId, setFileId] = useState('');

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleUrlSubmit = async () => {
    if (!url) {
      setConversionStatus({ success: false, message: 'Please enter a URL to convert.' });
      return;
    }

    try {
      setConversionStatus({ success: true, message: 'Converting URL to PDF...' });
      
      const convertResponse = await axios.post(
        'https://pdf-editor-backend-production.up.railway.app/api/v1/url/convert/pdf/',
        { url },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("URL to PDF conversion response ID:", convertResponse.data.response);
      setConversionStatus({ success: true, message: 'URL converted to PDF successfully.' });
      setFileId(convertResponse.data.response);
    } catch (error) {
      setConversionStatus({ success: false, message: 'Failed to convert URL to PDF.' });
      console.error(error);
    }
  };

  const handleDownload = async () => {
    try {
      setConversionStatus({ success: true, message: 'Preparing file for download...' });
      const response = await axios.post(
        'https://pdf-editor-backend-production.up.railway.app/api/v1/file/download/',
        { file_id: fileId },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.hasError) {
        setConversionStatus({ success: false, message: 'Failed to get file information.' });
        console.error('File information error:', response.data.message.general);
        return;
      }

      const fileUrl = `https://pdf-editor-backend-production.up.railway.app${response.data.response.file}`;

      const fileResponse = await axios.get(fileUrl, {
        responseType: 'blob',
      });

      const blob = new Blob([fileResponse.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'converted_file.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      setConversionStatus({ success: true, message: 'File downloaded successfully.' });
    } catch (error) {
      setConversionStatus({ success: false, message: 'Failed to download file.' });
      console.error('Download error:', error);
    }
  };

  return (
    <main className="min-h-screen flex flex-col gap-y-4 items-center justify-center bg-gray-100 p-6">
      <h3 className="text-3xl font-bold text-gray-800 mb-4">Convert URL to PDF</h3>
      <UrlInputComponent 
        handleUrlChange={handleUrlChange} 
        handleUrlSubmit={handleUrlSubmit} 
        conversionStatus={conversionStatus}
      />
      {fileId && <DownloadComponent handleDownload={handleDownload} />}
    </main>
  );
};

export default Url2Pdf;
