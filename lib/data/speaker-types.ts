import { SpeakerType } from "@/lib/types/speaker";

export const speakerTypes: SpeakerType[] = [
  {
    id: "1",
    name: "National Speaker",
    description: "Speakers from within the country",
  },
  {
    id: "2",
    name: "International Speaker",
    description: "Speakers from outside the country",
  },
];

export const getSpeakerTypeById = (id: string): SpeakerType | undefined => {
  return speakerTypes.find((type) => type.id === id);
};

export const getSpeakerTypeName = (id: string): string => {
  const type = getSpeakerTypeById(id);
  return type ? type.name : "Unknown";
};
