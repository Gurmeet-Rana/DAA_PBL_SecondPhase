#include <iostream>
#include <unordered_map>
#include <vector>
#include <string>

using namespace std;

struct Train {
    string id;
    string name;
    string currentStation;
    string destination;
    int delay;
    int updatedDelay;
    vector<string> route;
    int scheduledTime;
    int finalTime;
};

unordered_map<string, vector<string>> graph = {
    {"Dehradun", {"Roorkee", "Haridwar", "Meerut"}},
    {"Roorkee", {"Dehradun", "Meerut", "Muzaffarnagar"}},
    {"Haridwar", {"Dehradun", "Meerut", "Ghaziabad"}},
    {"Muzaffarnagar", {"Roorkee", "Meerut"}},
    {"Meerut", {"Dehradun", "Roorkee", "Haridwar", "Muzaffarnagar", "Ghaziabad", "New Delhi"}},
    {"Ghaziabad", {"Haridwar", "Meerut", "New Delhi"}},
    {"New Delhi", {"Meerut", "Ghaziabad", "Mathura"}},
    {"Indore", {"Mathura"}},
    {"Mathura", {"Indore", "New Delhi", "Meerut"}}
};

vector<Train> trains = {
    {"12018", "Dehradun Shatabdi", "Roorkee", "New Delhi", 40, 0, {"Dehradun", "Roorkee", "Meerut", "Ghaziabad", "New Delhi"}, 600},
    {"12056", "Jan Shatabdi Express", "Muzaffarnagar", "New Delhi", 5, 0, {"Roorkee", "Muzaffarnagar", "Meerut", "New Delhi"}, 605},
    {"12206", "Nanda Devi Express", "Haridwar", "New Delhi", 30, 0, {"Haridwar", "Meerut", "Ghaziabad", "New Delhi"}, 610},
    {"14041", "Mussoorie Express", "Haridwar", "New Delhi", 5, 0, {"Haridwar", "Meerut", "New Delhi"}, 615},
    {"14309", "Ujjaini Express", "Mathura", "New Delhi", 45, 0, {"Indore", "Mathura", "New Delhi"}, 600},
    {"13009", "Doon Express", "Muzaffarnagar", "New Delhi", 40, 0, {"Roorkee", "Muzaffarnagar", "Meerut", "New Delhi"}, 605},
    {"14317", "Indore-Dehradun Express", "Meerut", "New Delhi", 0, 0, {"Indore", "Mathura", "Meerut", "New Delhi"}, 620},
    {"14013", "Old Delhi Express", "Meerut", "New Delhi", 25, 0, {"Meerut", "Ghaziabad", "New Delhi"}, 630}
};

bool checkRouteOverlap(const vector<string>& r1, const vector<string>& r2) {
    for (int i = 0; i < r1.size() - 1; ++i) {
        string edge1 = r1[i] + "-" + r1[i + 1];
        for (int j = 0; j < r2.size() - 1; ++j) {
            string edge2 = r2[j] + "-" + r2[j + 1];
            if (edge1 == edge2 || edge1 == r2[j + 1] + "-" + r2[j])
                return true;
        }
    }
    return false;
}

void rescheduleTrains(vector<Train>& trains) {
    for (auto& train : trains) {
        int originalTime = train.scheduledTime + train.delay;
        int bestNewDelay = train.delay;

        for (const auto& other : trains) {
            if (train.id == other.id) continue;

            int otherFinal = other.finalTime > 0 ? other.finalTime : other.scheduledTime + other.delay;

            if (checkRouteOverlap(train.route, other.route) && originalTime == otherFinal) {
                // Collision detected → Reduce delay to just avoid conflict
                int reducedDelay = otherFinal - train.scheduledTime - 5;  // maintain 5 mins buffer
                if (reducedDelay < bestNewDelay && reducedDelay >= 0) {
                    bestNewDelay = reducedDelay;
                }
            }
        }

        train.updatedDelay = bestNewDelay;
        train.finalTime = train.scheduledTime + bestNewDelay;
    }
}

void printTrains(const vector<Train>& trains, bool showReschedule) {
    cout << "\nTrain Schedule:\n";
    for (const auto& train : trains) {
        cout << "\nTrain: " << train.name << " (" << train.id << ")";
        cout << "\n  From: " << train.currentStation << " → " << train.destination;
        cout << "\n  Scheduled Time: " << train.scheduledTime << " mins";
        cout << "\n  Original Delay: " << train.delay << " mins";
        if (showReschedule) {
            cout << "\n  Updated Delay: " << train.updatedDelay << " mins";
            cout << "\n  Rescheduled Time: " << train.finalTime << " mins";
        }
        cout << "\n";
    }
}

int main() {
    printTrains(trains, false);

    string confirm;
    cout << "\nReschedule trains to avoid collision? (yes/no): ";
    cin >> confirm;

    if (confirm == "yes") {
        rescheduleTrains(trains);
        printTrains(trains, true);
    } else {
        cout << "\nNo rescheduling done.\n";
    }

    return 0;
}
