// components/admin/onsite/BadgeCanvas.tsx
"use client";

import { useRef } from "react";
import { Rnd } from "react-rnd";
import type { BadgeTemplate, BadgeField } from "./BadgeDesignContext";
import { cn } from "@/lib/utils";

interface BadgeCanvasProps {
  template: BadgeTemplate;
  side: "front" | "back";
  selectedFieldId: string | null;
  onFieldSelect: (id: string) => void;
  onFieldUpdate: (id: string, updates: Partial<BadgeField>) => void;
  showPunchingArea: boolean;
  zoomLevel: number;
}

// Handle styling (classes only — no conflicting inline styles)
const RESIZE_HANDLE_CLASS =
  "bg-blue-500 border-2 border-white shadow-md rounded-full transition-transform hover:scale-125";
const CORNER_HANDLE_CLASS = `${RESIZE_HANDLE_CLASS} w-3 h-3`;
const EDGE_H_HANDLE_CLASS = `${RESIZE_HANDLE_CLASS} w-3 h-2`;
const EDGE_V_HANDLE_CLASS = `${RESIZE_HANDLE_CLASS} w-2 h-3`;

export function BadgeCanvas({
  template,
  side,
  selectedFieldId,
  onFieldSelect,
  onFieldUpdate,
  showPunchingArea,
  zoomLevel,
}: BadgeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fields = side === "front" ? template.frontSide : template.backSide;

  // Compute canvas size: 500px wide, height from aspect ratio
  const canvasWidth = 500;
  const canvasHeight =
    (template.size.height / template.size.width) * canvasWidth;

  const handleDragStop = (
    fieldId: string,
    e: any,
    data: { x: number; y: number },
  ) => {
    const cw = containerRef.current?.offsetWidth || canvasWidth;
    const ch = containerRef.current?.offsetHeight || canvasHeight;
    const dw = template.size.width;
    const dh = template.size.height;

    const xPercent = (data.x / cw) * dw;
    const yPercent = (data.y / ch) * dh;

    onFieldUpdate(fieldId, {
      x: Math.round(Math.max(0, Math.min(dw - 5, xPercent))),
      y: Math.round(Math.max(0, Math.min(dh - 5, yPercent))),
    });
  };

  const handleResizeStop = (
    fieldId: string,
    e: any,
    direction: any,
    ref: HTMLElement,
    delta: any,
    position: { x: number; y: number },
  ) => {
    const cw = containerRef.current?.offsetWidth || canvasWidth;
    const ch = containerRef.current?.offsetHeight || canvasHeight;
    const dw = template.size.width;
    const dh = template.size.height;

    const newWidth = parseInt(ref.style.width);
    const newHeight = parseInt(ref.style.height);
    const widthPercent = (newWidth / cw) * dw;
    const heightPercent = (newHeight / ch) * dh;
    const xPercent = (position.x / cw) * dw;
    const yPercent = (position.y / ch) * dh;

    // Auto-scale font size for text fields
    const field = fields.find((f) => f.id === fieldId);
    let newFontSize: number | undefined;
    if (field && field.type === "text") {
      const currentFontSize = field.fontSize || 14;
      const oldArea = (field.width || 1) * (field.height || 1);
      const newArea = widthPercent * heightPercent;
      const areaScale = Math.sqrt(newArea / oldArea);
      newFontSize = Math.max(
        8,
        Math.min(48, Math.round(currentFontSize * areaScale)),
      );
    }

    onFieldUpdate(fieldId, {
      width: Math.round(Math.max(10, widthPercent)),
      height: Math.round(Math.max(10, heightPercent)),
      x: Math.round(Math.max(0, Math.min(dw - 5, xPercent))),
      y: Math.round(Math.max(0, Math.min(dh - 5, yPercent))),
      ...(newFontSize !== undefined ? { fontSize: newFontSize } : {}),
    });
  };

  const getFieldStyle = (field: BadgeField): React.CSSProperties => {
    if (field.type === "text") {
      return {
        display: "flex",
        alignItems: "center",
        justifyContent:
          field.alignment === "center"
            ? "center"
            : field.alignment === "right"
              ? "flex-end"
              : "flex-start",
        padding: "2px 4px",
        overflow: "hidden",
        wordBreak: "break-word",
        userSelect: "none",
        width: "100%",
        height: "100%",
        fontSize: `${field.fontSize || 14}px`,
        fontFamily: field.fontFamily || "Arial, sans-serif",
        fontWeight: field.fontWeight || "normal",
        color: field.color || "#1a1a2e",
        lineHeight: "1.2",
        backgroundColor: field.backgroundColor || "transparent",
      };
    }

    if (field.type === "image") {
      return {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        padding: "2px",
      };
    }

    if (field.type === "qr") {
      return {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        border: "1px solid #e5e7eb",
      };
    }

    if (field.type === "rectangle") {
      return {
        width: "100%",
        height: "100%",
        backgroundColor: field.backgroundColor || field.color || "#e5e7eb",
        border: `1px solid ${field.color || "#6b7280"}`,
      };
    }

    return {};
  };

  const renderFieldContent = (field: BadgeField) => {
    if (field.type === "text") {
      return field.content || "Text";
    }
    if (field.type === "image") {
      if (field.imageUrl) {
        return (
          <img
            src={field.imageUrl}
            alt={field.label}
            className="w-full h-full object-contain"
          />
        );
      }
      return (
        <div className="flex flex-col items-center justify-center text-gray-400 text-[10px]">
          <span>Image</span>
        </div>
      );
    }
    if (field.type === "qr") {
      // Placeholder QR pattern (no external dependency)
      return (
        <div className="w-full h-full grid grid-cols-5 grid-rows-5 gap-[1px] p-1">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "bg-black",
                // Deterministic pattern for visual effect
                (i * 7 + 3) % 3 === 0 ? "bg-black" : "bg-white",
              )}
            />
          ))}
        </div>
      );
    }
    if (field.type === "rectangle") {
      return null;
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center">
      <div
        ref={containerRef}
        className="relative bg-white rounded-lg shadow-lg border mx-auto"
        style={{
          width: canvasWidth,
          height: canvasHeight,
          transform: `scale(${zoomLevel})`,
          transformOrigin: "top center",
          transition: "transform 0.2s",
        }}
      >
        {/* Background */}
        {template.background.type !== "none" && (
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              background:
                template.background.type === "gradient"
                  ? template.background.value
                  : template.background.type === "color"
                    ? template.background.value
                    : undefined,
              backgroundImage:
                template.background.type === "image" &&
                template.background.imageUrl
                  ? `url(${template.background.imageUrl})`
                  : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}

        {/* Punching area indicator */}
        {showPunchingArea && (
          <div
            className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center justify-center border-2 border-dashed border-red-300/70 rounded-full pointer-events-none z-30"
            style={{ width: 40, height: 14 }}
          >
            <span className="text-[8px] text-red-400">punch</span>
          </div>
        )}

        {/* Fields with Rnd */}
        {fields.map((field) => {
          const isSelected = selectedFieldId === field.id;

          const pixelX = (field.x / template.size.width) * canvasWidth;
          const pixelY = (field.y / template.size.height) * canvasHeight;
          const pixelWidth = (field.width / template.size.width) * canvasWidth;
          const pixelHeight =
            (field.height / template.size.height) * canvasHeight;

          return (
            <Rnd
              key={field.id}
              size={{ width: pixelWidth, height: pixelHeight }}
              position={{ x: pixelX, y: pixelY }}
              onDragStop={(e, data) => handleDragStop(field.id, e, data)}
              onResizeStop={(e, dir, ref, delta, pos) =>
                handleResizeStop(field.id, e, dir, ref, delta, pos)
              }
              enableResizing={isSelected}
              disableDragging={!isSelected}
              bounds="parent"
              dragGrid={[1, 1]}
              resizeGrid={[1, 1]}
              scale={zoomLevel}
              className={cn(
                "transition-shadow duration-150",
                isSelected
                  ? "z-20 ring-2 ring-primary ring-offset-1"
                  : "z-10 hover:ring-1 hover:ring-primary/30",
                !field.isVisible && "opacity-40",
              )}
              resizeHandleClasses={{
                bottomRight: CORNER_HANDLE_CLASS,
                bottomLeft: CORNER_HANDLE_CLASS,
                topRight: CORNER_HANDLE_CLASS,
                topLeft: CORNER_HANDLE_CLASS,
                bottom: EDGE_V_HANDLE_CLASS,
                top: EDGE_V_HANDLE_CLASS,
                left: EDGE_H_HANDLE_CLASS,
                right: EDGE_H_HANDLE_CLASS,
              }}
              onClick={() => onFieldSelect(field.id)}
            >
              <div style={getFieldStyle(field)}>
                {renderFieldContent(field)}
              </div>
            </Rnd>
          );
        })}

        {/* Side label */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 whitespace-nowrap capitalize">
          {side} side • {template.size.width} × {template.size.height}{" "}
          {template.size.unit} • {template.orientation}
        </div>
      </div>

      <div className="text-center text-xs text-muted-foreground mt-8">
        {selectedFieldId ? (
          <span>Drag to move • Drag handles to resize</span>
        ) : (
          <span>Click any field to select & edit</span>
        )}
      </div>
    </div>
  );
}
