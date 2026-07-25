"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { GuidelinesEditor } from "@/components/admin/presentation/GuidelinesEditor";
import { Button } from "@/components/ui/button";

const mockTalkGuidelines = `## Talk Guidelines

### Submission Requirements
1. Abstract must be submitted by the deadline
2. Presentation should be 20 minutes + 5 minutes Q&A
3. Slides must be in PowerPoint or PDF format
4. All presenters must register for the conference

### Presentation Structure
- Introduction (2 min)
- Background (3 min)
- Methods (5 min)
- Results (5 min)
- Discussion/Conclusion (5 min)
- Q&A (5 min)

### Technical Requirements
- File format: PPTX or PDF
- Aspect ratio: 16:9
- Font size: Minimum 24pt for readability
- Images: High resolution (300 DPI)

### Important Dates
- Submission Deadline: January 15, 2026
- Notification of Acceptance: February 1, 2026
- Final Presentation Upload: February 15, 2026`;

export default function TalkGuidelinesPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [content, setContent] = useState(mockTalkGuidelines);
  const [open, setOpen] = useState(false);

  const handleSave = (newContent: string) => {
    setContent(newContent);
    alert("Talk guidelines saved!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Talk Guidelines</h2>

          <p className="text-muted-foreground">
            Manage talk submission guidelines for Event #{eventId}
          </p>
        </div>

        {/* <Button color="primary" onClick={() => setOpen(true)}>
          Edit Guidelines
        </Button> */}
      </div>

      <GuidelinesEditor type="Talk" content={content} onSave={handleSave} />
    </div>
  );
}
