import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FileUploader } from 'react-drag-drop-files';
import { FiDownload, FiUpload } from 'react-icons/fi';

const UploadComponent = ({ handleChange, handleFileUpload, uploadStatus, fileType }) => (
  <div className="flex flex-col items-center w-full">
    <FileUploader handleChange={handleChange} name="file" types={fileType} />
    <button
      onClick={handleFileUpload}
      className="bg-green-500 hover:bg-green-600 hover:scale-110 transition duration-300 ease-in-out w-36 h-12 rounded-md shadow-md shadow-black/25 ring-1 ring-green-600/90 inset-ring-1 inset-ring-white/5 inset-shadow-sm inset-shadow-white/10 text-white font-bold mt-4 flex items-center justify-center gap-x-2"
    >
      <FiUpload />
      Upload
    </button>
    {uploadStatus && (
      <p className={`mt-4 font-semibold ${uploadStatus.success ? 'text-green-500' : 'text-red-500'}`}>
        {uploadStatus.message}
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

const Convert = ({ title, fileType, convertEndPoint, fileName }) => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [fileId, setFileId] = useState('');
  const [isConverted, setIsConverted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (file) => {
    setFile(file);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setUploadStatus({ success: false, message: 'Please select a file before uploading.' });
      return;
    }

    setUploadStatus({ success: true, message: 'Uploading file...' });

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('https://pdf-editor-backend-production.up.railway.app/api/v1/file/save/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("File Uploaded response id", response.data.response);
      setUploadStatus({ success: true, message: 'File uploaded successfully.' });

      // Trigger conversion API call after successful upload
      handleConvert(response.data.response);
    } catch (error) {
      setUploadStatus({ success: false, message: 'Failed to upload file.' });
      console.error(error);
    }
  };

  const handleConvert = async (fileId) => {
    console.log("Convert id", fileId);
    setUploadStatus({ success: true, message: 'Converting file...' });

    try {
      const response = await axios.post(`https://pdf-editor-backend-production.up.railway.app/api/v1${convertEndPoint}`, {
        id: fileId
      });

      if (response.data.statusCode === 200) {
        setUploadStatus({ success: true, message: 'File converted successfully.' });
        setIsConverted(true);
        setFileId(response.data.response)
      }
    } catch (error) {
      setUploadStatus({ success: false, message: 'Failed to convert file.' });
      console.error(error.message);
    }
  };

  const handleDownload = async () => {
    try {
      // First, get the file information from the server
      const response = await axios.post(
        'https://pdf-editor-backend-production.up.railway.app/api/v1/file/download/', 
        { file_id: fileId },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response.data)
      if (response.data.hasError) {
        setUploadStatus('Failed to get file information.');
        console.error('File information error:', response.data.message.general);
        return;
      }
  
      // Extract the file URL from the response
      const fileUrl = `https://pdf-editor-backend-production.up.railway.app${response.data.response.file}`;
  
      // Fetch the file using the extracted URL
      const fileResponse = await axios.get(fileUrl, {
        responseType: 'blob',
      });
  
      // Create a download link for the file
      const blob = new Blob([fileResponse.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      setUploadStatus('Failed to download encrypted file.');
      console.error('Download error:', error);
    }
  };

  return (
    <main className="min-h-screen flex flex-col gap-y-4 items-center justify-center bg-gray-100 p-6">
      <h3 className="text-3xl font-bold text-gray-800 mb-4">{title}</h3>
      <UploadComponent handleChange={handleChange} handleFileUpload={handleFileUpload} uploadStatus={uploadStatus} fileType={fileType} />
      {isConverted && <DownloadComponent handleDownload={handleDownload} />}
    </main>
  );
};

export default Convert;
