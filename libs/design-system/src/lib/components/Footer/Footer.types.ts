// IconType represents an icon with an optional link.
export interface IconType {
  icon: React.ReactNode;
  link?: string;
}
// FooterLink defines a single link item in the footer.
export interface FooterLink {
  title?: string;
  link?: string;
  icons?: IconType[];
}
// FooterSection represents a section of the footer.
export interface FooterSection {
  title: string;
  links: FooterLink[];
}
