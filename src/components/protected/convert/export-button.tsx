interface ExportButtonProps {
  mermaidCode: string;
}

export default function ExportButton({ mermaidCode }: ExportButtonProps) {
  const handleExport = () => {
    const blob = new Blob([mermaidCode], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "requirements.mmd";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="bg-green-500 text-white px-4 py-2 rounded"
    >
      导出 Mermaid 文件
    </button>
  );
}
