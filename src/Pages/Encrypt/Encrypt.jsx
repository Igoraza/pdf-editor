import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FileUploader } from 'react-drag-drop-files';
import { FiLock, FiDownload } from 'react-icons/fi';

const UploadComponent = ({ handleChange, handleFileUpload, uploadStatus, password, setPassword }) => (
  <div className="flex flex-col items-center">
    <FileUploader handleChange={handleChange} name="file" types={['PDF']} />
    <input
      type="password"
      placeholder="Enter encryption password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="mt-4 p-2 border rounded-md"
    />
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
  const [password, setPassword] = useState('');

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

    if (!password) {
      setUploadStatus('Please enter a password for encryption.');
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
      console.log("The file Saved ID: ",fileId)

      // Then, encrypt the file
      const encryptResponse = await axios.post(
        'https://pdf-editor-backend-production.up.railway.app/api/v1/encrypt/pdf/',
        { id: fileId, password: password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    
      console.log("File Encrypted response ID:", encryptResponse.data.response);
      setUploadStatus('File encrypted successfully.');
      setFileId(encryptResponse.data.response);
    } catch (error) {
      setUploadStatus('Failed to encrypt file.');
      console.error(error);
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
      link.setAttribute('download', 'encrypted_file.pdf');
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
      <h3 className="text-3xl font-bold text-gray-800">Encrypt PDF</h3>
      <UploadComponent 
        handleChange={handleChange} 
        handleFileUpload={handleFileUpload} 
        uploadStatus={uploadStatus} 
        password={password}
        setPassword={setPassword}
      />
      {fileId && <DownloadComponent handleDownload={handleDownload} />}
    </main>
  );
};

export default Encrypt;
