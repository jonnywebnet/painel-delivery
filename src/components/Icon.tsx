import type { ReactNode, SVGProps } from 'react';

export type IconName =
  | 'grid'
  | 'menu'
  | 'receipt'
  | 'star'
  | 'settings'
  | 'search'
  | 'plus'
  | 'logout'
  | 'arrow'
  | 'clock'
  | 'trend'
  | 'more'
  | 'edit'
  | 'trash'
  | 'close'
  | 'check'
  | 'chevron';

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
}

export default function Icon({ name, ...props }: IconProps) {
  const common = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, strokeWidth: 1.8 };

  const paths: Record<IconName, ReactNode> = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" {...common} /><rect x="14" y="3" width="7" height="7" rx="1" {...common} /><rect x="3" y="14" width="7" height="7" rx="1" {...common} /><rect x="14" y="14" width="7" height="7" rx="1" {...common} /></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16" {...common} /></>,
    receipt: <><path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" {...common} /><path d="M9 8h6M9 12h6" {...common} /></>,
    star: <path d="m12 3 2.78 5.63 6.22.9-4.5 4.38 1.06 6.2L12 17.2l-5.56 2.91 1.06-6.2L3 9.53l6.22-.9L12 3Z" {...common} />,
    settings: <><circle cx="12" cy="12" r="3" {...common} /><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.42 1.42-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.04 1.56V21.6h-2v-.08a1.7 1.7 0 0 0-1.04-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-1.42-1.42.06-.06A1.7 1.7 0 0 0 9.4 15a1.7 1.7 0 0 0-1.56-1.04H7.75v-2h.09A1.7 1.7 0 0 0 9.4 10.9a1.7 1.7 0 0 0-.34-1.88L9 8.96l1.42-1.42.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1.04-1.56V6.3h2v.08a1.7 1.7 0 0 0 1.04 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 1.42 1.42-.06.06a1.7 1.7 0 0 0-.34 1.88 1.7 1.7 0 0 0 1.56 1.04h.09v2h-.09A1.7 1.7 0 0 0 19.4 15Z" {...common} /></>,
    search: <><circle cx="10.8" cy="10.8" r="6.5" {...common} /><path d="m16 16 4.5 4.5" {...common} /></>,
    plus: <><path d="M12 5v14M5 12h14" {...common} /></>,
    logout: <><path d="M10 5H5v14h5M14 8l4 4-4 4M18 12H9" {...common} /></>,
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" {...common} />,
    clock: <><circle cx="12" cy="12" r="8.5" {...common} /><path d="M12 7v5l3 2" {...common} /></>,
    trend: <><path d="m4 16 5-5 3 3 7-7" {...common} /><path d="M14 7h5v5" {...common} /></>,
    more: <><circle cx="5" cy="12" r="1" fill="currentColor" /><circle cx="12" cy="12" r="1" fill="currentColor" /><circle cx="19" cy="12" r="1" fill="currentColor" /></>,
    edit: <><path d="m4 16-.8 4.8L8 20l10.8-10.8a2.1 2.1 0 0 0-3-3L4 16Z" {...common} /><path d="m14.5 7.5 3 3" {...common} /></>,
    trash: <><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" {...common} /></>,
    close: <><path d="M6 6l12 12M18 6 6 18" {...common} /></>,
    check: <path d="m5 12 4.5 4.5L19 7" {...common} />,
    chevron: <path d="m8 10 4 4 4-4" {...common} />,
  };

  return <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" {...props}>{paths[name]}</svg>;
}
