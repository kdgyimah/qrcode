"use client";

import React, { useCallback, useMemo } from "react";
import { Download, Upload} from "lucide-react";
import type { FormProps, BulkQRFormData } from "@/types/qr-generator";
import { Label } from "@/components/ui/label";
import { ErrorText } from "@/components/ui/error-text";
import { inputBase } from "@/constants/styles";
import { cn } from "@/lib/utils";

export function BulkQRForm({
  formData,
  onChange,
  errors,
  onContentCreate,
}: FormProps<BulkQRFormData>) {
  // Safe derived values
  const lines = useMemo(
    () =>
      formData?.bulkList
        ?.split("\n")
        .map((line) => line.trim())
        .filter(Boolean) ?? [],
    [formData?.bulkList]
  );

  const itemCount = lines.length;
  const previewItems = lines.slice(0, 5);
  const isValid = itemCount > 0;

  // Handlers
  const handleBulkListChange = useCallback(
    (value: string) => onChange("bulkList", value),
    [onChange]
  );

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const content = (event.target?.result as string) ?? "";
        if (!content) return;

        if (file.type === "text/csv") {
          const urls = content
            .split("\n")
            .map((line) => line.split(",")[0]?.trim())
            .filter(Boolean)
            .join("\n");
          handleBulkListChange(urls);
        } else {
          handleBulkListChange(content);
        }
      };
      reader.readAsText(file);
    },
    [handleBulkListChange]
  );

  const downloadTemplate = useCallback(() => {
    const template = `https://example.com/page1
https://example.com/page2
https://example.com/page3
tel:+1234567890
mailto:contact@example.com`;

    const blob = new Blob([template], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bulk-qr-template.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (isValid) {
        onContentCreate(formData);
      }
    },
    [isValid, onContentCreate, formData]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      <BulkListInput
        bulkList={formData.bulkList ?? ""}
        errors={errors}
        onBulkListChange={handleBulkListChange}
        onDownloadTemplate={downloadTemplate}
        itemCount={itemCount}
      />

      <FileUploadSection onFileUpload={handleFileUpload} />

      {previewItems.length > 0 && (
        <PreviewSection previewItems={previewItems} itemCount={itemCount} />
      )}

      {/* <TipsSection /> */}
    </form>
  );
}


interface BulkListInputProps {
  bulkList: string;
  errors: Partial<Record<keyof BulkQRFormData, string>>;
  onBulkListChange: (value: string) => void;
  onDownloadTemplate: () => void;
  itemCount: number;
}

function BulkListInput({
  bulkList,
  errors,
  onBulkListChange,
  onDownloadTemplate,
  itemCount,
}: BulkListInputProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <Label htmlFor="bulkList">Generate multiple QR codes at once</Label>
        <button
          type="button"
          onClick={onDownloadTemplate}
          className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
        >
          <Download className="w-3 h-3" />
          Template
        </button>
      </div>

      <textarea
        id="bulkList"
        value={bulkList}
        onChange={(e) => onBulkListChange(e.target.value)}
        placeholder={`Enter one item per line:\nhttps://example.com/page1\nhttps://example.com/page2\ntel:+1234567890\nmailto:contact@example.com`}
        rows={8}
        className={cn(
          inputBase,
          "font-mono text-sm",
          errors.bulkList && "border-gray-300 bg-white"
        )}
        required
      />

      {errors.bulkList && <ErrorText id="message error">{errors.bulkList}</ErrorText>}

      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-gray-500">
          One item per line. Supports URLs, phone numbers, emails, etc.
        </p>
        {itemCount > 0 && (
          <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
            {itemCount} item{itemCount !== 1 ? "s" : ""}
          </span>
        )}
      </div>
    </div>
  );
}

function FileUploadSection({
  onFileUpload,
}: {
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <Label className="mb-2">Upload File (Optional)</Label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
        <input
          type="file"
          accept=".txt,.csv"
          onChange={onFileUpload}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center space-y-2"
        >
          <Upload className="w-6 h-6 text-gray-400" />
          <span className="text-sm text-gray-600">Upload .txt or .csv</span>
          <span className="text-xs text-gray-400">
            CSV files will use the first column
          </span>
        </label>
      </div>
    </div>
  );
}

function PreviewSection({
  previewItems,
  itemCount,
}: {
  previewItems: string[];
  itemCount: number;
}) {
  return (
    <div>
      <Label className="mb-2">
        Preview ({previewItems.length} of {itemCount} items)
      </Label>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-1">
        {previewItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-sm truncate">
            <span className="text-gray-400 w-6">{index + 1}.</span>
            <span className="font-mono text-gray-700 flex-1">{item}</span>
          </div>
        ))}
        {itemCount > 5 && (
          <div className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-300">
            + {itemCount - 5} more items...
          </div>
        )}
      </div>
    </div>
  );
}

// function TipsSection() {
//   return (
//     <div className="bg-blue-100 border border-yellow-200 rounded-lg p-4">
//       <div className="flex items-start gap-2">
//         <FileText className="w-4 h-4 text-yellow-600 mt-0.5" />
//         <div>
//           <h4 className="text-sm font-medium text-yellow-900  mb-1">
//             Bulk Generation Tips
//           </h4>
//           <ul className="text-sm text-yellow-700 space-y-1">
//             <li>• Each line creates one QR code</li>
//             <li>• Supports URLs, phone numbers, emails</li>
//             <li>• Empty lines are ignored</li>
//             <li>• Large lists may take time to process</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }
