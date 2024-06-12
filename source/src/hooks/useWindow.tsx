import React from 'react';
export const useWindow = () => {
  const [data, setData] = React.useState<Window | null>(null);
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setData(window);
    }
  }, []);
  return data;
};
export default useWindow;