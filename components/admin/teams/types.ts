export interface Team {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  designation: string;
  mobile: string;
  location: string;
  profilePhoto: string;
  role: string;
  status: "active" | "inactive";
}
