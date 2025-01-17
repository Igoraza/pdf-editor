import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FileUploader } from 'react-drag-drop-files';
import { FiLock, FiDownload } from 'react-icons/fi';

const UploadComponent = ({ handleChange, handleFileUpload, uploadStatus, password, setPassword }) => (
  <div className="flex flex-col items-center w-full">
    <FileUploader handleChange={handleChange} name="file" types={['PDF']} />
    <input
      type="password"
      placeholder="Enter encryption password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="mt-4 p-2 border rounded-md w-full max-w-sm"
    />
    <button
      onClick={handleFileUpload}
      className="bg-green-500 hover:bg-green-600 hover:scale-110 transition duration-300 ease-in-out w-full md:w-72 lg:w-96 h-12 rounded-md shadow-md shadow-black/25 ring-1 ring-green-600/90 inset-ring-1 inset-ring-white/5 inset-shadow-sm inset-shadow-white/10 text-white font-bold mt-4 flex items-center justify-center gap-x-2"
    >
      <FiLock />
      decrypt
    </button>
    {uploadStatus.message && (
      <p className={`mt-4 font-semibold ${uploadStatus.success ? 'text-green-500' : 'text-red-500'}`}>
        {uploadStatus.message}
      </p>
    )}
  </div>
);

const DownloadComponent = ({ handleDownload }) => (
  <button
    onClick={handleDownload}
    className="bg-green-500 hover:bg-green-600 hover:scale-110 transition duration-300 ease-in-out w-full md:w-72 lg:w-96 btn h-12 rounded-md shadow-md shadow-black/25 ring-1 ring-green-600/90 inset-ring-1 inset-ring-white/5 inset-shadow-sm inset-shadow-white/10 text-white font-bold mt-4 flex items-center justify-center gap-x-2"
  >
    <FiDownload />
    Download
  </button>
);

const PasswordRemover = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState({ success: false, message: '' });
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
      setUploadStatus({ success: false, message: 'Please select a PDF file before decrypting.' });
      return;
    }

    if (!password) {
      setUploadStatus({ success: false, message: 'Please enter a password for decryption.' });
      return;
    }

    try {
      setUploadStatus({ success: true, message: 'Uploading file...' });
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
      console.log("The file Saved ID: ", fileId);

      setUploadStatus({ success: true, message: 'Encrypting file...' });

      const encryptResponse = await axios.post(
        'https://pdf-editor-backend-production.up.railway.app/api/v1/decrypt/pdf/',
        { id: fileId, password: password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("File decrypt response ID:", encryptResponse.data.response);
      setUploadStatus({ success: true, message: 'File decrypt successfully.' });
      setFileId(encryptResponse.data.response);
    } catch (error) {
      setUploadStatus({ success: false, message: 'Failed to decrypt file.' });
      console.error(error);
    }
  };

  const handleDownload = async () => {
    try {
      setUploadStatus({ success: true, message: 'Preparing file for download...' });
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
        setUploadStatus({ success: false, message: 'Failed to get file information.' });
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
      link.setAttribute('download', 'decrypt_file.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      setUploadStatus({ success: true, message: 'File downloaded successfully.' });
    } catch (error) {
      setUploadStatus({ success: false, message: 'Failed to download decrypt file.' });
      console.error('Download error:', error);
    }
  };

  return (
    <main className="min-h-screen flex flex-col gap-y-4 items-center justify-center bg-gray-100 p-6">
      <h3 className="text-3xl font-bold text-gray-800 mb-4">Remove Password From PDF</h3>
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

export default PasswordRemover;
