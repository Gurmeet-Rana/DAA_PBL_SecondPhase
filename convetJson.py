import json

data = []
with open("trainData.txt") as f:
    lines = f.readlines()

train = {}
for line in lines:
    if line.startswith("ENDTRAIN"):
        data.append(train)
        train = {}
    else:
        parts = line.strip().split()
        train_number = parts[0]
        if "trainNumber" not in train:
            train["trainNumber"] = train_number
            train["route"] = []
        station_data = {
            "station": parts[1],
            "arrival": int(parts[2]),
            "departure": int(parts[3]),
            "platform": int(parts[4]),
            "totalPlatforms": int(parts[5]),
            "delay": int(parts[6]),
            "passengersWaiting": int(parts[7]),
            "passengersArriving": int(parts[8])
        }
        train["route"].append(station_data)

with open("trains_Data.json", "w") as out:
    json.dump(data, out, indent=2)
