export interface Application {
  id: string;
  referenceNumber: string;
  farmerName: string;
  address: string;
  contactNumber: string;
  animalType: string;
  numberOfAnimals: number;
  estimatedValue: number;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  updatedAt: string;
  notes?: string;
}

export type ApplicationStatus = Application['status'];
