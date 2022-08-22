import { render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { MemoryRouter as Router } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import queryClient from "../services/queryConfig";

// Returns a router wrapper
function RouterWrapper({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>{children}</Router>
    </QueryClientProvider>
  );
}

// Renders with a wrapped router already built in
function renderWithRouter(ui, options) {
  render(ui, { wrapper: RouterWrapper, options });
}

// Returns the output of a render function with a wrapped router already built in
function renderHookWithQueryClient(hook, options) {
  return renderHook(hook, { wrapper: RouterWrapper, options });
}

export * from "@testing-library/react";

export { renderWithRouter as render, renderHookWithQueryClient as renderHook };
