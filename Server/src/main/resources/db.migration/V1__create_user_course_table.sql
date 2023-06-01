-- V1__create_user_course_table.sql
CREATE TABLE user_course (
  user_id INT,
  course_id INT,
  PRIMARY KEY (user_id, course_id),
  FOREIGN KEY (user_id) REFERENCES _user(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);
