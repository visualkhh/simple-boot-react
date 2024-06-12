import { ReactType } from '../types/types';

export const useWindow = (React: ReactType) => {
  const [data, setData] = React.useState<Window | null>(null);
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setData(window);
    }
  }, []);
  return data;
};
  export default useWindow;