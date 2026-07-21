import { useCallback, useEffect, useState } from "react";
import { commentService } from "../services";

const useComments = () => {
    const [comments, setComments] = useState([]);
    const [pinnedComment, setPinnedComment] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");



    useEffect(() => {
        const fetchPinnedComment = async () => {
            try {
                const data = await commentService.getPinnedComment();

                if (data) {
                    setPinnedComment(data);
                }

            } catch (error) {
                console.error(
                    "Error fetching pinned comment:",
                    error
                );
            }
        };


        fetchPinnedComment();

    }, []);




    useEffect(() => {

        const fetchComments = async () => {
            try {

                const data = await commentService.getComments();

                setComments(data || []);

            } catch (error) {

                console.error(
                    "Error fetching comments:",
                    error
                );

            }
        };


        fetchComments();


        const subscription =
            commentService.subscribe(
                fetchComments
            );


        return () => {
            subscription.unsubscribe();
        };


    }, []);




    const handleCommentSubmit = useCallback(
        async ({
            newComment,
            userName,
            imageFile
        }) => {

            setError("");
            setIsSubmitting(true);


            try {

                const profileImageUrl =
                    await commentService.uploadImage(
                        imageFile
                    );


                await commentService.createComment({
                    content: newComment,
                    userName,
                    profileImage: profileImageUrl
                });


            } catch (error) {

                console.error(
                    "Error adding comment:",
                    error
                );


                setError(
                    "Failed to post comment. Please try again."
                );


            } finally {

                setIsSubmitting(false);

            }

        },
        []
    );




    const formatDate = useCallback(
        (timestamp) => {

            if (!timestamp) return "";


            const date =
                new Date(timestamp);

            const now =
                new Date();


            const diffMinutes =
                Math.floor(
                    (now - date) /
                    (1000 * 60)
                );


            const diffHours =
                Math.floor(
                    diffMinutes / 60
                );


            const diffDays =
                Math.floor(
                    diffHours / 24
                );



            if (diffMinutes < 1)
                return "Just now";


            if (diffMinutes < 60)
                return `${diffMinutes}m ago`;


            if (diffHours < 24)
                return `${diffHours}h ago`;


            if (diffDays < 7)
                return `${diffDays}d ago`;



            return new Intl.DateTimeFormat(
                "en-US",
                {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                }
            ).format(date);

        },
        []
    );



    return {
        comments,
        pinnedComment,

        isSubmitting,
        error,

        handleCommentSubmit,
        formatDate
    };
};


export default useComments;
