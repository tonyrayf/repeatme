import repeat as rep
import json


k1 = 127.7
k2 = 176.466 # 176,466
good_pressure = 5000
bad_pressure = 10000

good_flow_rate = 242.518 # 242,518
bad_flow_rate = good_flow_rate * 0.95


user = rep.User(token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjQwNzA5OTUxOTksImlhdCI6MTc0NDAyNjA1OSwidXNlcklkIjoxNjQ2fQ.LRSXCxTEcTfZp9TTl85SapyTUh4XrLtBU6J9LqdD0PY")

app = rep.Application(user)

project_id = 78643
total_time = 200
time_interval = rep.TimeInterval(start = 1, end = total_time)

model = app.get_exploration_model(project_id, time_interval)

exist_vars = model.existing_variables


with model as M:
    M.run(exist_vars)

    flow_rate = M.get_results("mass_flowrate")[total_time]
    pressure = M.get_results("measure_drop_press_filter")[total_time]

resistance = pressure / k1

data = {
    "flowRate" : flow_rate,
    "pressure" : pressure,
    "resistance" : "{:.2f}".format(resistance)
}


print(json.dumps(data))