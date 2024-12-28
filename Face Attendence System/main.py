#  Alternatively: Use the Visual Studio Developer Command Prompt
# incomplete or incorrect installation of the Visual Studio Build Tools.



import face_recognition
import cv2
import numpy as np
import csv
from datetime import datetime

video_capture = cv2.VideoCapture(0)

# Load a sample picture and learn how to recognize it.
face_vishal = face_recognition.load_image_file("Faces/Vishal.jpg")
vishal_encoding = face_recognition.face_encodings(face_vishal)[0]
face_utkarsh = face_recognition.load_image_file("Faces/Utkarsh.jpg")
utkarsh_encoding = face_recognition.face_encodings(face_utkarsh)[0]

known_face_encodings = [vishal_encoding , utkarsh_encoding]
known_face_names = ["Vishal" , "Utkarsh"]

#list of expected students
students = known_face_names.copy()

face_locations = []
face_encodings = []

# get  the curr date and time

now = datetime.now()
curr_date = now.strftime("%Y-%m-%d")

f = open(f"{curr_date}.csv","w+",newline="")
lnwriter = csv.writer(f)

while True:
    _, frame = video_capture.read()
    small_frame = cv2.resize(frame,(0, 0), fx=0.25, fy=0.25)
    rgb_small_frame = cv2.cvtColor(small_frame, cv2.COLOR_BGR2RGB)

    #Recognize faces
    face_locations = face_recognition.face_locations(rgb_small_frame)
    face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

    for face_encoding in face_encodings:
        matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
        face_distance = face_recognition.face_distance(known_face_encodings, face_encoding)
        best_match_index = np.argmin(face_distance)

        if matches[best_match_index]:
            name = known_face_names[best_match_index]  # Corrected line

        #add the text if person is present
        if name in known_face_names:
            font = cv2.FONT_HERSHEY_SIMPLEX
            bottomLeftCornerOfText = (10, 100)
            fontScale = 1.5
            fontColor = (255, 0, 0)
            thickness = 3
            lineType = 2
            cv2.putText(frame, name + " Present", bottomLeftCornerOfText, font, fontScale, fontColor, thickness, lineType)

            if name in students:
                students.remove(name)
                curr_time = now.strftime("%H:%M:%S")
                lnwriter.writerow([name, curr_time])

        cv2.imshow("Attendence", frame)

        if cv2.waitKey(1) & 0xFF == ord("q"):
            break



video_capture.release()
cv2.destroyAllWindows()
f.close()