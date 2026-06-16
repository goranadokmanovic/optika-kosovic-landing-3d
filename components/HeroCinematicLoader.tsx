"use client";

import dynamic from "next/dynamic";

const HeroCinematic = dynamic(() => import("@/components/HeroCinematic"), {
  ssr: false,
  loading: () => <div className="h-screen bg-luxury-white" />,
});

export default function HeroCinematicLoader() {
  return <HeroCinematic />;
}
