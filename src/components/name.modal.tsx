import { useEffect, useId, useState, type FormEvent } from "react";

import { useUser } from "@/context/user.context";
import { normalizeUserName } from "@/utils/user-name";

const validateName = (value: string) => {
  const trimmedValue = normalizeUserName(value);

  if (!trimmedValue) {
    return "Please enter your name.";
  }

  if (trimmedValue.length < 2) {
    return "Name must be at least 2 characters.";
  }

  return "";
};

function NameModal() {
  const { isNameSet, setName } = useUser();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const titleId = useId();
  const descriptionId = useId();
  const errorId = useId();
  const describedBy = error ? `${descriptionId} ${errorId}` : descriptionId;

  useEffect(() => {
    if (isNameSet) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isNameSet]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedValue = normalizeUserName(inputValue);
    const validationError = validateName(trimmedValue);

    if (validationError) {
      setError(validationError);
      return;
    }

    setName(trimmedValue);
    setError("");
    setInputValue("");
  };

  if (isNameSet) {
    return null;
  }

  return (
    <div
      aria-describedby={describedBy}
      aria-labelledby={titleId}
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5">
          <h2 id={titleId} className="text-2xl font-semibold text-slate-900">
            Welcome
          </h2>
          <p id={descriptionId} className="mt-2 text-sm text-slate-600">
            Enter your display name to start chatting.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Display name
            </label>
            <input
              id="name"
              type="text"
              value={inputValue}
              onChange={(event) => {
                setInputValue(event.target.value);
                if (error) {
                  setError("");
                }
              }}
              placeholder="Enter your name"
              aria-invalid={Boolean(error)}
              aria-describedby={describedBy}
              autoFocus
              autoComplete="name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500"
            />
            {error ? (
              <p
                id={errorId}
                aria-live="assertive"
                className="mt-2 text-sm text-red-600"
              >
                {error}
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default NameModal;