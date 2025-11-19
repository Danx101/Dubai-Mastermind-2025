export interface PackageItem {
  name: string;
  subtitle: string;
  price: string;
  items: string[];
  includesPackageA?: boolean;
}

export const packages: Record<'A' | 'B', PackageItem> = {
  A: {
    name: 'Paket A',
    subtitle: 'Basispaket',
    price: '100',
    items: [
      '3 Tage Intensiv-Kurs',
      'Individuelles Coaching und Feedback',
      'Verpflegung',
    ],
  },
  B: {
    name: 'Paket B',
    subtitle: 'Premium-Paket',
    price: '200',
    items: [
      'Unterkunft in der Event-Location',
      'Exklusiver Zugang zu Premium-Bereichen',
      'Private Networking-Sessions',
    ],
    includesPackageA: true,
  },
};

export type PackageType = 'A' | 'B';
