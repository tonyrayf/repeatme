import repeat as rep
import json

invN1 = 173.6
N2 = 118.6

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
    measure_pressure = M.get_results("measure_drop_press_filter")[total_time]

data = {
    "flow_rate" : flow_rate,
    "pressure" : measure_pressure 
}


print(json.dumps(data))