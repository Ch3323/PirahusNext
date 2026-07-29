import Swal, { SweetAlertResult } from "sweetalert2";

const GREEN_THEME = {
  background: "#0a0e08",
  color: "#d8e8b8",
  confirmButtonColor: "#708840",
  cancelButtonColor: "#4a5a30",
  dangerConfirmColor: "#b85040",
  warningConfirmColor: "#a8c060",
};

const PURPLE_THEME = {
  background: "#0d0d11",
  color: "#f1f1f1",
  confirmButtonColor: "#6812D2",
  cancelButtonColor: "#27272a",
  dangerConfirmColor: "#ef4444",
  warningConfirmColor: "#8b5cf6",
};

const getTheme = () => {
  if (typeof window !== "undefined") {
    const path = window.location.pathname;
    if (path.startsWith("/backrooms")) {
      return GREEN_THEME;
    }
  }
  return PURPLE_THEME;
};

export const alertUtil = {
  showSuccess: (title: string, text?: string, options?: { timer?: number; showConfirmButton?: boolean }): Promise<SweetAlertResult> => {
    const theme = getTheme();
    return Swal.fire({
      title,
      text,
      icon: "success",
      background: theme.background,
      color: theme.color,
      confirmButtonColor: theme.confirmButtonColor,
      timer: options?.timer,
      showConfirmButton: options?.showConfirmButton !== false,
    });
  },

  showWarning: (title: string, text?: string): Promise<SweetAlertResult> => {
    const theme = getTheme();
    return Swal.fire({
      title,
      text,
      icon: "warning",
      background: theme.background,
      color: theme.color,
      confirmButtonColor: theme.warningConfirmColor,
    });
  },

  showError: (title: string, text?: string, options?: { timer?: number; showConfirmButton?: boolean }): Promise<SweetAlertResult> => {
    const theme = getTheme();
    return Swal.fire({
      title,
      text,
      icon: "error",
      background: theme.background,
      color: theme.color,
      confirmButtonColor: theme.confirmButtonColor,
      timer: options?.timer,
      showConfirmButton: options?.showConfirmButton !== false,
    });
  },

  showLoading: (title: string): void => {
    const theme = getTheme();
    Swal.fire({
      title,
      allowOutsideClick: false,
      background: theme.background,
      color: theme.color,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  },

  close: (): void => {
    Swal.close();
  },

  showConfirm: (
    title: string,
    text: string,
    options?: {
      confirmButtonText?: string;
      cancelButtonText?: string;
      isDanger?: boolean;
    }
  ): Promise<SweetAlertResult> => {
    const theme = getTheme();
    const confirmColor = options?.isDanger
      ? theme.dangerConfirmColor
      : theme.warningConfirmColor;

    return Swal.fire({
      title,
      text,
      icon: options?.isDanger ? "warning" : "question",
      showCancelButton: true,
      confirmButtonText: options?.confirmButtonText || "ยืนยัน",
      cancelButtonText: options?.cancelButtonText || "ยกเลิก",
      confirmButtonColor: confirmColor,
      cancelButtonColor: theme.cancelButtonColor,
      background: theme.background,
      color: theme.color,
    });
  },

  showPrompt: (
    title: string,
    label: string,
    placeholder: string = "0",
    inputType: "text" | "number" = "number"
  ): Promise<SweetAlertResult> => {
    const theme = getTheme();
    return Swal.fire({
      title,
      input: inputType,
      inputLabel: label,
      inputPlaceholder: placeholder,
      showCancelButton: true,
      background: theme.background,
      color: theme.color,
      confirmButtonColor: theme.warningConfirmColor,
      cancelButtonColor: theme.cancelButtonColor,
    });
  },
};
