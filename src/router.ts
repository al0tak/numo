import { createRootRoute,createRoute, createRouter } from "@tanstack/react-router";

import { RootLayout } from "./routes/__root";
import { HomePage } from "./routes/index";
import { InvoicesNewPage } from "./routes/invoices.new";
import { SettingsPage } from "./routes/settings";

const rootRoute = createRootRoute({ component: RootLayout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const invoicesNewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/invoices/new",
  component: InvoicesNewPage,
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: SettingsPage,
});

const routeTree = rootRoute.addChildren([indexRoute, invoicesNewRoute, settingsRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
