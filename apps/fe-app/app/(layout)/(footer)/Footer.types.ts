export interface IconType {
  icon: React.ReactNode;
  link?: string;
}

export interface FooterLink {
  title?: string;
  link?: string;
  icons?: IconType[];
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}
