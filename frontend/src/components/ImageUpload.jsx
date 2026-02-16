import { useState, useRef } from 'react';
import './ImageUpload.css';

const ImageUpload = ({ onImageSelect, label = 'Capture Photo' }) => {
    const [preview, setPreview] = useState(null);
    const [fileName, setFileName] = useState('');
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);

            onImageSelect(file);
        }
    };

    const handleClear = () => {
        setPreview(null);
        setFileName('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        onImageSelect(null);
    };

    return (
        <div className="image-upload">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="image-upload-input"
                id="image-upload-input"
            />

            {!preview ? (
                <label htmlFor="image-upload-input" className="image-upload-label">
                    <div className="image-upload-placeholder">
                        <svg
                            className="upload-icon"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        <span>{label}</span>
                    </div>
                </label>
            ) : (
                <div className="image-upload-preview">
                    <img src={preview} alt="Preview" className="preview-image" />
                    <div className="preview-info">
                        <p className="preview-filename">{fileName}</p>
                        <button type="button" onClick={handleClear} className="btn btn-secondary btn-sm">
                            Retake
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
