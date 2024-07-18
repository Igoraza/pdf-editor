import React, { useState } from 'react';
import axios from 'axios';
import { FileUploader } from 'react-drag-drop-files';
import { FiDownload, FiUpload } from 'react-icons/fi';
import Modal from 'react-modal';

const UploadComponent = ({ handleChange, handleFileUpload, uploadStatus }) => (
  <div className="flex flex-col items-center">
    <FileUploader handleChange={handleChange} name="file" types={["PDF", "JPG", "PNG"]} />
    <button
      onClick={handleFileUpload}
      className="bg-green-500 hover:bg-green-600 hover:scale-110 transition duration-300 ease-in-out w-36 h-12 rounded-md shadow-md shadow-black/25 ring-1 ring-green-600/90 inset-ring-1 inset-ring-white/5 inset-shadow-sm inset-shadow-white/10 text-white font-bold mt-4 flex items-center justify-center gap-x-2"
    >
      <FiUpload />
      Upload
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

const ConversionModal = ({ isOpen, onRequestClose, handleConvert }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    className="bg-white p-6 rounded-md shadow-lg flex flex-col items-center"
  >
    <h2 className="text-2xl font-bold mb-4">Convert File</h2>
    <p className="mb-4">Do you want to convert the uploaded file?</p>
    <div className="flex gap-x-4">
      <button
        onClick={handleConvert}
        className="bg-green-500 hover:bg-green-600 w-24 h-10 rounded-md shadow-md text-white font-bold"
      >
        Yes
      </button>
      <button
        onClick={onRequestClose}
        className="bg-red-500 hover:bg-red-600 w-24 h-10 rounded-md shadow-md text-white font-bold"
      >
        No
      </button>
    </div>
  </Modal>
);

const Convert = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [fileId, setFileId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (file) => {
    setFile(file);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setUploadStatus('Please select a file before uploading.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://127.0.0.1:8000/api/v1/file/save/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("File Uploaded response id", response.data.response);
      setUploadStatus('File uploaded successfully.');
      setFileId(response.data.response);
      setIsModalOpen(true);
    } catch (error) {
      setUploadStatus('Failed to upload file.');
      console.error(error);
    }
  };

  const handleConvert = async () => {
    console.log("Convert id", fileId);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/pdf/convert/word/`, {
        params: { file_id: fileId }
      });

      if (response.data.statusCode === 200) {
        setUploadStatus('File converted successfully.');
        setIsModalOpen(false);
      }
    } catch (error) {
      setUploadStatus('Failed to convert file.');
      console.error(error.message);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/v1/file/download', {
        params: { file_id: fileId },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'converted_file.docx');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      setUploadStatus('Failed to download file.');
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen flex flex-col gap-y-4 items-center justify-center bg-gray-100 p-6">
      <h3 className="text-3xl font-bold text-gray-800">PDF to Word</h3>
      <UploadComponent handleChange={handleChange} handleFileUpload={handleFileUpload} uploadStatus={uploadStatus} />
      {fileId && <DownloadComponent handleDownload={handleDownload} />}
      <ConversionModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        handleConvert={handleConvert}
      />
    </main>
  );
};

export default Convert;
