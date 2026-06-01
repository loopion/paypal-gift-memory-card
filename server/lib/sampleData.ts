export interface Transaction {
  id: string;
  senderName: string;
  message: string;
  amount: number;
  currency: string;
  date: string; // YYYY-MM-DD
}

export const sampleTransactions: Transaction[] = [
  {
    id: 'sample-1',
    senderName: 'Marie & Pierre Dupont',
    message: "Toutes nos félicitations ! Vous formez le plus beau couple. Que votre amour soit aussi fort que votre bonheur aujourd'hui. Nous sommes si heureux de partager ce moment avec vous.",
    amount: 150,
    currency: 'EUR',
    date: '2026-04-15',
  },
  {
    id: 'sample-2',
    senderName: 'Emma & James Johnson',
    message: 'Wishing you a lifetime of love, laughter, and happiness together! So excited to celebrate this wonderful milestone. May every day be as magical as today.',
    amount: 100,
    currency: 'EUR',
    date: '2026-04-18',
  },
  {
    id: 'sample-3',
    senderName: 'Isabelle Moreau',
    message: "Quel bonheur de vous voir si épanouis ! Je vous souhaite une vie pleine d'amour, de complicité et de beaux projets communs. Profitez de chaque instant ensemble.",
    amount: 75,
    currency: 'EUR',
    date: '2026-04-20',
  },
  {
    id: 'sample-4',
    senderName: 'The Rodriguez Family',
    message: "Congratulations on this beautiful new chapter! You two are perfect for each other and we couldn't be happier for you. Here's to forever!",
    amount: 200,
    currency: 'EUR',
    date: '2026-04-22',
  },
  {
    id: 'sample-5',
    senderName: 'Camille & Antoine Bernard',
    message: "Tout notre amour pour ce grand jour et pour tous ceux qui suivront. Vous nous avez fait vivre une journée inoubliable. Merci et mille félicitations !",
    amount: 120,
    currency: 'EUR',
    date: '2026-04-25',
  },
  {
    id: 'sample-6',
    senderName: 'Sarah & David Cohen',
    message: 'May your love story be the kind that inspires others for generations. We are so honored to witness the beginning of your forever. With all our love.',
    amount: 80,
    currency: 'EUR',
    date: '2026-04-28',
  },
  {
    id: 'sample-7',
    senderName: "Grand-maman Élise",
    message: "Mon cœur déborde de joie en vous voyant si heureux. L'amour est le plus beau des cadeaux que la vie puisse offrir. Chérissez chaque moment ensemble, mes chéris.",
    amount: 250,
    currency: 'EUR',
    date: '2026-05-01',
  },
  {
    id: 'sample-8',
    senderName: 'Lucas & Océane Martin',
    message: "Felicidades ! Une nouvelle aventure commence pour vous deux. On vous souhaite un voyage magnifique rempli d'aventures, de rires et d'un amour infini.",
    amount: 90,
    currency: 'EUR',
    date: '2026-05-03',
  },
  {
    id: 'sample-9',
    senderName: 'The Tanaka Family',
    message: 'Warmest congratulations! Your love radiates joy to everyone around you. We wish you a future filled with beautiful memories, endless adventures, and boundless happiness.',
    amount: 110,
    currency: 'EUR',
    date: '2026-05-05',
  },
  {
    id: 'sample-10',
    senderName: 'Sophie & Maxime Lefebvre',
    message: "Quelle belle célébration vous nous avez offerte ! À travers les rires et les larmes de bonheur, on a vu deux âmes se rejoindre pour toujours. On vous aime !",
    amount: 130,
    currency: 'EUR',
    date: '2026-05-08',
  },
];

export function filterByDateRange(
  transactions: Transaction[],
  startDate: string | undefined,
  endDate: string | undefined,
): Transaction[] {
  return transactions.filter(tx => {
    if (startDate && tx.date < startDate) return false;
    if (endDate && tx.date > endDate) return false;
    return true;
  });
}
