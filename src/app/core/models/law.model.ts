export interface Law {
  id: number; 
  uid: string;                   // long → number
  title: string;
  section: string;
  act: string;
  legalText: string;
  jurisdiction: string;
  simpleExplanation: string;
  isPublished: boolean;
  createdBy: number;
  createdByName: string;
  createdAt: string;            // DateTime → string (ISO)
  updatedAt?: string | null;    // nullable DateTime
  tags: string[];
}

export interface LawCreateRequest {
  title: string;
  category: string;
  jurisdiction: string;
  tags: string[];
  chapter?: string;
  section?: string;
}
