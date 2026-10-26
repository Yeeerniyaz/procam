import type { SVGProps } from 'react';

/**
 * Brand icons (Lucide 1.x no longer ships brand logos).
 * Stroke-based, 24×24 — visually consistent with Lucide icons.
 */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const Base = ({ size = 20, children, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    {children}
  </svg>
);

export const WhatsAppIcon = (props: IconProps) => (
  <Base {...props}>
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </Base>
);

export const TelegramIcon = (props: IconProps) => (
  <Base {...props}>
    <path d="M15 10l-4 4 6 6 4-16-18 7 4 2 2 6 3-4" />
  </Base>
);

export const InstagramIcon = (props: IconProps) => (
  <Base {...props}>
    <path d="M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
    <path d="M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0" />
    <path d="M16.5 7.5v.01" />
  </Base>
);

export const TikTokIcon = (props: IconProps) => (
  <Base {...props}>
    <path d="M21 7.917v4.034a9.948 9.948 0 0 1-5-1.951v4.5a6.5 6.5 0 1 1-8-6.326v4.326a2.5 2.5 0 1 0 4 2V3h4.083A6.005 6.005 0 0 0 21 7.917z" />
  </Base>
);
