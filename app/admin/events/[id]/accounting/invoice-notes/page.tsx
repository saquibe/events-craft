"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { InvoiceNoteFormSheet } from "@/components/admin/accounting/InvoiceNoteForm";
import { CreateButton } from "@/components/admin/common/CreateButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface InvoiceNote {
  id: string;
  title: string;
  termsAndConditions: string;
  note: string;
  createdAt: string;
  updatedAt: string;
}

const mockNotes: InvoiceNote[] = [];

export default function InvoiceNotesPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [notes, setNotes] = useState<InvoiceNote[]>(mockNotes);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<InvoiceNote | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewingNote, setViewingNote] = useState<InvoiceNote | null>(null);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (editingNote) {
        setNotes(
          notes.map((n) =>
            n.id === editingNote.id
              ? {
                  ...n,
                  ...data,
                  updatedAt: new Date().toISOString(),
                }
              : n,
          ),
        );
      } else {
        const newNote: InvoiceNote = {
          id: String(notes.length + 1),
          ...data,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setNotes([...notes, newNote]);
      }
    } catch (error) {
      console.error("Error saving note:", error);
    } finally {
      setIsSubmitting(false);
      setIsFormOpen(false);
      setEditingNote(null);
    }
  };

  const handleEdit = (note: InvoiceNote) => {
    setEditingNote(note);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this note?")) {
      setNotes(notes.filter((n) => n.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Invoice Notes</h2>
          <p className="text-muted-foreground">
            Manage invoice notes for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Add Invoice Note"
          onClick={() => {
            setEditingNote(null);
            setIsFormOpen(true);
          }}
        />
      </div>

      {notes.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No invoice notes found</p>
            <p className="text-sm text-muted-foreground">
              Click &quot;Add Invoice Note&quot; to create your first note
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notes.map((note) => (
            <Card key={note.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  {note.title}
                </CardTitle>
                <div className="flex gap-1">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setViewingNote(note)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{viewingNote?.title}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div>
                          <h4 className="text-sm font-semibold mb-2 text-muted-foreground">
                            Terms & Conditions
                          </h4>
                          <div className="prose prose-sm max-w-none bg-muted/30 p-4 rounded-lg">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: viewingNote?.termsAndConditions || "",
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold mb-2 text-muted-foreground">
                            Note
                          </h4>
                          <div className="prose prose-sm max-w-none bg-muted/30 p-4 rounded-lg">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: viewingNote?.note || "",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(note)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(note.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-xs font-semibold mb-1 text-muted-foreground uppercase tracking-wider">
                    Terms & Conditions
                  </h4>
                  <div className="prose prose-sm max-w-none line-clamp-2 bg-muted/20 p-2 rounded">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: note.termsAndConditions,
                      }}
                    />
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold mb-1 text-muted-foreground uppercase tracking-wider">
                    Note
                  </h4>
                  <div className="prose prose-sm max-w-none line-clamp-2 bg-muted/20 p-2 rounded">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: note.note,
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <InvoiceNoteFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        note={editingNote}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
