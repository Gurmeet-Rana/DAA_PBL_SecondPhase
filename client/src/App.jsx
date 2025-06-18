import LoadLocalData from './components/LoadLocalData';

function App() {
  const [graph, setGraph] = useState([]);
  const [schedules, setSchedules] = useState([]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Train Delay & Platform Optimizer</h1>
      <LoadLocalData setGraph={setGraph} setSchedules={setSchedules} />
      {graph.length > 0 && <TrainGraph graph={graph} />}
      {schedules.length > 0 && <TrainSchedule schedules={schedules} />}
    </div>
  );
}
