import {
  Train,
  Plane,
  Hotel,
  Palmtree,
  StampIcon,
  Landmark,
  Crown,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

export type FieldType = "text" | "date" | "number" | "select" | "choice" | "textarea";

export interface Field {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];
  optional?: boolean;
  half?: boolean; // render at half width on desktop
}

export interface Service {
  id: string;
  name: string;
  tagline: string;
  icon: LucideIcon;
  questions: Field[];
}

export const services: Service[] = [
  {
    id: "train",
    name: "Train & Tatkal",
    tagline: "Confirmed berths, even under Tatkal pressure.",
    icon: Train,
    questions: [
      { id: "from", label: "Where are you starting from?", type: "text", placeholder: "e.g. New Delhi (NDLS)", half: true },
      { id: "to", label: "Where are you going?", type: "text", placeholder: "e.g. Mumbai (CSTM)", half: true },
      { id: "date", label: "Date of travel", type: "date", half: true },
      { id: "passengers", label: "Number of passengers", type: "number", placeholder: "2", half: true },
      { id: "class", label: "Class preference", type: "select", options: ["AC First (1A)", "AC 2-Tier (2A)", "AC 3-Tier (3A)", "Sleeper (SL)", "No preference"], half: true },
      { id: "quota", label: "Booking type", type: "choice", options: ["Tatkal (urgent)", "General"], half: true },
      { id: "flexible", label: "Are your timings flexible?", type: "choice", options: ["Yes, flexible", "No, fixed"] },
      { id: "notes", label: "Anything else we should know?", type: "textarea", placeholder: "Lower berth for parents, meal preference, connecting train…", optional: true },
    ],
  },
  {
    id: "flights",
    name: "Flights",
    tagline: "The right fare, the right cabin, handled.",
    icon: Plane,
    questions: [
      { id: "from", label: "Departure city", type: "text", placeholder: "e.g. Bengaluru", half: true },
      { id: "to", label: "Destination", type: "text", placeholder: "e.g. London", half: true },
      { id: "depart", label: "Departure date", type: "date", half: true },
      { id: "return", label: "Return date", type: "date", optional: true, half: true },
      { id: "passengers", label: "Number of passengers", type: "number", placeholder: "1", half: true },
      { id: "cabin", label: "Cabin preference", type: "select", options: ["Economy", "Premium Economy", "Business", "First", "No preference"], half: true },
      { id: "budget", label: "Budget preference", type: "select", options: ["Most economical", "Balanced", "Most convenient", "Premium / no constraint"] },
      { id: "notes", label: "Anything else we should know?", type: "textarea", placeholder: "Preferred airline, meal, baggage, visa status…", optional: true },
    ],
  },
  {
    id: "hotels",
    name: "Hotels",
    tagline: "Stays that match your taste and budget.",
    icon: Hotel,
    questions: [
      { id: "city", label: "Which city?", type: "text", placeholder: "e.g. Udaipur", half: true },
      { id: "category", label: "Hotel category", type: "select", options: ["3 Star", "4 Star", "5 Star", "Luxury / Palace", "Boutique"], half: true },
      { id: "checkin", label: "Check-in date", type: "date", half: true },
      { id: "checkout", label: "Check-out date", type: "date", half: true },
      { id: "guests", label: "Number of guests", type: "number", placeholder: "2", half: true },
      { id: "budget", label: "Budget per night", type: "select", options: ["Under ₹5,000", "₹5,000–₹12,000", "₹12,000–₹25,000", "₹25,000+"], half: true },
      { id: "notes", label: "Special requirements?", type: "textarea", placeholder: "Pool view, connecting rooms, early check-in, accessibility…", optional: true },
    ],
  },
  {
    id: "holidays",
    name: "Holiday Packages",
    tagline: "A full itinerary, curated end-to-end.",
    icon: Palmtree,
    questions: [
      { id: "destination", label: "Where would you like to go?", type: "text", placeholder: "e.g. Kerala, Bali, Switzerland", half: true },
      { id: "duration", label: "How many days?", type: "number", placeholder: "5", half: true },
      { id: "date", label: "Approximate start date", type: "date", half: true },
      { id: "travellers", label: "Number of travellers", type: "number", placeholder: "2", half: true },
      { id: "style", label: "Travel style", type: "select", options: ["Relaxed", "Adventure", "Family-friendly", "Luxury", "Honeymoon"], half: true },
      { id: "budget", label: "Total budget range", type: "select", options: ["Under ₹50,000", "₹50,000–₹1.5L", "₹1.5L–₹4L", "₹4L+"], half: true },
      { id: "notes", label: "Tell us about your ideal trip", type: "textarea", placeholder: "Must-see places, pace, dietary needs, occasion…", optional: true },
    ],
  },
  {
    id: "visa",
    name: "Visa Assistance",
    tagline: "Paperwork, appointments and approvals, managed.",
    icon: StampIcon,
    questions: [
      { id: "country", label: "Which country's visa?", type: "text", placeholder: "e.g. Schengen, USA, UK", half: true },
      { id: "type", label: "Visa type", type: "select", options: ["Tourist", "Business", "Student", "Transit", "Not sure"], half: true },
      { id: "travel_date", label: "Intended travel date", type: "date", half: true },
      { id: "applicants", label: "Number of applicants", type: "number", placeholder: "1", half: true },
      { id: "passport", label: "Do you hold a valid passport?", type: "choice", options: ["Yes", "No / expiring soon"] },
      { id: "notes", label: "Anything else we should know?", type: "textarea", placeholder: "Previous travel history, urgency, prior rejections…", optional: true },
    ],
  },
  {
    id: "pilgrimage",
    name: "Pilgrimage Planning",
    tagline: "Char Dham, Tirupati and more — with care.",
    icon: Landmark,
    questions: [
      { id: "destination", label: "Which pilgrimage?", type: "text", placeholder: "e.g. Char Dham, Vaishno Devi, Tirupati", half: true },
      { id: "pilgrims", label: "Number of pilgrims", type: "number", placeholder: "4", half: true },
      { id: "date", label: "Preferred start date", type: "date", half: true },
      { id: "seniors", label: "Any senior travellers?", type: "choice", options: ["Yes", "No"], half: true },
      { id: "assistance", label: "Assistance needed", type: "select", options: ["Travel only", "Travel + stay", "Full guided (travel, stay, darshan, meals)"] },
      { id: "notes", label: "Special requirements?", type: "textarea", placeholder: "Mobility help, special darshan, dietary needs…", optional: true },
    ],
  },
  {
    id: "luxury",
    name: "Luxury Travel",
    tagline: "Private, seamless, exceptional.",
    icon: Crown,
    questions: [
      { id: "destination", label: "Where to?", type: "text", placeholder: "e.g. Maldives, Rajasthan, Europe", half: true },
      { id: "travellers", label: "Number of travellers", type: "number", placeholder: "2", half: true },
      { id: "date", label: "Approximate dates", type: "date", half: true },
      { id: "interests", label: "What matters most?", type: "select", options: ["Privacy & exclusivity", "Fine dining", "Wellness & spa", "Adventure", "Culture & heritage"], half: true },
      { id: "notes", label: "Describe your ideal experience", type: "textarea", placeholder: "Private villa, butler, chartered transfers, special occasion…", optional: true },
    ],
  },
  {
    id: "corporate",
    name: "Corporate Travel",
    tagline: "Policy-compliant travel for your whole team.",
    icon: Briefcase,
    questions: [
      { id: "company", label: "Company name", type: "text", placeholder: "Your organisation", half: true },
      { id: "travellers", label: "Approx. travellers / month", type: "number", placeholder: "20", half: true },
      { id: "scope", label: "What do you need?", type: "select", options: ["Flights & hotels", "Full travel management", "Event / offsite", "Visa & immigration"], half: true },
      { id: "billing", label: "Billing preference", type: "choice", options: ["Consolidated monthly", "Per trip"], half: true },
      { id: "notes", label: "Tell us about your requirements", type: "textarea", placeholder: "Travel policy, approval chain, cost centres, GST details…", optional: true },
    ],
  },
];

export const otherService: Service = {
  id: "other",
  name: "Something else",
  tagline: "Bus, events, transfers, honeymoon, VIP and more.",
  icon: Crown,
  questions: [
    { id: "request", label: "What do you need help with?", type: "textarea", placeholder: "Describe your request in your own words — we handle almost anything." },
    { id: "date", label: "When do you need it?", type: "date", optional: true, half: true },
    { id: "people", label: "How many people?", type: "number", placeholder: "2", optional: true, half: true },
  ],
};

export const allServices = [...services, otherService];
