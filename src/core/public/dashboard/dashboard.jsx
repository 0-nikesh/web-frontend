import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
    const [isLoadingLikes, setIsLoadingLikes] = useState({});

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


    const handleLikePost = async (postId) => {
        const token = localStorage.getItem('authToken');
        setIsLoadingLikes((prev) => ({ ...prev, [postId]: true })); // Set loading state for this post

        try {
            const response = await axios.post(
                `http://localhost:3000/api/posts/${postId}/like`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            // Update the post in the state with the new like count and liked_by array
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post._id === postId ? { ...post, ...response.data.post } : post
                )
            );
        } catch (error) {
            console.error('Error liking post:', error);
        } finally {
            setIsLoadingLikes((prev) => ({ ...prev, [postId]: false }));
        }
    };

    const hasUserLikedPost = (post, userId) => post.liked_by.includes(userId);

    return (
        <div className="bg-background dark:bg-surface-dark min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 pt-24">
                <div className="space-y-6">
                    {posts.map((post) => {
                        const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
                        return (
                            <div
                                key={post._id}
                                className="bg-surface dark:bg-surface-dark p-4 rounded-lg shadow w-full max-w-[400px] md:max-w-[600px] lg:max-w-[800px] mx-auto"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="text-text dark:text-text-dark">
                                        <strong>{post.user_id?.fname || 'User'}</strong> — {new Date(post.created_at).toLocaleString()}
                                    </div>
                                </div>
                                <p className="text-text dark:text-text-dark mb-2">{post.caption}</p>
                                {post.images.length > 0 && (
                                    <Swiper spaceBetween={10} slidesPerView={1}>
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
                                    <button
                                        className={`text-sm flex items-center ${hasUserLikedPost(post, userId) ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'
                                            }`}
                                        onClick={() => handleLikePost(post._id)}
                                        disabled={isLoadingLikes[post._id]}
                                    >
                                        <i className={`fas fa-heart mr-1 ${hasUserLikedPost(post, userId) ? 'text-red-500' : ''}`}></i>
                                        {post.like_count} Likes
                                    </button>
                                    <button className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                                        <i className="fas fa-comment mr-1"></i> {post.comments.length} Comments
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
