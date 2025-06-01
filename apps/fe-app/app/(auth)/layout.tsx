import { Header } from '../(layout)/(header)';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <svg
        className="text-surface-brand-100 absolute left-0 top-0 -z-10 h-full w-auto"
        width="408"
        viewBox="0 0 408 1024"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.6"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M105.62 714.862C102.551 722.12 104.029 730.503 109.396 736.273L376.994 1024H0V0H407.945L105.62 714.862Z"
          fill="currentColor"
        />
      </svg>

      {children}
    </div>
  );
}
