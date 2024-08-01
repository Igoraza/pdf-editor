import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FileUploader } from 'react-drag-drop-files';
import { FiLock, FiDownload } from 'react-icons/fi';

const UploadComponent = ({ handleChange, handleFileUpload, uploadStatus }) => (
  <div className="flex flex-col items-center">
    <FileUploader handleChange={handleChange} name="file" types={['PDF']} />
    <button
      onClick={handleFileUpload}
      className="bg-green-500 hover:bg-green-600 hover:scale-110 transition duration-300 ease-in-out w-36 h-12 rounded-md shadow-md shadow-black/25 ring-1 ring-green-600/90 inset-ring-1 inset-ring-white/5 inset-shadow-sm inset-shadow-white/10 text-white font-bold mt-4 flex items-center justify-center gap-x-2"
    >
      <FiLock />
      Encrypt
    </button>
    {uploadStatus && (
      <p className="mt-4 text-red-500 font-semibold">{uploadStatus}</p>
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

const Encrypt = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [fileId, setFileId] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (file) => {
    setFile(file);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setUploadStatus('Please select a PDF file before encrypting.');
      return;
    }

    try {
      // First, upload the file
      const formData = new FormData();
      formData.append('file', file);

      const uploadResponse = await axios.post(
        'https://pdf-editor-backend-production.up.railway.app/api/v1/file/save/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const fileId = uploadResponse.data.response;

      // Then, encrypt the file
      const encryptResponse = await axios.post(
        'https://pdf-editor-backend-production.up.railway.app/api/v1/encrypt/pdf/',
        { id: fileId },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("File Encrypted response:", encryptResponse.data);
      setUploadStatus('File encrypted successfully.');
      setFileId(fileId);
    } catch (error) {
      setUploadStatus('Failed to encrypt file.');
      console.error(error);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get('https://pdf-editor-backend-production.up.railway.app/api/v1/file/download', {
        params: { file_id: fileId },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'encrypted_file.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      setUploadStatus('Failed to download encrypted file.');
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen flex flex-col gap-y-4 items-center justify-center bg-gray-100 p-6">
      <h3 className="text-3xl font-bold text-gray-800">Encrypt PDF</h3>
      <UploadComponent 
        handleChange={handleChange} 
        handleFileUpload={handleFileUpload} 
        uploadStatus={uploadStatus} 
      />
      {fileId && <DownloadComponent handleDownload={handleDownload} />}
    </main>
  );
};

export default Encrypt;