"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TopicTable } from "@/components/admin/agenda/TopicTable";
import { TopicFormSheet } from "@/components/admin/agenda/TopicFormSheet";
import { Topic, Session } from "@/lib/types/agenda";

// Mock data
const mockSessions: Session[] = [
  {
    id: "1",
    name: "Medical Conference 2026",
    chairperson: ["Dr. Smith"],
    trackId: "1",
    hallId: "1",
    sessionDate: "2026-01-15",
    startTime: "09:00",
    endTime: "10:30",
    status: "scheduled",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const mockTopics: Topic[] = [
  {
    id: "1",
    sessionId: "1",
    session: mockSessions[0],
    topicType: "Presentation",
    topic: "Future of Healthcare",
    speakers: ["Dr. Johnson"],
    moderator: ["Dr. Lee"],
    panellists: ["Dr. Brown", "Dr. Davis"],
    teamMembers: ["Dr. Wilson"],
    presenters: ["Dr. Miller"],
    startTime: "09:00",
    endTime: "09:30",
    aboutTopic: "Discussion on future healthcare trends",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function TopicsPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [topics, setTopics] = useState<Topic[]>(mockTopics);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);

  const handleSubmit = async (data: any) => {
    const session = mockSessions.find((s) => s.id === data.sessionId);
    if (editingTopic) {
      setTopics(
        topics.map((t) =>
          t.id === editingTopic.id
            ? { ...t, ...data, session, updatedAt: new Date().toISOString() }
            : t,
        ),
      );
    } else {
      const newTopic: Topic = {
        id: String(topics.length + 1),
        ...data,
        session,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setTopics([...topics, newTopic]);
    }
    setIsFormOpen(false);
    setEditingTopic(null);
  };

  const handleEdit = (topic: Topic) => {
    setEditingTopic(topic);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setTopics(topics.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Topics</h2>
          <p className="text-muted-foreground">
            Manage topics for Event #{eventId}
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingTopic(null);
            setIsFormOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Topic
        </Button>
      </div>

      <TopicTable topics={topics} onEdit={handleEdit} onDelete={handleDelete} />

      <TopicFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        topic={editingTopic}
        sessions={mockSessions}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
