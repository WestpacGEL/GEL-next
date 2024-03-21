export function FranceFlag({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 640 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="France flag"
    >
      <path d="M0 0H640V480H0V0Z" fill="white" />
      <path d="M0 0H213.3V480H0V0Z" fill="#002654" />
      <path d="M426.7 0H640V480H426.7V0Z" fill="#CE1126" />
    </svg>
  );
}
