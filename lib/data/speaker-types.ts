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

export const addSpeakerType = (type: Omit<SpeakerType, "id">): SpeakerType => {
  const newType = {
    id: String(speakerTypes.length + 1),
    ...type,
  };
  speakerTypes.push(newType);
  return newType;
};

export const updateSpeakerType = (
  id: string,
  data: Partial<SpeakerType>,
): SpeakerType | null => {
  const index = speakerTypes.findIndex((t) => t.id === id);
  if (index === -1) return null;

  speakerTypes[index] = { ...speakerTypes[index], ...data };
  return speakerTypes[index];
};

export const deleteSpeakerType = (id: string): boolean => {
  const index = speakerTypes.findIndex((t) => t.id === id);
  if (index === -1) return false;

  speakerTypes.splice(index, 1);
  return true;
};
