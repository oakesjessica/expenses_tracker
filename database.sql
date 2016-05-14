--BE VEEEEEEERY SURE YOU'RE IN THE CORRECT DATABASE AND DROP ALL TABLES:>>>>>>>>>>>>>>>>>>>>
--
--DROP SCHEMA public CASCADE;
--CREATE SCHEMA public;

-- THEN RUN THESE COMMANDS ALL TOGETHER:>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

CREATE TABLE location (
id serial PRIMARY KEY,
name varchar(100) NOT NULL,
active_status boolean
);

INSERT INTO location (name, active_status)
VALUES ('St. Louis Park', TRUE);

CREATE TABLE users (
id serial PRIMARY KEY,
first_name varchar(255) NOT NULL,
last_name varchar(255) NOT NULL,
google_email varchar(255) NOT NULL,
google_name varchar(255),
admin boolean,
google_id varchar(255),
google_token varchar(255),
active_status boolean
);

INSERT INTO users (first_name, last_name, google_email, admin)
VALUES ('Andrew', 'Glenn', 'drstrangembm@gmail.com', TRUE);
INSERT INTO users (first_name, last_name, google_email, admin)
VALUES ('Caitlin', 'Collins', 'caitecoll@gmail.com', TRUE);
INSERT INTO users (first_name, last_name, google_email, admin)
VALUES ('Annette', 'Tousley', 'annette.tousley@gmail.com', TRUE);
INSERT INTO users (first_name, last_name, google_email, admin)
VALUES ('Moni', 'Francesca', 'mo.francesca@gmail.com', TRUE);

CREATE TABLE exercise (
id serial PRIMARY KEY,
name varchar(100) NOT NULL,
category varchar(100),
active_status boolean
);

