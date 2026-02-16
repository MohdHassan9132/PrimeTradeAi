import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ImageUpload from '../components/ImageUpload';
import './UpdateAvatar.css';

const UpdateAvatar = () => {
    const { user, updateUserAvatar } = useAuth();
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(user?.avatar || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleImageSelect = (file) => {
        setSelectedImage(file);
        setError('');
        setSuccess('');

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedImage) {
            setError('Please select an image');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
        
            const formData = new FormData();
            formData.append('image', selectedImage);

            
            await updateUserAvatar(formData);

            setSuccess('Avatar updated successfully!');
            setSelectedImage(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update avatar');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setSelectedImage(null);
        setPreviewUrl(user?.avatar || '');
        setError('');
        setSuccess('');
    };

    return (
        <div className="update-avatar-page">
            <div className="page-header">
                <h1>Update Avatar</h1>
                <p className="page-subtitle">Upload a new profile picture</p>
            </div>

            <div className="avatar-card card">
                <div className="avatar-preview-section">
                    <div className="current-avatar">
                        <h3>Current Avatar</h3>
                        <img
                            src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName || 'User')}`}
                            alt="Current avatar"
                            className="preview-image"
                        />
                    </div>

                    {previewUrl && previewUrl !== user?.avatar && (
                        <div className="arrow-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </div>
                    )}

                    {previewUrl && previewUrl !== user?.avatar && (
                        <div className="new-avatar">
                            <h3>New Avatar</h3>
                            <img
                                src={previewUrl}
                                alt="New avatar preview"
                                className="preview-image"
                            />
                        </div>
                    )}
                </div>

                {error && (
                    <div className="alert alert-error">
                        <svg className="alert-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {error}
                    </div>
                )}

                {success && (
                    <div className="alert alert-success">
                        <svg className="alert-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="avatar-form">
                    <ImageUpload
                        onImageSelect={handleImageSelect}
                        label="Choose New Avatar"
                        accept="image/*"
                    />

                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleCancel}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading || !selectedImage}
                        >
                            {loading ? 'Updating...' : 'Update Avatar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateAvatar;
