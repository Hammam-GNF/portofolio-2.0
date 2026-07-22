import { useCallback, useEffect, useState } from "react";
import { commentService } from "@/services";

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






    return {
        comments,
        pinnedComment,

        isSubmitting,
        error,

        handleCommentSubmit,
    };
};


export default useComments;