INSERT INTO exercise (name, active_status)
VALUES ('Single Leg Deadlift', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Bag Toss', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Bag Clean', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Bent Row', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Bent Press', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Jump Rope', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Step Up', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Racked Step Up', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Plank Knee to Elbow', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Lizard Crawl', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Walkout', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Lunge Twist', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Marching', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Jump and land', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Ice Skater', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Pull Up', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Leg Lowering', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Hip Raises', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Quad Reach Back', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Russian Twist', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Toe Touch', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Quad Twist', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Sitout', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Shoulder Taps', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Mountain Climber', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Foam Rolling', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Thruster', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Curl to Press', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Burpee', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Jumping Jacks', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Row 1000m, rest 1 min (actively on rower)', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('TRX single leg squat', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('TRX W Fly', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('TRX plank', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('TRX Y fly', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Racked walk', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Full TGU', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Deadlift', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Chops/lifts', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Slams', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Farmer Carry', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('½ TGU', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Squats', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Bent over row', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Russian Twist', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('TRX Inverted Row', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('TRX Assisted Squat', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('Push-up', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('TRX Single leg reach', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('TRX Bicep curls', TRUE);
INSERT INTO exercise (name, active_status)
VALUES ('TRX Tricep Extensions', TRUE);



CREATE TABLE medical_conditions (
id SERIAL PRIMARY KEY,
condition VARCHAR(100)
);

INSERT INTO medical_conditions (condition)
VALUES ('dislocations');
INSERT INTO medical_conditions (condition)
VALUES ('phlebitis');
INSERT INTO medical_conditions (condition)
VALUES ('neck injuries');
INSERT INTO medical_conditions (condition)
VALUES ('low back pain');
INSERT INTO medical_conditions (condition)
VALUES ('high blood pressure');
INSERT INTO medical_conditions (condition)
VALUES ('heart problems');
INSERT INTO medical_conditions (condition)
VALUES ('headaches');
INSERT INTO medical_conditions (condition)
VALUES ('arthritis');
INSERT INTO medical_conditions (condition)
VALUES ('numbness/tingling/nerve conditions');
INSERT INTO medical_conditions (condition)
VALUES ('fainting spells');

CREATE TABLE class (
id SERIAL PRIMARY KEY,
class_type VARCHAR(100),
active_status boolean
);

INSERT INTO class (class_type, active_status)
VALUES ('Personal Training', TRUE);
INSERT INTO class (class_type, active_status)
VALUES ('Movement/Mobility', TRUE);
INSERT INTO class (class_type, active_status)
VALUES ('Yoga', TRUE);
INSERT INTO class (class_type, active_status)
VALUES ('Rowing', TRUE);
INSERT INTO class (class_type, active_status)
VALUES ('Total Body Conditioning', TRUE);
INSERT INTO class (class_type, active_status)
VALUES ('Kettlebells', TRUE);
INSERT INTO class (class_type, active_status)
VALUES ('Ropes and Bags', TRUE);
INSERT INTO class (class_type, active_status)
VALUES ('Suspension Training', TRUE);
INSERT INTO class (class_type, active_status)
VALUES ('Barre', TRUE);
INSERT INTO class (class_type, active_status)
VALUES ('Vinna x', TRUE);

CREATE TABLE client (
id serial PRIMARY KEY,
first_name varchar(100) NOT NULL,
last_name varchar(100) NOT NULL,
email varchar(100),
phone varchar(100),
dob date NOT NULL,
last_medical timestamp,
height varchar(100),
weight integer,
emergency_name varchar(100),
emergency_phone varchar(100),
current_injuries varchar(500),
previous_medical_hist varchar(500),
medications varchar(500),
infection boolean,
inflammation boolean,
flu boolean,
fever boolean,
cold boolean,
physician_name varchar(100),
physician_phone varchar(100),
location_id INTEGER REFERENCES location(id),
signature varchar(100),
signature_date timestamp,
signature_under_age varchar(100),
signature_date_under_age timestamp,
active_status boolean
);

CREATE TABLE client_conditions (
id SERIAL PRIMARY KEY,
client_id INTEGER REFERENCES client(id),
condition_id INTEGER REFERENCES medical_conditions(id)
);

CREATE TABLE workout (
id serial PRIMARY KEY,
user_id INTEGER REFERENCES users(id),
client_id INTEGER REFERENCES client(id),
date date NOT NULL,
location_id INTEGER REFERENCES location(id),
flag boolean,
notes varchar(500),
stretching varchar(500),
warmup_notes varchar(500),
class_type INTEGER REFERENCES class(id)
);

CREATE TABLE workout_line_items (
id serial PRIMARY KEY,
workout_id INTEGER REFERENCES workout(id),
exercise_id INTEGER REFERENCES exercise(id),
sets INTEGER,
time INTEGER,
reps INTEGER,
distance INTEGER,
body_weight boolean,
intensity_lbs INTEGER,
intensity_kgs INTEGER,
warmup boolean
);

CREATE TABLE fms (
id SERIAL PRIMARY KEY,
deep_squat INTEGER NOT NULL,
toe_touch BOOLEAN,
deep_squat_df VARCHAR(500),
hurdle_step INTEGER NOT NULL,
left_leg_up INTEGER NOT NULL,
right_leg_up INTEGER NOT NULL,
hurdle_df VARCHAR(500),
in_line_lunge INTEGER NOT NULL,
left_leg_forward INTEGER NOT NULL,
right_leg_forward INTEGER NOT NULL,
lunge_df VARCHAR(500),
shoulder_mobility INTEGER NOT NULL,
left_top INTEGER NOT NULL,
right_top INTEGER NOT NULL,
l_impingement BOOLEAN,
r_impingement BOOLEAN,
shoulder_df VARCHAR(500),
active_straight_leg INTEGER NOT NULL,
asl_l_up INTEGER NOT NULL,
asl_r_up INTEGER NOT NULL,
leg_raise_df VARCHAR(500),
trunk_pushup INTEGER NOT NULL,
prone_press BOOLEAN,
trunk_df VARCHAR(500),
rotary_stability INTEGER NOT NULL,
flexion BOOLEAN,
rotary_left_up INTEGER NOT NULL,
rotary_right_up INTEGER NOT NULL,
rotary_df VARCHAR(500),
total INTEGER NOT NULL,
client_id INTEGER NOT NULL REFERENCES client(id),
user_id INTEGER NOT NULL REFERENCES users(id),
date DATE NOT NULL,
hand_dominance VARCHAR(25),
swing_dominance VARCHAR(25),
throw_dominance VARCHAR(25),
leg_dominance VARCHAR(25),
shin_length REAL,
hand_length REAL,
location_id INTEGER REFERENCES location(id)
);

INSERT INTO client (first_name, last_name, email, phone, dob, last_medical, height, weight, emergency_name, emergency_phone,
current_injuries, previous_medical_hist, medications, infection, inflammation, flu, fever, cold, physician_name,
physician_phone, location_id, signature, signature_date, active_status)
VALUES ('Homer', 'Simpson', 'simpsons@gmail.com', '5555555555', '1976-01-01', now(), '5''10""', 130, 'Marge Simpson',
'5555555555', 'Recovering from sprained ankle', 'ACL Repair in 2/2000', 'None', FALSE, TRUE, FALSE, FALSE, FALSE,
'Dr. Nick', '5555555555', 1, 'Homer Simpson', now(), TRUE);
INSERT INTO client (first_name, last_name, email, phone, dob, last_medical, height, weight, emergency_name, emergency_phone,
current_injuries, previous_medical_hist, medications, infection, inflammation, flu, fever, cold, physician_name,
physician_phone, location_id, signature_under_age, signature_date_under_age, active_status)
VALUES ('Bart', 'Simpson', 'simpsons@gmail.com', '5555555555', '2007-01-01', now(), '4''5""', 130, 'Marge Simpson',
'5555555555', 'Recovering from sprained ankle', 'ACL Repair in 2/2000', 'None', FALSE, TRUE, FALSE, FALSE, FALSE,
'Dr. Nick', '5555555555', 1, 'Marge Simpson', now(), TRUE);
INSERT INTO client (first_name, last_name, email, phone, dob, last_medical, height, weight, emergency_name, emergency_phone,
current_injuries, previous_medical_hist, medications, infection, inflammation, flu, fever, cold, physician_name,
physician_phone, location_id, signature_under_age, signature_date_under_age, active_status)
VALUES ('Lisa', 'Simpson', 'simpsons@gmail.com', '5555555555', '2009-01-01', now(), '4''3""', 130, 'Marge Simpson',
'5555555555', 'Recovering from sprained ankle', 'ACL Repair in 2/2000', 'None', FALSE, TRUE, FALSE, FALSE, FALSE,
'Dr. Nick', '5555555555', 1, 'Marge Simpson', now(), TRUE);
INSERT INTO client (first_name, last_name, email, phone, dob, last_medical, height, weight, emergency_name, emergency_phone,
current_injuries, previous_medical_hist, medications, infection, inflammation, flu, fever, cold, physician_name,
physician_phone, location_id, signature_under_age, signature_date_under_age, active_status)
VALUES ('Maggie', 'Simpson', 'simpsons@gmail.com', '5555555555', '2015-01-01', now(), '2''3""', 130, 'Marge Simpson',
'5555555555', 'Recovering from sprained ankle', 'ACL Repair in 2/2000', 'None', FALSE, TRUE, FALSE, FALSE, FALSE,
'Dr. Nick', '5555555555', 1, 'Marge Simpson', now(), TRUE);
INSERT INTO client (first_name, last_name, email, phone, dob, last_medical, height, weight, emergency_name, emergency_phone,
current_injuries, previous_medical_hist, medications, infection, inflammation, flu, fever, cold, physician_name,
physician_phone, location_id, signature, signature_date, active_status)
VALUES ('Marge', 'Simpson', 'simpsons@gmail.com', '5555555555', '1976-01-01', now(), '5''7""', 130, 'Homer Simpson',
'5555555555', 'Recovering from sprained ankle', 'ACL Repair in 2/2000', 'None', FALSE, TRUE, FALSE, FALSE, FALSE,
'Dr. Nick', '5555555555', 1, 'Marge Simpson', now(), TRUE);

INSERT INTO client_conditions (client_id, condition_id)
VALUES (1, 2);
INSERT INTO client_conditions (client_id, condition_id)
VALUES (1, 4);
INSERT INTO client_conditions (client_id, condition_id)
VALUES (1, 5);
INSERT INTO client_conditions (client_id, condition_id)
VALUES (5, 7);

INSERT INTO workout (user_id, client_id, date, location_id, flag, notes, stretching, warmup_notes, class_type)
VALUES (1, 1, '2016-03-12', 1, TRUE, 'Can we add Tire Roll as a new exercise?', '10-minute dynamic cool down',
'10-minute dynamic warm-up', 1);
INSERT INTO workout (user_id, client_id, date, location_id, stretching, warmup_notes, class_type)
VALUES (1, 2, '2016-03-14', 1, '10-minute dynamic cool down', '10-minute dynamic warm-up', 2);
INSERT INTO workout (user_id, client_id, date, location_id, flag, notes, stretching, warmup_notes, class_type)
VALUES (1, 2, '2016-03-16', 1, TRUE, 'Can we get more mat cleaner?', '10-minute dynamic cool down',
'10-minute dynamic warm-up', 3);
INSERT INTO workout (user_id, client_id, date, location_id, stretching, warmup_notes, class_type)
VALUES (1, 1, '2016-03-18', 1, '10-minute dynamic cool down', '10-minute dynamic warm-up', 1);
INSERT INTO workout (user_id, client_id, date, location_id, stretching, warmup_notes, class_type)
VALUES (1, 3, '2016-03-20', 1, '10-minute dynamic cool down', '10-minute dynamic warm-up', 4);
INSERT INTO workout (user_id, client_id, date, location_id, stretching, warmup_notes, class_type)
VALUES (1, 4, '2016-03-22', 1, '10-minute dynamic cool down', '10-minute dynamic warm-up', 6);

INSERT INTO workout_line_items (workout_id, exercise_id, sets, reps, intensity_lbs)
VALUES (1, 1, 3, 5, 50);
INSERT INTO workout_line_items (workout_id, exercise_id, sets, reps)
VALUES (1, 2, 3, 15);
INSERT INTO workout_line_items (workout_id, exercise_id, sets, time, body_weight)
VALUES (1, 3, 3, 60, TRUE);
INSERT INTO workout_line_items (workout_id, exercise_id, sets, distance)
VALUES (1, 4, 3, 200);
INSERT INTO workout_line_items (workout_id, exercise_id, sets, reps, intensity_kgs)
VALUES (1, 5, 3, 5, 4);

INSERT INTO workout_line_items (workout_id, exercise_id, sets, reps, intensity_lbs)
VALUES (2, 1, 3, 5, 50);
INSERT INTO workout_line_items (workout_id, exercise_id, sets, reps)
VALUES (2, 2, 3, 15);
INSERT INTO workout_line_items (workout_id, exercise_id, sets, time, body_weight)
VALUES (2, 3, 3, 60, TRUE);
INSERT INTO workout_line_items (workout_id, exercise_id, sets, distance)
VALUES (2, 4, 3, 200);
INSERT INTO workout_line_items (workout_id, exercise_id, sets, reps, intensity_kgs)
VALUES (2, 5, 3, 5, 4);

INSERT INTO workout_line_items (workout_id, exercise_id, sets, reps, intensity_lbs)
VALUES (3, 1, 3, 5, 50);
INSERT INTO workout_line_items (workout_id, exercise_id, sets, reps)
VALUES (3, 2, 3, 15);
INSERT INTO workout_line_items (workout_id, exercise_id, sets, time, body_weight)
VALUES (3, 3, 3, 60, TRUE);
INSERT INTO workout_line_items (workout_id, exercise_id, sets, distance)
VALUES (3, 4, 3, 200);
INSERT INTO workout_line_items (workout_id, exercise_id, sets, reps, intensity_kgs)
VALUES (3, 5, 3, 5, 4);

INSERT INTO workout_line_items (workout_id, exercise_id, sets, reps, intensity_lbs)
VALUES (4, 1, 3, 5, 50);
INSERT INTO workout_line_items (workout_id, exercise_id, sets, reps)
VALUES (4, 2, 3, 15);
INSERT INTO workout_line_items (workout_id, exercise_id, sets, time, body_weight)
VALUES (4, 3, 3, 60, TRUE);
INSERT INTO workout_line_items (workout_id, exercise_id, sets, distance)
VALUES (4, 4, 3, 200);
INSERT INTO workout_line_items (workout_id, exercise_id, sets, reps, intensity_kgs)
VALUES (4, 5, 3, 5, 4);

INSERT INTO workout_line_items (workout_id, exercise_id, sets, reps, intensity_lbs)
VALUES (5, 1, 3, 5, 50);
INSERT INTO workout_line_items (workout_id, exercise_id, sets, reps)
VALUES (5, 2, 3, 15);
INSERT INTO workout_line_items (workout_id, exercise_id, sets, time, body_weight)
VALUES (5, 3, 3, 60, TRUE);
INSERT INTO workout_line_items (workout_id, exercise_id, sets, distance)
VALUES (5, 4, 3, 200);
INSERT INTO workout_line_items (workout_id, exercise_id, sets, reps, intensity_kgs)
VALUES (5, 5, 3, 5, 4);

INSERT INTO workout_line_items (workout_id, exercise_id, sets, reps, intensity_lbs)
VALUES (6, 1, 3, 5, 50);
INSERT INTO workout_line_items (workout_id, exercise_id, sets, reps)
VALUES (6, 2, 3, 15);
INSERT INTO workout_line_items (workout_id, exercise_id, sets, time, body_weight)
VALUES (6, 3, 3, 60, TRUE);
INSERT INTO workout_line_items (workout_id, exercise_id, sets, distance)
VALUES (6, 4, 3, 200);
INSERT INTO workout_line_items (workout_id, exercise_id, sets, reps, intensity_kgs)
VALUES (6, 5, 3, 5, 4);

INSERT INTO fms (deep_squat, toe_touch, deep_squat_df, hurdle_step, left_leg_up, right_leg_up, hurdle_df,
in_line_lunge, left_leg_forward, right_leg_forward,lunge_df, shoulder_mobility,left_top, right_top, l_impingement,
r_impingement, shoulder_df, active_straight_leg, asl_l_up, asl_r_up, leg_raise_df,
trunk_pushup, prone_press, trunk_df, rotary_stability, rotary_left_up, rotary_right_up, rotary_df, flexion, total,
client_id, user_id, date, hand_dominance, swing_dominance, throw_dominance, leg_dominance, shin_length,
hand_length, location_id)
VALUES (3, TRUE, 'None', 2, 2, 2, 'None', 2, 2, 3, 'None', 3, 3, 3, FALSE, FALSE, 'None', 1, 2, 1, 'None', 3, TRUE,
'None', 2, 2, 3, 'None', TRUE, 16, 1, 1, '2016-03-12', 'right', 'right', 'left', 'left', 18.25, 8.75, 1);
INSERT INTO fms (deep_squat, toe_touch, deep_squat_df, hurdle_step, left_leg_up, right_leg_up, hurdle_df,
in_line_lunge, left_leg_forward, right_leg_forward,lunge_df, shoulder_mobility,left_top, right_top, l_impingement,
r_impingement, shoulder_df, active_straight_leg, asl_l_up, asl_r_up, leg_raise_df,
trunk_pushup, prone_press, trunk_df, rotary_stability, rotary_left_up, rotary_right_up, rotary_df, flexion, total,
client_id, user_id, date, hand_dominance, swing_dominance, throw_dominance, leg_dominance, shin_length,
hand_length, location_id)
VALUES (3, TRUE, 'None', 2, 2, 2, 'None', 2, 2, 3, 'None', 3, 3, 3, FALSE, FALSE, 'None', 1, 2, 1, 'None', 3, TRUE,
'None', 2, 2, 3, 'None', TRUE, 16, 1, 4, '2016-06-12', 'right', 'right', 'left', 'left', 18.25, 8.75, 1);
INSERT INTO fms (deep_squat, toe_touch, deep_squat_df, hurdle_step, left_leg_up, right_leg_up, hurdle_df,
in_line_lunge, left_leg_forward, right_leg_forward,lunge_df, shoulder_mobility,left_top, right_top, l_impingement,
r_impingement, shoulder_df, active_straight_leg, asl_l_up, asl_r_up, leg_raise_df,
trunk_pushup, prone_press, trunk_df, rotary_stability, rotary_left_up, rotary_right_up, rotary_df, flexion, total,
client_id, user_id, date, hand_dominance, swing_dominance, throw_dominance, leg_dominance, shin_length,
hand_length, location_id)
VALUES (3, TRUE, 'None', 2, 2, 2, 'None', 2, 2, 3, 'None', 3, 3, 3, FALSE, FALSE, 'None', 1, 2, 1, 'None', 3, TRUE,
'None', 2, 2, 3, 'None', TRUE, 16, 1, 3, '2015-12-12', 'right', 'right', 'left', 'left', 18.25, 8.75, 1);
