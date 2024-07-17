import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as pdfjsLib from 'pdfjs-dist/webpack';

export default function Pdf2Pic() {
  const [images, setImages] = useState([]);
  const [fileName, setFileName] = useState('');
  const [status, setStatus] = useState('');

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'application/pdf',
    onDrop: async (acceptedFiles) => {
      setStatus('Processing...');
      setFileName(acceptedFiles[0].name);
      const file = acceptedFiles[0];
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const jpgImages = [];

      for (let i = 0; i < pdf.numPages; i++) {
        const page = await pdf.getPage(i + 1);
        const viewport = page.getViewport({ scale: 1 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');

        await page.render({ canvasContext: ctx, viewport }).promise;

        const jpgDataUrl = canvas.toDataURL('image/jpeg');
        jpgImages.push(jpgDataUrl);
      }

      setImages(jpgImages);
      setStatus('Conversion Complete');
    },
  });

  return (
    <main className="min-h-screen mt-3 p-4">
      <h2 className="text-center text-2xl font-bold mb-4">PDF to JPG</h2>
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-400 p-6 text-center cursor-pointer mb-4"
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop a PDF file here, or click to select one</p>
      </div>
      {fileName && (
        <div className="text-center mb-4">
          <p className="text-lg">File: {fileName}</p>
          <p className="text-md text-blue-500">{status}</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="border p-2">
            <img src={image} alt={`PDF page ${index + 1}`} className="w-full h-auto" />
          </div>
        ))}
      </div>
    </main>
  );
}
