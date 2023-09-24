import { useEffect, useSyncExternalStore } from "react";

function createStore(initialState) {
  let currentState = initialState;
  const listeners = new Set();
  return {
    getState: () => currentState,
    setState: (newState) => {
      currentState = newState;
      listeners.forEach((listener) => listener(currentState));
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

const store = createStore({
  isDOMClickedOutsideComponent: false,
});

export { store };

const useIsClickOutside = (ref, selector = (state) => state) => {
  if (!ref)
    throw new Error(
      "useIsClickOutsideComponent hook requires a reference to be passed to a component for it to watch"
    );

  useEffect(() => {
    function handler(e) {
      const state = store.getState();

      if (ref?.current?.contains(e?.target)) {
        store.setState({ ...state, isDOMClickedOutsideComponent: false });
      } else {
        store.setState({ ...state, isDOMClickedOutsideComponent: true });
      }
    }

    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  return useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState().isDOMClickedOutsideComponent),
    () => undefined
  );
};

export { useIsClickOutside };
