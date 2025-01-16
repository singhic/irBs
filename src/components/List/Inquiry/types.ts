export interface CategorySelectProps {
  onSelect: (category: string) => void;
}

export interface InquiryButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export interface InquiryInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}
