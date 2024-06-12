import React from 'react';

export namespace ClickEvent {
  export const preventDefault = <T = HTMLElement>(fc: (e: React.MouseEvent<T>) => void) => {
    return (e: React.MouseEvent<T>) => {
      e.preventDefault();
      fc(e);
    };
  };
}
