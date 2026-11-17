import { memo, useState } from "react";
import { EyeIcon, EyeOffIcon } from "../common/Icons";

/**
 * AccountLoginForm
 * Authentication form for both Login and Register modes.
 * Complies with Chrome accessibility, HTML5 labels, and WHATWG autocomplete specifications.
 */
export const AccountLoginForm = memo(function AccountLoginForm({
  isRegisterMode = false,
  onToggleMode,
  onSubmitSuccess,
}) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    if (isRegisterMode && !fullname.trim()) return;

    if (onSubmitSuccess) {
      onSubmitSuccess({
        isRegisterMode,
        fullname: fullname.trim(),
        email: email.trim(),
        password,
      });
    } else {
      alert(isRegisterMode ? `Account created for ${email}` : `Signed in as ${email}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-full">
      {isRegisterMode && (
        <div>
          <label
            htmlFor="account-fullname"
            className="block text-xs uppercase tracking-wider text-brand-muted mb-1.5"
          >
            Full Name*
          </label>
          <input
            id="account-fullname"
            name="fullname"
            type="text"
            autoComplete="name"
            required
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Full Name*"
            aria-label="Full Name"
            className="w-full px-4 py-3 border border-brand-border text-sm text-brand-dark focus:border-brand-green outline-none transition-colors"
          />
        </div>
      )}

      <div>
        <label htmlFor="account-email" className="sr-only">
          Email
        </label>
        <input
          id="account-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email*"
          aria-label="Email address"
          className="w-full px-4 py-3 border border-brand-border text-sm text-brand-dark placeholder-brand-muted focus:border-brand-green outline-none transition-colors"
        />
      </div>

      <div>
        <label htmlFor="account-password" className="sr-only">
          Password
        </label>
        <div className="relative flex items-center border border-brand-border focus-within:border-brand-green transition-colors">
          <input
            id="account-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete={isRegisterMode ? "new-password" : "current-password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password*"
            aria-label="Password"
            className="w-full px-4 py-3 text-sm text-brand-dark placeholder-brand-muted bg-transparent outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="px-3.5 text-brand-muted hover:text-brand-green transition-colors cursor-pointer"
          >
            {showPassword ? (
              <EyeOffIcon className="w-4 h-4" />
            ) : (
              <EyeIcon className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {!isRegisterMode && (
        <div className="pt-1">
          <a
            href="/account/recover"
            className="text-xs text-brand-dark hover:text-brand-green underline transition-colors"
          >
            Lost your password ?
          </a>
        </div>
      )}

      {/* Action Buttons: Sign In + Create Account side-by-side */}
      <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="submit"
          className="w-full py-3.5 px-4 bg-[#282828] hover:bg-brand-green text-white text-[11px] font-semibold tracking-widest uppercase transition-colors cursor-pointer"
        >
          {isRegisterMode ? "REGISTER" : "SIGN IN"}
        </button>
        <button
          type="button"
          onClick={onToggleMode}
          className="w-full py-3.5 px-4 bg-white border border-[#282828] text-[#282828] hover:bg-[#282828] hover:text-white text-[11px] font-semibold tracking-widest uppercase transition-colors cursor-pointer"
        >
          {isRegisterMode ? "BACK TO SIGN IN" : "CREATE YOUR ACCOUNT"}
        </button>
      </div>
    </form>
  );
});

export default AccountLoginForm;
