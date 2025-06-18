// trainUtils.js
export function resolvePlatformConflicts(trains) {
  const stationEvents = {};

  trains.forEach(train => {
    train.route.forEach(station => {
      const arr = station.arrivalTime + station.delay;
      if (!stationEvents[station.name]) stationEvents[station.name] = [];
      stationEvents[station.name].push({ arr, station });
    });
  });
  Object.entries(stationEvents).forEach(([stationName, events]) => {
    events.sort((a, b) => a.arr - b.arr);

    const platformQueue = [];
    const platformAvailable = {};

    let maxPlatforms = Math.max(...events.map(e => e.station.totalPlatforms));
    for (let p = 1; p <= maxPlatforms; p++) platformAvailable[p] = true;

    events.forEach(({ station }) => {
      // Free up platforms
      while (
        platformQueue.length &&
        platformQueue[0].time <= station.arrivalTime + station.delay
      ) {
        const { platform } = platformQueue.shift();
        platformAvailable[platform] = true;
      }

      let assigned = false;
      for (let p = 1; p <= station.totalPlatforms; p++) {
        if (platformAvailable[p]) {
          station.platformNumber = p;
          platformAvailable[p] = false;
          platformQueue.push({
            time: station.departureTime + station.delay,
            platform: p
          });
          assigned = true;
          break;
        }
      }

      if (!assigned) {
        station.delay += 5;
        station.arrivalTime += 5;
        station.departureTime += 5;
      }

      platformQueue.sort((a, b) => a.time - b.time);
    });
  });
}

export function propagateDelays(trains) {
  trains.forEach(train => {
    let cumulativeDelay = 0;
    train.route.forEach(station => {
      station.arrivalTime += cumulativeDelay + station.delay;
      station.departureTime += cumulativeDelay + station.delay;
      cumulativeDelay += station.delay;
    });
  });
}

export function buildRouteGraph(trains) {
  const graph = {};
  trains.forEach(train => {
    for (let i = 0; i < train.route.length - 1; i++) {
      const from = train.route[i];
      const to = train.route[i + 1];
      const travelTime = to.arrivalTime - from.departureTime;

      if (!graph[from.name]) graph[from.name] = [];
      graph[from.name].push({
        to: to.name,
        time: travelTime < 0 ? travelTime + 2400 : travelTime
      });
    }
  });
  return graph;
}
