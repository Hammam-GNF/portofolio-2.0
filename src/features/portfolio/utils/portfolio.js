import Swal from "sweetalert2";

export const getDisplayedItems = (
    items,
    showAll,
    initialItems
) => {
    if (showAll) {
        return items;
    }

    return items.slice(0, initialItems);
};

export function showValidationToast(message) {
    return Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: message,
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        background: "#030014",
        color: "#ffffff",
    });
}
