import { useEffect, useState, useCallback, memo } from "react";
import { CloseIcon } from "../common/Icons";
import { AccountLoginForm } from "../form/AccountLoginForm";

export const AccountDrawer = memo(function AccountDrawer({ isOpen, onClose }) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="account-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-[1px] animate-fadeIn"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-112.5 bg-white h-full shadow-2xl p-5 sm:p-8 md:p-10 flex flex-col justify-between overflow-y-auto flacio-scrollbar transform transition-transform duration-300 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-[#f0f0f0] mb-8">
            <h3 id="account-drawer-title" className="text-sm font-semibold tracking-wider uppercase text-[#000000]">
              {isRegisterMode ? "CREATE ACCOUNT" : "SIGN IN"}
            </h3>
            <button
              onClick={handleClose}
              aria-label="Close account menu"
              className="text-brand-dark hover:text-brand-green transition-colors p-1"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Form (Moved to components/form) */}
          <AccountLoginForm
            isRegisterMode={isRegisterMode}
            onToggleMode={() => setIsRegisterMode(!isRegisterMode)}
          />
        </div>

        {/* Footer info in drawer */}
        <div className="pt-8 border-t border-[#f0f0f0] text-xs text-brand-muted">
          <p>
            By continuing, you agree to Flacio's{" "}
            <a href="/terms" className="underline hover:text-brand-green">
              Terms of Use
            </a>{" "}
            and{" "}
            <a href="/privacy" className="underline hover:text-brand-green">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
});

export default AccountDrawer;
