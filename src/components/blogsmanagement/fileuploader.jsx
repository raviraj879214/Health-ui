import { useState, useRef, useEffect } from "react";

export default function FileUploader({ defaultImage = null, onFileSelect, clear = false }) {
  const [preview, setPreview] = useState(defaultImage);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setPreview(defaultImage);
  }, [defaultImage]);

  useEffect(() => {
    if (clear) {
      if (preview && preview.startsWith("blob:")) URL.revokeObjectURL(preview);

      setPreview(null);
      setError(null);
      if (fileInputRef.current) fileInputRef.current.value = null;
      onFileSelect?.(null);
    }
  }, [clear, onFileSelect, preview]);

  const validateFile = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp", "image/gif"];

    if (!allowedTypes.includes(file.type)) {
      setError("Only image formats allowed (JPG, PNG, WEBP, GIF).");
      return false;
    }

    setError(null);
    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && validateFile(file)) {
      if (preview && preview.startsWith("blob:")) URL.revokeObjectURL(preview);

      const tempUrl = URL.createObjectURL(file);
      setPreview(tempUrl);
      onFileSelect?.(file);
    } else {
      e.target.value = null; // reset input if invalid
      onFileSelect?.(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (file && validateFile(file)) {
      if (preview && preview.startsWith("blob:")) URL.revokeObjectURL(preview);

      const tempUrl = URL.createObjectURL(file);
      setPreview(tempUrl);
      onFileSelect?.(file);
    } else {
      onFileSelect?.(null);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className="w-full max-w-md">
      <div
        className={`border-2 border-dashed rounded-xl p-10 h-64 flex items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition relative ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        onClick={() => fileInputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
        ) : (
          <p className="text-gray-500 text-lg">
            Drag & drop or{" "}
            <span className="text-blue-500 font-medium">click to upload</span>
          </p>
        )}

        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
