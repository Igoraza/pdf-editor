import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FileUploader } from 'react-drag-drop-files';
import { FiDownload } from 'react-icons/fi';

const UploadComponent = ({ handleChange, handleFileUpload, uploadStatus, fileIndex }) => (
  <div className="flex flex-col items-center w-full mb-6">
    <h4 className="text-xl font-bold text-gray-700 mb-2">Upload PDF {fileIndex}</h4>
    <FileUploader handleChange={handleChange} name={`file${fileIndex}`} types={['PDF']} />
    <button
      onClick={handleFileUpload}
      className="bg-green-500 hover:bg-green-600 hover:scale-110 transition duration-300 ease-in-out w-36 h-12 rounded-md shadow-md shadow-black/25 ring-1 ring-green-600/90 inset-ring-1 inset-ring-white/5 inset-shadow-sm inset-shadow-white/10 text-white font-bold mt-4 flex items-center justify-center gap-x-2"
    >
      Upload
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
    className="bg-blue-500 hover:bg-blue-600 hover:scale-110 transition duration-300 ease-in-out w-36 h-12 rounded-md shadow-md shadow-black/25 ring-1 ring-blue-600/90 inset-ring-1 inset-ring-white/5 inset-shadow-sm inset-shadow-white/10 text-white font-bold mt-4 flex items-center justify-center gap-x-2"
  >
    <FiDownload />
    Download Merged PDF
  </button>
);

const Merge = () => {
  const [fileOne, setFileOne] = useState(null);
  const [fileTwo, setFileTwo] = useState(null);
  const [uploadStatus, setUploadStatus] = useState({ success: false, message: '' });
  const [fileIdOne, setFileIdOne] = useState('');
  const [fileIdTwo, setFileIdTwo] = useState('');
  const [mergedFileId, setMergedFileId] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (file, fileIndex) => {
    if (fileIndex === 1) {
      setFileOne(file);
    } else {
      setFileTwo(file);
    }
  };

  const handleFileUpload = async (fileIndex) => {
    const file = fileIndex === 1 ? fileOne : fileTwo;

    if (!file) {
      setUploadStatus({ success: false, message: `Please select PDF file ${fileIndex} before uploading.` });
      return;
    }

    try {
      setUploadStatus({ success: true, message: `Uploading PDF file ${fileIndex}...` });
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
      if (fileIndex === 1) {
        setFileIdOne(fileId);
      } else {
        setFileIdTwo(fileId);
      }

      setUploadStatus({ success: true, message: `PDF file ${fileIndex} uploaded successfully.` });
    } catch (error) {
      setUploadStatus({ success: false, message: `Failed to upload PDF file ${fileIndex}.` });
      console.error(error);
    }
  };

  const handleMergeFiles = async () => {
    if (!fileIdOne || !fileIdTwo) {
      setUploadStatus({ success: false, message: 'Please upload both PDF files before merging.' });
      return;
    }

    try {
      setUploadStatus({ success: true, message: 'Merging files...' });

      const mergeResponse = await axios.post(
        'https://pdf-editor-backend-production.up.railway.app/api/v1/merge/pdf/',
        { file_one: fileIdOne, file_two: fileIdTwo },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const mergedFileId = mergeResponse.data.response;
      setUploadStatus({ success: true, message: 'Files merged successfully.' });
      setMergedFileId(mergedFileId);
    } catch (error) {
      setUploadStatus({ success: false, message: 'Failed to merge files.' });
      console.error(error);
    }
  };

  const handleDownload = async () => {
    try {
      setUploadStatus({ success: true, message: 'Preparing merged file for download...' });
      const response = await axios.post(
        'https://pdf-editor-backend-production.up.railway.app/api/v1/file/download/',
        { file_id: mergedFileId },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.hasError) {
        setUploadStatus({ success: false, message: 'Failed to get merged file information.' });
        console.error('Merged file information error:', response.data.message.general);
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
      link.setAttribute('download', 'merged_file.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      setUploadStatus({ success: true, message: 'Merged file downloaded successfully.' });
    } catch (error) {
      setUploadStatus({ success: false, message: 'Failed to download merged file.' });
      console.error('Download error:', error);
    }
  };

  return (
    <main className="min-h-screen flex flex-col gap-y-4 items-center justify-center bg-gray-100 p-6">
      <h3 className="text-3xl font-bold text-gray-800 mb-4">Merge PDFs</h3>
      <UploadComponent 
        handleChange={(file) => handleChange(file, 1)} 
        handleFileUpload={() => handleFileUpload(1)} 
        uploadStatus={uploadStatus} 
        fileIndex={1}
      />
      <UploadComponent 
        handleChange={(file) => handleChange(file, 2)} 
        handleFileUpload={() => handleFileUpload(2)} 
        uploadStatus={uploadStatus} 
        fileIndex={2}
      />
      {fileIdOne && fileIdTwo && (
        <button
          onClick={handleMergeFiles}
          className="bg-yellow-500 hover:bg-yellow-600 hover:scale-110 transition duration-300 ease-in-out w-36 h-12 rounded-md shadow-md shadow-black/25 ring-1 ring-yellow-600/90 inset-ring-1 inset-ring-white/5 inset-shadow-sm inset-shadow-white/10 text-white font-bold mt-4 flex items-center justify-center gap-x-2"
        >
          Merge
        </button>
      )}
      {mergedFileId && <DownloadComponent handleDownload={handleDownload} />}
    </main>
  );
};

export default Merge;
