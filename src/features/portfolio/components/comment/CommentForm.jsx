import {
    useState,
    useCallback,
    memo
} from "react";

import {
    Loader2,
    Send,
    X
} from "lucide-react";


const CommentForm = memo(
({
    onSubmit,
    isSubmitting
}) => {


    const [
        newComment,
        setNewComment
    ] = useState("");

    const [
        userName,
        setUserName
    ] = useState("");

    const [
        imagePreview,
        setImagePreview
    ] = useState(null);

    const [
        imageFile,
        setImageFile
    ] = useState(null);


    const handleImageChange = useCallback((e)=>{

        const file = e.target.files[0];

        if(!file)
            return;


        if(file.size > 5 * 1024 * 1024){
            alert("File size must be less than 5MB.");
            return;
        }


        if(!file.type.startsWith("image/")){
            alert("Invalid image file.");
            return;
        }


        setImageFile(file);


        const reader = new FileReader();

        reader.onloadend = ()=> {
            setImagePreview(reader.result);
        };

        reader.readAsDataURL(file);


    },[]);



    const handleSubmit = useCallback((e)=>{

        e.preventDefault();


        if(!newComment.trim() || !userName.trim())
            return;


        onSubmit({
            newComment,
            userName,
            imageFile
        });


        setNewComment("");
        setUserName("");
        setImagePreview(null);
        setImageFile(null);


    },[
        newComment,
        userName,
        imageFile,
        onSubmit
    ]);



    return (

<form
onSubmit={handleSubmit}
className="space-y-6"
>

<input
value={userName}
onChange={(e)=>setUserName(e.target.value)}
placeholder="Enter your name"
maxLength={15}
className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white"
/>


<textarea

ref={textareaRef}

value={newComment}

onChange={(e)=>setNewComment(e.target.value)}

placeholder="Write your message here..."

maxLength={200}

className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white min-h-[120px]"

/>



{
imagePreview && (

<div className="flex items-center gap-3">

<img
src={imagePreview}
alt="Selected preview"
/>


<button
type="button"
onClick={()=>{
setImagePreview(null);
setImageFile(null);
}}
>
<X/>
</button>


</div>

)
}



<input
type="file"
onChange={handleImageChange}
accept="image/*"
/>



<button
disabled={isSubmitting}
className="w-full h-12 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl text-white"
>

{
isSubmitting
?
<Loader2 className="animate-spin mx-auto"/>
:
<div className="flex justify-center gap-2">
<Send/>
Post Comment
</div>
}

</button>



</form>

    );

});


export default CommentForm;
