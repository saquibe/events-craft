"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { GuidelinesEditor } from "@/components/admin/presentation/GuidelinesEditor";

const mockEPosterGuidelines = `## ePoster Guidelines

### Submission Requirements
1. ePoster must be submitted by the deadline
2. Format: PDF or PowerPoint
3. Maximum 2 slides
4. Must include: Title, Authors, Introduction, Methods, Results, Conclusion

### Presentation Guidelines
- 5 minutes presentation
- 3 minutes Q&A
- Must be presented in person at the conference

### ePoster Content Structure
1. Title and Authors
2. Introduction/Background
3. Methods/Approach
4. Results/Findings
5. Conclusion/Implications
6. References (if applicable)

### Design Guidelines
- Clean and professional design
- Use of charts and graphics encouraged
- Text should be concise and readable
- Include key findings prominently

### Technical Requirements
- File size: Max 10MB
- Resolution: 1920x1080 recommended
- Font size: Minimum 24pt for readability
- Format: PDF or PPTX`;

export default function EPosterGuidelinesPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [content, setContent] = useState(mockEPosterGuidelines);

  const handleSave = (newContent: string) => {
    setContent(newContent);
    alert("ePoster guidelines saved!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          ePoster Guidelines
        </h2>
        <p className="text-muted-foreground">
          Manage ePoster submission guidelines for Event #{eventId}
        </p>
      </div>

      <GuidelinesEditor type="ePoster" content={content} onSave={handleSave} />
    </div>
  );
}
