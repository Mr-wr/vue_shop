const newRoute = {
  path: "/test-router",
  name: "router",
  component: () => import("@/views/testview/TestView"),
};

export default newRoute;
