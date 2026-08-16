// components/admin/onsite/badge-design/BadgeCanvas.tsx
"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { BadgeTemplate, BadgeField } from "./BadgeDesignContext";
import { cn } from "@/lib/utils";

interface BadgeCanvasProps {
  template: BadgeTemplate;
  side: "front" | "back";
  selectedFieldId: string | null;
  onFieldSelect: (fieldId: string) => void;
  onFieldUpdate: (fieldId: string, updates: Partial<BadgeField>) => void;
  showPunchingArea: boolean;
  zoomLevel: number;
  onFieldDoubleClick?: (fieldId: string) => void;
}

export function BadgeCanvas({
  template,
  side,
  selectedFieldId,
  onFieldSelect,
  onFieldUpdate,
  showPunchingArea,
  zoomLevel,
  onFieldDoubleClick,
}: BadgeCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragFieldId, setDragFieldId] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [fieldStartPos, setFieldStartPos] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);
  const [resizeStart, setResizeStart] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [fieldStartSize, setFieldStartSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [mouseDownFieldId, setMouseDownFieldId] = useState<string | null>(null);
  const [mouseDownTime, setMouseDownTime] = useState<number>(0);
  const [mouseDownPos, setMouseDownPos] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [showSizeInfo, setShowSizeInfo] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [isResizing, setIsResizing] = useState(false);

  const fields = side === "front" ? template.frontSide : template.backSide;

  const getFieldStyle = (field: BadgeField) => {
    const leftPercent = (field.x / template.size.width) * 100;
    const topPercent = (field.y / template.size.height) * 100;
    const widthPercent = (field.width / template.size.width) * 100;
    const heightPercent = (field.height / template.size.height) * 100;

    const isSelected = selectedFieldId === field.id;

    // Calculate font size based on field dimensions - scales with box
    const getFitFontSize = () => {
      const baseSize = field.fontSize || 16;
      // Scale based on area relative to default (65 * 25 = 1625)
      const area = field.width * field.height;
      const scale = Math.sqrt(area / 1625);
      const newSize = Math.round(baseSize * scale);
      return Math.max(8, Math.min(72, newSize));
    };

    const baseStyle: React.CSSProperties = {
      position: "absolute",
      left: `${leftPercent}%`,
      top: `${topPercent}%`,
      width: `${widthPercent}%`,
      height: `${heightPercent}%`,
      cursor: isSelected ? "move" : "pointer",
      border: isSelected ? "2px solid #3b82f6" : "1px solid transparent",
      borderRadius: "4px",
      transition: isDragging || isResizing ? "none" : "all 0.15s",
      display: field.isVisible ? "flex" : "none",
      alignItems: "center",
      justifyContent:
        field.alignment === "center"
          ? "center"
          : field.alignment === "right"
            ? "flex-end"
            : "flex-start",
      padding: "6px 8px",
      overflow: "hidden",
      wordBreak: "break-word",
      userSelect: "none",
      backgroundColor: isSelected ? "rgba(59, 130, 246, 0.06)" : "transparent",
      zIndex: isSelected ? 10 : 1,
      fontSize: `${getFitFontSize()}px`,
      fontFamily: field.fontFamily || "Inter, sans-serif",
      fontWeight: field.fontWeight || "400",
      color: field.color || "#1a1a2e",
      lineHeight: "1.3",
      maxWidth: "100%",
      maxHeight: "100%",
      boxSizing: "border-box",
    };

    if (field.type === "text") {
      return baseStyle;
    }

    if (field.type === "qr") {
      return {
        ...baseStyle,
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
        padding: "4px",
        border: isSelected ? "2px solid #3b82f6" : "1px solid #e5e7eb",
        borderRadius: "4px",
        fontSize: "10px",
        color: "#666",
      };
    }

    if (field.type === "image") {
      return {
        ...baseStyle,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        border: isSelected ? "2px solid #3b82f6" : "1px dashed transparent",
        overflow: "hidden",
        padding: "2px",
      };
    }

    if (field.type === "rectangle") {
      return {
        ...baseStyle,
        backgroundColor: field.backgroundColor || "#e5e7eb",
        border: `2px solid ${field.color || "#6b7280"}`,
        padding: "0",
      };
    }

    return baseStyle;
  };

  const renderQRCode = (content: string) => {
    const data = content || "QR Code";
    const size = 21;
    const pattern: number[][] = [];

    for (let i = 0; i < size; i++) {
      pattern[i] = [];
      for (let j = 0; j < size; j++) {
        pattern[i][j] = 0;
      }
    }

    const addMarker = (startX: number, startY: number) => {
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
          if (
            i === 0 ||
            i === 6 ||
            j === 0 ||
            j === 6 ||
            (i >= 2 && i <= 4 && j >= 2 && j <= 4)
          ) {
            if (startX + i < size && startY + j < size) {
              pattern[startX + i][startY + j] = 1;
            }
          }
        }
      }
    };

    addMarker(0, 0);
    addMarker(0, size - 7);
    addMarker(size - 7, 0);

    for (let i = 0; i < size; i++) {
      if (i % 2 === 0) {
        if (pattern[6][i] === 0) pattern[6][i] = 1;
        else pattern[6][i] = 0;
      }
      if (i % 2 === 0) {
        if (pattern[i][6] === 0) pattern[i][6] = 1;
        else pattern[i][6] = 0;
      }
    }

    let dataIndex = 0;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const isMarker =
          (i < 7 && j < 7) ||
          (i < 7 && j >= size - 7) ||
          (i >= size - 7 && j < 7);
        const isTiming = i === 6 || j === 6;

        if (!isMarker && !isTiming && pattern[i][j] === 0) {
          const charCode = data.charCodeAt(dataIndex % data.length);
          const bit = (charCode & (1 << (dataIndex % 8))) !== 0;
          pattern[i][j] = bit ? 1 : 0;
          dataIndex++;
        }
      }
    }

    const moduleSize = 100 / size;
    const padding = 1;
    let squares = "";

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (pattern[i][j] === 1) {
          const x = padding + j * moduleSize;
          const y = padding + i * moduleSize;
          const w = moduleSize - padding * 2;
          const h = moduleSize - padding * 2;
          squares += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#1a1a2e" rx="0.5"/>`;
        }
      }
    }

    return `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="white" rx="2"/>
        ${squares}
      </svg>
    `;
  };

  const getFieldContent = (field: BadgeField) => {
    if (field.type === "text") {
      // Check if content has HTML (rich text)
      if (
        field.content &&
        (field.content.includes("<") || field.content.includes(">"))
      ) {
        return (
          <div
            className="w-full h-full flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: field.content }}
          />
        );
      }
      return field.content || "Double click to edit";
    }
    if (field.type === "qr") {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div
            className="w-full h-full"
            dangerouslySetInnerHTML={{
              __html: renderQRCode(field.content || "QR Code"),
            }}
          />
        </div>
      );
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
        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 text-xs">
          <svg
            className="w-6 h-6 mb-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>Drop image</span>
        </div>
      );
    }
    if (field.type === "rectangle") {
      return null;
    }
    return field.content;
  };

  const handleMouseDown = (e: React.MouseEvent, fieldId: string) => {
    e.preventDefault();
    e.stopPropagation();

    const field = fields.find((f) => f.id === fieldId);
    if (!field) return;

    setIsMouseDown(true);
    setMouseDownFieldId(fieldId);
    setMouseDownTime(Date.now());
    setMouseDownPos({ x: e.clientX, y: e.clientY });

    setIsDragging(true);
    setDragFieldId(fieldId);
    setDragStart({ x: e.clientX, y: e.clientY });
    setFieldStartPos({ x: field.x, y: field.y });
  };

  const handleDoubleClick = (e: React.MouseEvent, fieldId: string) => {
    e.preventDefault();
    e.stopPropagation();
    // Select the field and trigger edit
    onFieldSelect(fieldId);
    if (onFieldDoubleClick) {
      onFieldDoubleClick(fieldId);
    }
  };

  const handleResizeMouseDown = (
    e: React.MouseEvent,
    fieldId: string,
    handle: string,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const field = fields.find((f) => f.id === fieldId);
    if (!field) return;

    setIsMouseDown(true);
    setMouseDownFieldId(fieldId);
    setMouseDownTime(Date.now());
    setMouseDownPos({ x: e.clientX, y: e.clientY });

    setResizeHandle(handle);
    setResizeStart({ x: e.clientX, y: e.clientY });
    setFieldStartSize({ width: field.width, height: field.height });
    setDragFieldId(fieldId);
    setIsResizing(true);
    setIsDragging(true);
    setShowSizeInfo({ width: field.width, height: field.height });
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !dragFieldId || !dragStart || !fieldStartPos) return;

      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      const dx = ((e.clientX - dragStart.x) / rect.width) * template.size.width;
      const dy =
        ((e.clientY - dragStart.y) / rect.height) * template.size.height;

      if (resizeHandle && fieldStartSize) {
        let newWidth = fieldStartSize.width;
        let newHeight = fieldStartSize.height;
        let newX = fieldStartPos.x;
        let newY = fieldStartPos.y;

        if (resizeHandle.includes("right")) {
          newWidth = Math.max(20, fieldStartSize.width + dx);
        }
        if (resizeHandle.includes("left")) {
          const delta = Math.max(0, fieldStartSize.width - dx);
          newWidth = Math.max(20, delta);
          newX = fieldStartPos.x + (fieldStartSize.width - newWidth);
        }
        if (resizeHandle.includes("bottom")) {
          newHeight = Math.max(15, fieldStartSize.height + dy);
        }
        if (resizeHandle.includes("top")) {
          const delta = Math.max(0, fieldStartSize.height - dy);
          newHeight = Math.max(15, delta);
          newY = fieldStartPos.y + (fieldStartSize.height - newHeight);
        }

        // Calculate new font size based on area
        const currentField = fields.find((f) => f.id === dragFieldId);
        const baseFontSize = currentField?.fontSize || 16;
        const oldArea = fieldStartSize.width * fieldStartSize.height;
        const newArea = newWidth * newHeight;
        const scale = Math.sqrt(Math.max(0.1, newArea / oldArea));
        const newFontSize = Math.max(
          8,
          Math.min(72, Math.round(baseFontSize * scale)),
        );

        onFieldUpdate(dragFieldId, {
          width: Math.round(newWidth),
          height: Math.round(newHeight),
          x: Math.round(Math.max(0, newX)),
          y: Math.round(Math.max(0, newY)),
          fontSize: newFontSize,
        });

        setShowSizeInfo({
          width: Math.round(newWidth),
          height: Math.round(newHeight),
        });
      } else {
        const field = fields.find((f) => f.id === dragFieldId);
        if (!field) return;

        onFieldUpdate(dragFieldId, {
          x: Math.max(
            0,
            Math.min(
              template.size.width - field.width,
              Math.round(fieldStartPos.x + dx),
            ),
          ),
          y: Math.max(
            0,
            Math.min(
              template.size.height - field.height,
              Math.round(fieldStartPos.y + dy),
            ),
          ),
        });
      }
    },
    [
      isDragging,
      dragFieldId,
      dragStart,
      fieldStartPos,
      resizeHandle,
      fieldStartSize,
      onFieldUpdate,
      fields,
      template.size,
    ],
  );

  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      if (isMouseDown && mouseDownFieldId && mouseDownPos) {
        const distance = Math.sqrt(
          Math.pow(e.clientX - mouseDownPos.x, 2) +
            Math.pow(e.clientY - mouseDownPos.y, 2),
        );
        const timeElapsed = Date.now() - mouseDownTime;

        if (distance < 5 && timeElapsed < 300 && !resizeHandle) {
          onFieldSelect(mouseDownFieldId);
        }
      }

      setIsDragging(false);
      setIsResizing(false);
      setDragFieldId(null);
      setDragStart(null);
      setFieldStartPos(null);
      setResizeHandle(null);
      setResizeStart(null);
      setFieldStartSize(null);
      setIsMouseDown(false);
      setMouseDownFieldId(null);
      setMouseDownPos(null);

      setTimeout(() => setShowSizeInfo(null), 1500);
    },
    [
      isMouseDown,
      mouseDownFieldId,
      mouseDownPos,
      mouseDownTime,
      resizeHandle,
      onFieldSelect,
    ],
  );

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={canvasRef}
      className="relative bg-white rounded-lg shadow-lg overflow-visible border"
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        aspectRatio:
          template.orientation === "portrait"
            ? `${template.size.width}/${template.size.height}`
            : `${template.size.height}/${template.size.width}`,
        transform: `scale(${zoomLevel})`,
        transformOrigin: "center",
        transition: "transform 0.2s",
      }}
    >
      {/* Background */}
      {template.background.type !== "none" && (
        <div
          className="absolute inset-0"
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

      {/* Punching Area Reference */}
      {showPunchingArea && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-[8px] h-[8px] -translate-y-1/2 rounded-full border-2 border-dashed border-red-400 opacity-50" />
          <div className="absolute top-1/2 right-0 w-[8px] h-[8px] -translate-y-1/2 rounded-full border-2 border-dashed border-red-400 opacity-50" />
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
            <span className="text-[6px] text-red-400 opacity-50">
              Punching Area Reference
            </span>
          </div>
        </div>
      )}

      {/* Fields */}
      {fields.map((field) => (
        <div
          key={field.id}
          style={getFieldStyle(field)}
          onMouseDown={(e) => handleMouseDown(e, field.id)}
          onDoubleClick={(e) => handleDoubleClick(e, field.id)}
          className={cn(
            "transition-all duration-200 group",
            selectedFieldId === field.id && "ring-2 ring-primary ring-offset-1",
            !field.isVisible && "opacity-40",
            selectedFieldId !== field.id &&
              "hover:ring-1 hover:ring-primary/30",
          )}
        >
          {getFieldContent(field)}

          {/* Resize handles - show when selected */}
          {selectedFieldId === field.id && (
            <>
              <div
                className="absolute top-0 left-0 w-5 h-5 cursor-nwse-resize bg-primary rounded-full -translate-x-2.5 -translate-y-2.5 border-2 border-white shadow-lg hover:scale-125 transition-transform z-30"
                onMouseDown={(e) =>
                  handleResizeMouseDown(e, field.id, "top-left")
                }
                title="Drag to resize"
              />
              <div
                className="absolute top-0 right-0 w-5 h-5 cursor-nesw-resize bg-primary rounded-full translate-x-2.5 -translate-y-2.5 border-2 border-white shadow-lg hover:scale-125 transition-transform z-30"
                onMouseDown={(e) =>
                  handleResizeMouseDown(e, field.id, "top-right")
                }
                title="Drag to resize"
              />
              <div
                className="absolute bottom-0 left-0 w-5 h-5 cursor-nesw-resize bg-primary rounded-full -translate-x-2.5 translate-y-2.5 border-2 border-white shadow-lg hover:scale-125 transition-transform z-30"
                onMouseDown={(e) =>
                  handleResizeMouseDown(e, field.id, "bottom-left")
                }
                title="Drag to resize"
              />
              <div
                className="absolute bottom-0 right-0 w-5 h-5 cursor-nwse-resize bg-primary rounded-full translate-x-2.5 translate-y-2.5 border-2 border-white shadow-lg hover:scale-125 transition-transform z-30"
                onMouseDown={(e) =>
                  handleResizeMouseDown(e, field.id, "bottom-right")
                }
                title="Drag to resize"
              />
              <div
                className="absolute top-1/2 right-0 w-5 h-2.5 cursor-ew-resize bg-primary rounded-full translate-x-2.5 -translate-y-1/2 border-2 border-white shadow-lg hover:scale-125 transition-transform z-30"
                onMouseDown={(e) => handleResizeMouseDown(e, field.id, "right")}
                title="Drag to resize width"
              />
              <div
                className="absolute top-1/2 left-0 w-5 h-2.5 cursor-ew-resize bg-primary rounded-full -translate-x-2.5 -translate-y-1/2 border-2 border-white shadow-lg hover:scale-125 transition-transform z-30"
                onMouseDown={(e) => handleResizeMouseDown(e, field.id, "left")}
                title="Drag to resize width"
              />
              <div
                className="absolute bottom-0 left-1/2 w-2.5 h-5 cursor-ns-resize bg-primary rounded-full -translate-x-1/2 translate-y-2.5 border-2 border-white shadow-lg hover:scale-125 transition-transform z-30"
                onMouseDown={(e) =>
                  handleResizeMouseDown(e, field.id, "bottom")
                }
                title="Drag to resize height"
              />
              <div
                className="absolute top-0 left-1/2 w-2.5 h-5 cursor-ns-resize bg-primary rounded-full -translate-x-1/2 -translate-y-2.5 border-2 border-white shadow-lg hover:scale-125 transition-transform z-30"
                onMouseDown={(e) => handleResizeMouseDown(e, field.id, "top")}
                title="Drag to resize height"
              />
            </>
          )}
        </div>
      ))}

      {/* Size info tooltip */}
      {showSizeInfo && selectedFieldId && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-3 py-1 rounded-full pointer-events-none z-40">
          {Math.round(showSizeInfo.width)} × {Math.round(showSizeInfo.height)}{" "}
          px
        </div>
      )}

      {/* Side Label */}
      <div className="absolute bottom-2 right-2 text-[8px] font-medium text-gray-400 bg-white/80 px-2 py-0.5 rounded pointer-events-none z-5">
        {side === "front" ? "Front" : "Back"}
      </div>

      {/* Resize hint */}
      {selectedFieldId && (
        <div className="absolute top-2 left-2 text-[8px] text-gray-400 bg-white/80 px-2 py-0.5 rounded pointer-events-none z-5">
          Drag handles to resize • Double click to edit text
        </div>
      )}
    </div>
  );
}
