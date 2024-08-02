import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FileUploader } from 'react-drag-drop-files';
import { FiDownload } from 'react-icons/fi';

const UploadComponent = ({ handleChange, handleFileUpload, uploadStatus, fileIndex, isLoading }) => (
  <div className="flex flex-col items-center w-full mb-6">
    <h4 className="text-xl font-bold text-gray-700 mb-2">Upload PDF {fileIndex}</h4>
    <FileUploader handleChange={handleChange} name={`file${fileIndex}`} types={['PDF']} />
    <button
      onClick={handleFileUpload}
      className="bg-green-500 hover:bg-green-600 hover:scale-105 transition duration-300 ease-in-out w-full md:w-96 lg:w-96 h-12 rounded-md shadow-md text-white font-bold mt-4 flex items-center justify-center gap-x-2"
      disabled={isLoading}
    >
      {isLoading ? 'Uploading...' : 'Upload'}
    </button>
    {uploadStatus && (
      <p className={`mt-4 font-semibold ${uploadStatus.success ? 'text-green-500' : 'text-red-500'}`}>
        {uploadStatus.message}
      </p>
    )}
  </div>
);

const DownloadComponent = ({ handleDownload, isLoading }) => (
  <button
    onClick={handleDownload}
    className="bg-green-500 hover:bg-green-600 hover:scale-105 transition duration-300 ease-in-out btn h-12 rounded-md shadow-md text-white font-bold mt-4 "
    disabled={isLoading}
  >
    {isLoading ? 'Downloading...' : <><FiDownload /> Download Merged PDF</>}
  </button>
);

const Merge = () => {
  const [fileOne, setFileOne] = useState(null);
  const [fileTwo, setFileTwo] = useState(null);
  const [uploadStatusOne, setUploadStatusOne] = useState(null);
  const [uploadStatusTwo, setUploadStatusTwo] = useState(null);
  const [fileIdOne, setFileIdOne] = useState('');
  const [fileIdTwo, setFileIdTwo] = useState('');
  const [mergedFileId, setMergedFileId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadingOne, setIsUploadingOne] = useState(false);
  const [isUploadingTwo, setIsUploadingTwo] = useState(false);
  const [isMerging, setIsMerging] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

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
    const setStatus = fileIndex === 1 ? setUploadStatusOne : setUploadStatusTwo;
    const setIsUploading = fileIndex === 1 ? setIsUploadingOne : setIsUploadingTwo;

    if (!file) {
      setStatus({ success: false, message: `Please select PDF file ${fileIndex} before uploading.` });
      return;
    }

    try {
      setIsUploading(true);
      setStatus({ success: true, message: `Uploading PDF file ${fileIndex}...` });
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

      setStatus({ success: true, message: `PDF file ${fileIndex} uploaded successfully.` });
    } catch (error) {
      setStatus({ success: false, message: `Failed to upload PDF file ${fileIndex}.` });
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleMergeFiles = async () => {
    if (!fileIdOne || !fileIdTwo) {
      setUploadStatusOne({ success: false, message: 'Please upload both PDF files before merging.' });
      return;
    }

    try {
      setIsMerging(true);
      setUploadStatusOne({ success: true, message: 'Merging files...' });

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
      setUploadStatusOne({ success: true, message: 'Files merged successfully.' });
      setMergedFileId(mergedFileId);
      setIsModalOpen(true); // Open the modal after successful merge
    } catch (error) {
      setUploadStatusOne({ success: false, message: 'Failed to merge files.' });
      console.error(error);
    } finally {
      setIsMerging(false);
    }
  };

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      setUploadStatusOne({ success: true, message: 'Preparing merged file for download...' });
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
        setUploadStatusOne({ success: false, message: 'Failed to get merged file information.' });
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
      setUploadStatusOne({ success: true, message: 'Merged file downloaded successfully.' });
      setIsModalOpen(false); // Close the modal after downloading the file
    } catch (error) {
      setUploadStatusOne({ success: false, message: 'Failed to download merged file.' });
      console.error('Download error:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col gap-y-6 items-center justify-center bg-gray-100 p-6">
      <h3 className="text-3xl font-bold text-gray-800 mb-6">Merge PDFs</h3>
      <UploadComponent 
        handleChange={(file) => handleChange(file, 1)} 
        handleFileUpload={() => handleFileUpload(1)} 
        uploadStatus={uploadStatusOne} 
        fileIndex={1}
        isLoading={isUploadingOne}
      />
      {fileIdOne && (
        <UploadComponent 
          handleChange={(file) => handleChange(file, 2)} 
          handleFileUpload={() => handleFileUpload(2)} 
          uploadStatus={uploadStatusTwo} 
          fileIndex={2}
          isLoading={isUploadingTwo}
        />
      )}
      {fileIdOne && fileIdTwo && (
        <button
          onClick={handleMergeFiles}
          className="bg-yellow-500 hover:bg-yellow-600 hover:scale-105 transition duration-300 ease-in-out btn w-full md:w-96 lg:w-96 h-12 rounded-md shadow-md text-white font-bold mt-4 flex items-center justify-center gap-x-2"
          disabled={isMerging}
        >
          {isMerging ? 'Merging...' : 'Merge'}
        </button>
      )}

      {!isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
            <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold mb-4">Merge Successful</h2>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
            </div>
            <p className="mb-6 mt-6">Your files have been merged successfully. Click the button below to download the merged PDF.</p>
            <DownloadComponent handleDownload={handleDownload} isLoading={isDownloading} />
          </div>
        </div>
      )}
    </main>
  );
};

export default Merge;
