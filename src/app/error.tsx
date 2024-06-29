'use client';

import HasErrorState from '@/components/api-states/HasErrorState';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <HasErrorState />;
}
