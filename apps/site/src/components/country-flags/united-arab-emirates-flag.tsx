export function UnitedArabEmiratesFlag({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 640 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="United Arab Emirates flag"
    >
      <path fill="#00732f" d="M0 0h640v160H0z"></path>
      <path fill="#fff" d="M0 160h640v160H0z"></path>
      <path d="M0 320h640v160H0z"></path>
      <path fill="red" d="M0 0h220v480H0z"></path>
    </svg>
  );
}
