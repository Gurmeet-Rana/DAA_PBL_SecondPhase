#include<iostream>
#include<vector>
#include<fstream>
#include<sstream>
#include<unordered_map>
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

// Graph: station → list of next connected stations with travel time
unordered_map<string, vector<pair<string, int>>> graph;

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

void buildGraphFromTrains(const vector<Train>& trains) {
    for (const Train& train : trains) {
        for (int i = 0; i < train.route.size() - 1; ++i) {
            string from = train.route[i].name;
            string to = train.route[i + 1].name;
            int travelTime = train.route[i + 1].arrivalTime - train.route[i].departureTime;
            if (travelTime < 0) travelTime += 2400;  // wrap around if needed
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

int main() {
    vector<Train> trains = readTrainsFromFile("trainData.txt");
    buildGraphFromTrains(trains);
    printGraph();
    return 0;
}
