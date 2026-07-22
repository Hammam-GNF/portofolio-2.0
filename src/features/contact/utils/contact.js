import Swal from "sweetalert2";

export function buildContactFormData({
    name,
    email,
    message,
}) {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);

    formData.append(
        "_subject",
        "Pesan Baru dari Website Portfolio"
    );

    formData.append("_captcha", "false");
    formData.append("_template", "table");

    return formData;
}

export function showLoadingAlert() {
    Swal.fire({
        title: "Mengirim Pesan...",
        html: "Harap tunggu selagi kami mengirim pesan Anda",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
    });
}

export function showSuccessAlert() {
    return Swal.fire({
        title: "Berhasil!",
        text: "Pesan Anda telah berhasil terkirim!",
        icon: "success",
        confirmButtonColor: "#6366f1",
        timer: 2000,
        timerProgressBar: true,
    });
}

export function showErrorAlert() {
    return Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan. Silakan coba lagi nanti.",
        icon: "error",
        confirmButtonColor: "#6366f1",
    });
}
