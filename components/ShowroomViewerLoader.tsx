"use client";

import dynamic from "next/dynamic";

const ShowroomViewer = dynamic(() => import("@/components/ShowroomViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center font-mono text-[10px] uppercase tracking-[0.3em] text-label">
      Učitavanje modela
    </div>
  ),
});

export default function ShowroomViewerLoader() {
  return <ShowroomViewer />;
}
