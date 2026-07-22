import {
    memo,
    useCallback,
    useState,
} from "react";

import {
    Loader2,
    Send,
    X,
} from "lucide-react";

import {
    showValidationToast,
} from "../utils";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const CommentForm = memo(
    ({
        onSubmit,
        isSubmitting,
    }) => {
        const [newComment, setNewComment] = useState("");
        const [userName, setUserName] = useState("");
        const [imagePreview, setImagePreview] = useState(null);
        const [imageFile, setImageFile] = useState(null);

        const handleImageChange = useCallback((event) => {
            const file = event.target.files?.[0];

            if (!file) {
                return;
            }

            if (file.size > MAX_FILE_SIZE) {
                showValidationToast(
                    "Maximum file size is 5 MB."
                );

                return;
            }

            if (!file.type.startsWith("image/")) {
                showValidationToast(
                    "Only image files are allowed."
                );

                return;
            }

            setImageFile(file);

            const reader = new FileReader();

            reader.onloadend = () => {
                setImagePreview(reader.result);
            };

            reader.readAsDataURL(file);
        }, []);

        const handleSubmit = useCallback(
            (event) => {
                event.preventDefault();

                if (!newComment.trim() || !userName.trim()) {
                    return;
                }

                onSubmit({
                    newComment,
                    userName,
                    imageFile,
                });

                setNewComment("");
                setUserName("");
                setImagePreview(null);
                setImageFile(null);
            },
            [
                newComment,
                userName,
                imageFile,
                onSubmit,
            ]
        );

        return (
            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >
                <input
                    value={userName}
                    onChange={(event) =>
                        setUserName(event.target.value)
                    }
                    placeholder="Enter your name"
                    maxLength={15}
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white"
                />

                <textarea
                    value={newComment}
                    onChange={(event) =>
                        setNewComment(event.target.value)
                    }
                    placeholder="Write your message here..."
                    maxLength={200}
                    className="min-h-[120px] w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white"
                />

                {imagePreview && (
                    <div className="flex items-center gap-3">
                        <img
                            src={imagePreview}
                            alt="Selected preview"
                        />

                        <button
                            type="button"
                            onClick={() => {
                                setImagePreview(null);
                                setImageFile(null);
                            }}
                        >
                            <X />
                        </button>
                    </div>
                )}

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />

                <button
                    disabled={isSubmitting}
                    className="h-12 w-full rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white"
                >
                    {isSubmitting ? (
                        <Loader2 className="mx-auto animate-spin" />
                    ) : (
                        <div className="flex justify-center gap-2">
                            <Send />
                            Post Comment
                        </div>
                    )}
                </button>
            </form>
        );
    }
);

export default CommentForm;
