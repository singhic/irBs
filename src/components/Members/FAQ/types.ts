export interface FAQItem {
  question: string;
  answer?: string;
  isOpen?: boolean;
}

export interface FAQCategory {
  category: string;
  items: FAQItem[];
}
