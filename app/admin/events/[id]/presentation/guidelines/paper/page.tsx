"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { GuidelinesEditor } from "@/components/admin/presentation/GuidelinesEditor";

const mockPaperGuidelines = `## Paper Guidelines

### Submission Requirements
1. Full paper must be submitted by the deadline
2. Paper should follow the IEEE format
3. Maximum 6 pages including references
4. All authors must be registered

### Review Process
- Double-blind peer review
- At least 3 reviewers per paper
- Acceptance criteria: originality, technical quality, presentation

### Formatting Requirements
- Font: Times New Roman, 10pt
- Margins: 1 inch all around
- References: IEEE style

### Paper Structure
- Title and Abstract
- Introduction
- Methodology
- Results
- Discussion
- Conclusion
- References

### Important Dates
- Submission Deadline: January 15, 2026
- Notification of Acceptance: February 1, 2026
- Camera-Ready Submission: February 15, 2026`;

export default function PaperGuidelinesPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [content, setContent] = useState(mockPaperGuidelines);

  const handleSave = (newContent: string) => {
    setContent(newContent);
    alert("Paper guidelines saved!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Paper Guidelines</h2>
        <p className="text-muted-foreground">
          Manage paper submission guidelines for Event #{eventId}
        </p>
      </div>

      <GuidelinesEditor type="Paper" content={content} onSave={handleSave} />
    </div>
  );
}
