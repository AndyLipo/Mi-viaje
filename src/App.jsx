import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import { MapPage } from './Pages/MapPage';
import { HomePage } from './Pages/HomePage';
import { TaskAppPage } from './Pages/TaskAppPage';
import { NaftaPage } from './Pages/NaftaPage';
import { ClimaPage } from './Pages/ClimaPage';

function App() {
  const location = useLocation(); // Detecta cambios en la URL

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0}}
              transition={{ duration: 0.3 }}
            >
              <HomePage />
            </motion.div>
          }
        />
        <Route
          path="/map"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MapPage />
            </motion.div>
          }
        />
        <Route
          path="/tasks"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TaskAppPage />
            </motion.div>
          }
        />
        <Route
          path="/calculator"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <NaftaPage />
            </motion.div>
          }
        />
        <Route
          path="/clima"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ClimaPage />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
