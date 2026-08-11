import StoreProvider from './StoreProvider';
import AntdProvider from './AntdProvider';

/** Single entry point that composes all app-wide providers. */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <AntdProvider>{children}</AntdProvider>
    </StoreProvider>
  );
}
