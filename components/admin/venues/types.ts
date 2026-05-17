export interface Venue {
  id: string;
  venueName: string;
  venueAddress: string;
  city: string;
  country: string;
  website: string;
  venueImage: string;
  googleMapLink: string;
  distanceFrom: { from: string; unit: string }[];
  status: "Active" | "Inactive";
}
