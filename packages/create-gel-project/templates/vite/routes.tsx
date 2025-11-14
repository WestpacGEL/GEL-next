// src/routes.ts
import { type RouteConfig } from '@react-router/dev/routes';
import { flatRoutes } from '@react-router/fs-routes';

export default [
  // Example root route
  ...(await flatRoutes()),
] satisfies RouteConfig;
