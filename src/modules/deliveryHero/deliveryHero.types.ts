export interface IDeliveryHero {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: Date;
  city: string;
  vehicleType: 'bicycle' | 'motorcycle' | 'car';
  isOver18: boolean;
}
