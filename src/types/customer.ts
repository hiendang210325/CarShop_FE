export type LeadStatus = 'NEW' | 'CONTACTED' | 'TEST_DRIVE_SCHEDULED' | 'NEGOTIATING' | 'WON' | 'LOST';

export interface CustomerLead {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  interestedCarBrand: string;
  interestedCarModel: string;
  budgetRange: string;
  status: LeadStatus;
  notes: string;
  assignedStaffName: string;
  createdAt: string;
}

export interface TestDriveBooking {
  id: string;
  customerName: string;
  customerPhone: string;
  carName: string;
  bookingDate: string;
  status: 'CONFIRMED' | 'PENDING' | 'COMPLETED' | 'CANCELLED';
}
