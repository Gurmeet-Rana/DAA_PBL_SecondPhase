#include <iostream>
#include <vector>
#include <fstream>
#include <sstream>
#include <unordered_map>
#include <queue>
#include <algorithm>
using namespace std;

class Station {
public:
    string name;
    int arrivalTime, departureTime;
    int delay;
    int passengersWaiting;
    int passengersArriving;
    int platformNumber;
    int totalPlatforms;

    Station() {}
    Station(string name, int at, int dt, int platform, int totalPlatforms, int delay = 0, int psngrWt = 0, int psngrAr = 0) {
        this->name = name;
        arrivalTime = at;
        departureTime = dt;
        this->delay = delay;
        passengersArriving = psngrAr;
        passengersWaiting = psngrWt;
        platformNumber = platform;
        this->totalPlatforms = totalPlatforms;
    }
};

class Train {
public:
    int trainId;
    vector<Station> route;
    Train() {}
    Train(int id) {
        trainId = id;
    }
};

unordered_map<string, vector<pair<string, int>>> graph;

void resolvePlatformConflicts(vector<Train>& trains) {
   
    unordered_map<string, vector<pair<int, Station*>>> stationEvents;

    // Gather all station events
    for (Train& train : trains) {
        for (Station& station : train.route) {
            int arr = station.arrivalTime + station.delay;
            stationEvents[station.name].push_back({arr, &station});
        }
    }

    // Process station by station
    for (auto& entry : stationEvents) {
        string stationName = entry.first;
        auto& events = entry.second;

        // Sort by arrival time (greedy strategy)
        sort(events.begin(), events.end(), [](auto& a, auto& b) {
            return a.first < b.first;
        });

        // Min-heap of {departureTime, platformNumber}
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> platformQueue;
        unordered_map<int, bool> platformAvailable;

        int maxPlatforms = 0;
        for (auto& e : events) {
            Station* s = e.second;
            maxPlatforms = max(maxPlatforms, s->totalPlatforms);
        }

        for (int p = 1; p <= maxPlatforms; ++p)
            platformAvailable[p] = true;

        for (auto& e : events) {
            Station* s = e.second;

            // Free up platforms whose trains have already left
            while (!platformQueue.empty() && platformQueue.top().first <= s->arrivalTime + s->delay) {
                int freedPlat = platformQueue.top().second;
                platformQueue.pop();
                platformAvailable[freedPlat] = true;
            }

            bool assigned = false;
            for (int p = 1; p <= s->totalPlatforms; ++p) {
                if (platformAvailable[p]) {
                    s->platformNumber = p;
                    platformAvailable[p] = false;
                    platformQueue.push({s->departureTime + s->delay, p});
                    assigned = true;
                    break;
                }
            }

            if (!assigned) {
                s->delay += 5;
                s->arrivalTime += 5;
                s->departureTime += 5;

            }
        }
    }
}

void propagateDelays(vector<Train>& trains) {
    for (Train& train : trains) {
        int cumulativeDelay = 0;
        for (auto& station : train.route) {
            station.arrivalTime += cumulativeDelay;
            station.departureTime += cumulativeDelay;
            station.arrivalTime += station.delay;
            station.departureTime += station.delay;
            cumulativeDelay += station.delay;
        }
    }
}

// ---- Build Graph from Train Routes ----
void buildGraphFromTrains(const vector<Train>& trains) {
    for (const Train& train : trains) {
        for (int i = 0; i < train.route.size() - 1; ++i) {
            string from = train.route[i].name;
            string to = train.route[i + 1].name;
            int travelTime = train.route[i + 1].arrivalTime - train.route[i].departureTime;
            if (travelTime < 0) travelTime += 2400;
            graph[from].push_back({to, travelTime});
        }
    }
}

void printGraph() {
    cout << "\nTrain Route Graph:\n";
    for (const auto& node : graph) {
        cout << node.first << " --> ";
        for (const auto& edge : node.second) {
            cout << "(" << edge.first << ", " << edge.second << ") ";
        }
        cout << "\n";
    }
}

void printTrainSchedules(const vector<Train>& trains) {
    cout << "\nTrain Schedules:\n";
    for (const auto& train : trains) {
        cout << "Train " << train.trainId << ":\n";
        for (const auto& st : train.route) {
            cout << "  " << st.name 
                 << " | Arr: " << st.arrivalTime 
                 << " | Dep: " << st.departureTime 
                 << " | Delay: " << st.delay 
                 << " | Platform: " << st.platformNumber << "\n";
        }
        cout << "--------------------------\n";
    }
}

// ---- File Reader ----
vector<Train> readTrainsFromFile(string filename) {
    vector<Train> trains;
    ifstream file(filename);
    string line;
    Train currentTrain;

    while (getline(file, line)) {
        if (line == "ENDTRAIN") {
            trains.push_back(currentTrain);
            currentTrain = Train();
            continue;
        }

        stringstream ss(line);
        int id, at, dt, platform, totalPlatforms, delay = 0, psngrWt = 0, psngrAr = 0;
        string stationName;
        ss >> id >> stationName >> at >> dt >> platform >> totalPlatforms >> delay >> psngrWt >> psngrAr;

        if (currentTrain.route.empty())
            currentTrain.trainId = id;

        Station s(stationName, at, dt, platform, totalPlatforms, delay, psngrWt, psngrAr);
        currentTrain.route.push_back(s);
    }
    return trains;
}

// ---- Main ----
int main() {
    vector<Train> trains = readTrainsFromFile("trainData.txt");
    buildGraphFromTrains(trains);
    printGraph();

    resolvePlatformConflicts(trains);
    propagateDelays(trains);
    printTrainSchedules(trains);

    return 0;
}
