import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import Navbar from '../../../components/navbar';

const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const [caption, setCaption] = useState('');
    const [category, setCategory] = useState('');
    const [imageFiles, setImageFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.get('http://localhost:3000/api/posts/all', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleImageUpload = (e) => {
        setImageFiles([...imageFiles, ...e.target.files]);
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('caption', caption);
        formData.append('category', category);
        imageFiles.forEach((file) => formData.append('images', file));

        const token = localStorage.getItem('authToken'); // Fetch token here

        try {
            await axios.post('http://localhost:3000/api/posts/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}` // Attach the token
                },
            });
            setCaption('');
            setCategory('');
            setImageFiles([]);
            setIsModalOpen(false);
            fetchPosts(); // Refresh posts
        } catch (error) {
            console.error('Error creating post:', error);
        } finally {
            setLoading(false);
        }
    };


    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="bg-background dark:bg-surface-dark min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 pt-24">
                {/* Create Post Button */}
                <button
                    onClick={openModal}
                    className="bg-accent text-white px-4 py-2 rounded shadow hover:bg-accent-dark float-right mb-6"
                >
                    Create Post
                </button>

                {/* Create Post Modal */}
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    className="relative w-full max-w-[90%] md:max-w-[600px] bg-white dark:bg-surface-dark rounded-lg p-6 mx-auto mt-16 z-50"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40"
                >
                    <h2 className="text-xl font-bold mb-4 text-center">Create Post</h2>
                    <form onSubmit={handleCreatePost}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Select a Category</label>
                            <select
                                className="p-2 w-full rounded bg-primary-light dark:bg-darkAccent text-text-dark"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            >
                                <option value="">Select a Category</option>
                                <option value="Problems">Problems</option>
                                <option value="Query">Query</option>
                                <option value="Suggestions">Suggestions</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Your Thoughts</label>
                            <textarea
                                className="w-full p-2 rounded bg-primary-light dark:bg-darkAccent text-text-dark"
                                placeholder="Write your thoughts..."
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Upload Images</label>
                            <input type="file" multiple onChange={handleImageUpload} className="text-sm text-gray-500 dark:text-gray-400" />
                        </div>
                        <div className="flex items-center justify-end gap-4">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-accent text-white px-4 py-2 rounded hover:bg-accent-dark"
                                disabled={loading}
                            >
                                {loading ? 'Posting...' : 'Post'}
                            </button>
                        </div>
                    </form>
                </Modal>

                {/* Posts Feed */}
                <div className="space-y-6">
                    {posts.map((post) => (
                        <div
                            key={post._id}
                            className="bg-surface dark:bg-surface-dark p-4 rounded-lg shadow w-full max-w-[400px] md:max-w-[600px] lg:max-w-[800px] mx-auto relative z-10"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="text-text dark:text-text-dark">
                                    <strong>{post.user_id?.fname || 'User'}</strong> — {new Date(post.created_at).toLocaleString()}
                                </div>
                            </div>
                            <p className="text-text dark:text-text-dark mb-2">{post.caption}</p>
                            {post.images.length > 0 && (
                                <Swiper spaceBetween={10} slidesPerView={1} className="relative z-10">
                                    {post.images.map((image, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="w-full aspect-[1/1] overflow-hidden rounded-lg">
                                                <img src={image} alt={`Post image ${index + 1}`} className="w-full h-full object-cover" />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            )}
                            <div className="flex items-center justify-between mt-2">
                                <button className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                                    <i className="fas fa-thumbs-up mr-1"></i> {post.like_count} Likes
                                </button>
                                <button className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                                    <i className="fas fa-comment mr-1"></i> {post.comments.length} Comments
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
