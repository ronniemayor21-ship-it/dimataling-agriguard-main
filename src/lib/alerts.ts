import Swal, { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2';

// Standard configuration for SweetAlert2
const swalConfig: SweetAlertOptions = {
    confirmButtonColor: 'hsl(142.1 76.2% 36.3%)', // Matches success/primary color often used
    cancelButtonColor: 'hsl(0 84.2% 60.2%)',      // Matches destructive color
    buttonsStyling: true,
    customClass: {
        popup: 'rounded-lg border bg-card text-card-foreground shadow-sm',
        title: 'text-lg font-bold text-foreground',
        htmlContainer: 'text-sm text-muted-foreground',
        confirmButton: 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2',
        cancelButton: 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2 mr-2',
        input: 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    }
};

// Toast notification helper
export const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

export const showAlert = (title: string, text: string, icon: SweetAlertIcon = 'info') => {
    return Swal.fire({
        ...swalConfig,
        title,
        text,
        icon,
    });
};

export const showConfirm = async (title: string, text: string, confirmText: string = 'Yes', cancelText: string = 'Cancel') => {
    return Swal.fire({
        ...swalConfig,
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
    });
};

export const showInput = async (title: string, text: string, inputPlaceholder: string = 'Enter value...') => {
    return Swal.fire({
        ...swalConfig,
        title,
        text,
        input: 'textarea',
        inputPlaceholder,
        showCancelButton: true,
    });
};

export const showSuccess = (title: string, text?: string) => {
    return Swal.fire({
        ...swalConfig,
        icon: 'success',
        title,
        text,
        timer: 2000,
        showConfirmButton: false
    });
};

export const showError = (title: string, text: string) => {
    return Swal.fire({
        ...swalConfig,
        icon: 'error',
        title,
        text
    });
};
