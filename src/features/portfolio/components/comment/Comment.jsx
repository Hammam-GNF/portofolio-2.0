import { memo } from "react";
import {
    UserCircle2,
    Pin,
} from "lucide-react";


const Comment = memo(
({
    comment,
    formatDate,
    isPinned = false
}) => (

    <div
        className={`px-4 pt-4 pb-2 rounded-xl border transition-all group hover:shadow-lg hover:-translate-y-0.5 ${
            isPinned
                ? "bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/30 hover:bg-gradient-to-r hover:from-indigo-500/15 hover:to-purple-500/15"
                : "bg-white/5 border-white/10 hover:bg-white/10"
        }`}
    >

        {
            isPinned && (
                <div className="flex items-center gap-2 mb-3 text-indigo-400">
                    <Pin className="w-4 h-4" />
                    <span className="text-xs font-medium uppercase tracking-wide">
                        Pinned Comment
                    </span>
                </div>
            )
        }


        <div className="flex items-start gap-3">

            {
                comment.profile_image ? (

                    <img
                        src={comment.profile_image}
                        alt={`${comment.user_name}'s profile`}
                        className={`w-10 h-10 rounded-full object-cover border-2 flex-shrink-0 ${
                            isPinned
                                ? "border-indigo-500/50"
                                : "border-indigo-500/30"
                        }`}
                        loading="lazy"
                    />

                ) : (

                    <div
                        className={`p-2 rounded-full text-indigo-400 group-hover:bg-indigo-500/30 transition-colors ${
                            isPinned
                                ? "bg-indigo-500/30"
                                : "bg-indigo-500/20"
                        }`}
                    >
                        <UserCircle2 className="w-5 h-5" />
                    </div>

                )
            }


            <div className="flex-grow min-w-0">

                <div className="flex items-center justify-between gap-4 mb-2">

                    <div className="flex items-center gap-2">

                        <h4
                            className={`font-medium truncate ${
                                isPinned
                                    ? "text-indigo-200"
                                    : "text-white"
                            }`}
                        >
                            {comment.user_name}
                        </h4>


                        {
                            isPinned && (
                                <span className="px-2 py-0.5 text-xs bg-indigo-500/20 text-indigo-300 rounded-full">
                                    Admin
                                </span>
                            )
                        }

                    </div>


                    <span className="text-xs text-gray-400 whitespace-nowrap">
                        {formatDate(comment.created_at)}
                    </span>

                </div>


                <p className="text-gray-300 text-sm break-words leading-relaxed relative bottom-2">
                    {comment.content}
                </p>

            </div>

        </div>


    </div>

));


export default Comment;
