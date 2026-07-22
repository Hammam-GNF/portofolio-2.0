import React, { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import useComments from "../hooks";
import { formatCommentDate } from "../../../utils";
import {
    MessageCircle,
    UserCircle2,
    AlertCircle
} from "lucide-react";


import Comment from "./comment/Comment";
import CommentForm from "./comment/CommentForm";


const Komentar = () => {

    const {
        comments,
        pinnedComment,

        isSubmitting,
        error,

        handleCommentSubmit

    } = useComments();

    useEffect(() => {

        AOS.init({
            once: false,
            duration: 1000,
        });
    }, []);

    // Calculate total comments (pinned + regular)
    const totalComments = comments.length + (pinnedComment ? 1 : 0);

    return (
        <div className="w-full bg-gradient-to-b from-white/10 to-white/5 rounded-2xl  backdrop-blur-xl shadow-xl" data-aos="fade-up" data-aos-duration="1000">
            <div className="p-6 border-b border-white/10" data-aos="fade-down" data-aos-duration="800">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-indigo-500/20">
                        <MessageCircle className="w-6 h-6 text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                        Comments <span className="text-indigo-400">({totalComments})</span>
                    </h3>
                </div>
            </div>
            <div className="p-6 space-y-6">
                {error && (
                    <div className="flex items-center gap-2 p-4 text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl" data-aos="fade-in">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p className="text-sm">{error}</p>
                    </div>
                )}
                
                <div>
                    <CommentForm onSubmit={handleCommentSubmit} isSubmitting={isSubmitting} error={error} />
                </div>

                <div className="space-y-4 h-[328px] overflow-y-auto overflow-x-hidden custom-scrollbar pt-1 pr-1 " data-aos="fade-up" data-aos-delay="200">
                    {/* Pinned Comment */}
                    {pinnedComment && (
                        <div data-aos="fade-down" data-aos-duration="800">
                            <Comment 
                                comment={pinnedComment} 
                                formatDate={formatCommentDate}
                                isPinned={true}
                            />
                        </div>
                    )}
                    
                    {/* Regular Comments */}
                    {comments.length === 0 && !pinnedComment ? (
                        <div className="text-center py-8" data-aos="fade-in">
                            <UserCircle2 className="w-12 h-12 text-indigo-400 mx-auto mb-3 opacity-50" />
                            <p className="text-gray-400">No comments yet. Start the conversation!</p>
                        </div>
                    ) : (
                        comments.map((comment, index) => (
                            <Comment 
                                key={comment.id} 
                                comment={comment} 
                                formatDate={formatCommentDate}
                                isPinned={false}
                            />
                        ))
                    )}
                </div>
            </div>
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(99, 102, 241, 0.5);
                    border-radius: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(99, 102, 241, 0.7);
                }
            `}</style>
        </div>
    );
};

export default Komentar;
