// src/types/enquiry.ts
export interface EnquiryInput {
  productId: number;
  productName: string;
  productSlug: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  consent: boolean;
}

export type EnquiryField = "name" | "email" | "message" | "consent";
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;
