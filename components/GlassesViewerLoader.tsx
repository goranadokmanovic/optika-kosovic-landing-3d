"use client";

import dynamic from "next/dynamic";

const GlassesViewer = dynamic(() => import("@/components/GlassesViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-sm text-zinc-500">
      Loading…
    </div>
  ),
});

export default function GlassesViewerLoader() {
  return <GlassesViewer />;
}
