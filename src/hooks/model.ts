import React, { useMemo } from 'react';

export interface IViewModel {
  destroy(): void;
}

export const useViewModel = <T extends IViewModel>(
  initialState: () => T,
  deps: React.DependencyList = [],
): T => {
  const viewModel = useMemo(initialState, deps); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    return () => viewModel.destroy();
  }, [viewModel]);

  return viewModel;
};
