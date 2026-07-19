import LoadingScreen from "./components/common/LoadingScreen";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <LoadingScreen>

      <AppRoutes />

    </LoadingScreen>
  );
}

export default App;