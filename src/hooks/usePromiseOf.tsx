import { ReactType } from '../types/types';
export const usePromiseOf = (React: ReactType, a: () => Promise<(() => void) | void>, deps?: React.DependencyList) => {
  const [data, setData] = React.useState<(() => void) | void>();
  React.useEffect(() => {
    a().then(it => {
      setData(() => {
        return it;
      });
    });
  }, deps);
  React.useEffect(() => {
    return () => {
      data?.();
    };
  }, [data]);
};

export default usePromiseOf;