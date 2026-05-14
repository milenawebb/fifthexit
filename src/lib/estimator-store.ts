import { useEffect, useState } from "react";

export interface EstimatorSelections {
  projectType: string;
  design: string;
  features: string[];
  timeline: string;
  estimatedPrice: string;
}

let current: EstimatorSelections | null = null;
const listeners = new Set<(v: EstimatorSelections | null) => void>();

export function setEstimatorSelections(v: EstimatorSelections | null) {
  current = v;
  listeners.forEach((l) => l(current));
}

export function getEstimatorSelections() {
  return current;
}

export function useEstimatorSelections() {
  const [v, setV] = useState<EstimatorSelections | null>(current);
  useEffect(() => {
    listeners.add(setV);
    return () => {
      listeners.delete(setV);
    };
  }, []);
  return v;
}
