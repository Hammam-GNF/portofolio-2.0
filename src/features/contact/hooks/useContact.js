import { useCallback, useState } from "react";
import {
    showLoadingAlert,
    showSuccessAlert,
    showErrorAlert,
} from "../utils";

import contactService from "../services";


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


            showLoadingAlert();


            try {

                await contactService.sendMessage(
                    formData
                );


                await showSuccessAlert();


                resetForm();



            } catch(error) {

                console.error(
                    "Failed sending message:",
                    error
                );


                showErrorAlert();


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
