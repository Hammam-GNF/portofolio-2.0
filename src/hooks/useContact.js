import { useCallback, useState } from "react";
import Swal from "sweetalert2";
import { contactService } from "../services";


const useContact = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });


    const [isSubmitting, setIsSubmitting] = useState(false);



    const handleChange = useCallback((e) => {

        const {
            name,
            value
        } = e.target;


        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

    }, []);




    const resetForm = useCallback(() => {

        setFormData({
            name: "",
            email: "",
            message: "",
        });

    }, []);




    const handleSubmit = useCallback(
        async (e) => {

            e.preventDefault();

            setIsSubmitting(true);


            Swal.fire({
                title: "Mengirim Pesan...",
                html: "Harap tunggu selagi kami mengirim pesan Anda",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });



            try {

                await contactService.sendMessage(
                    formData
                );


                await Swal.fire({
                    title: "Berhasil!",
                    text: "Pesan Anda telah berhasil terkirim!",
                    icon: "success",
                    confirmButtonColor: "#6366f1",
                    timer: 2000,
                    timerProgressBar: true
                });



                resetForm();



            } catch(error) {

                console.error(
                    "Failed sending message:",
                    error
                );


                Swal.fire({
                    title: "Gagal!",
                    text: "Terjadi kesalahan. Silakan coba lagi nanti.",
                    icon: "error",
                    confirmButtonColor: "#6366f1"
                });


            } finally {

                setIsSubmitting(false);

            }

        },
        [
            formData,
            resetForm
        ]
    );




    return {
        formData,
        isSubmitting,

        handleChange,
        handleSubmit,
    };

};


export default useContact;
