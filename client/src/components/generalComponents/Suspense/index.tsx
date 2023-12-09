import { ReactNode, Suspense } from 'react';

interface LazyComponentProps {
  children: ReactNode;
}

const LazyComponent = ({ children }: LazyComponentProps) => {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};

export default LazyComponent;
