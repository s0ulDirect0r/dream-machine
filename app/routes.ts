import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  route("/api/auth/*", "routes/api.auth.$.ts"),
  route("/api/ai/*", "routes/api.ai.$.ts"),
  route("/api/chat/*", "routes/api.chat.$.ts"),
  layout("routes/chat-sidebar.tsx", [route("/chat", "routes/chat.tsx"),
  route("/chat/:id", "routes/chat-with-id.tsx"), index("routes/home.tsx")])
] satisfies RouteConfig;

