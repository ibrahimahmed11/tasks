"""
School Management System
=========================
Task-1: Demonstrates core OOP concepts (encapsulation, inheritance,
polymorphism/method overriding) using a Person base class and three
roles that extend it: Principal, Teacher, and Student.
"""

import re


# ---------------------------------------------------------------------
# Step 1: Base Class - Person
# ---------------------------------------------------------------------
class Person:
    """General base class shared by all school members."""

    def __init__(self, name: str, email: str, id_: str):
        self.name = name
        self.__email = None
        self.__id = None
        self.set_email(email)
        self.set_id(id_)

    # ---- Email: private field with validated getter/setter ----
    def get_email(self) -> str:
        return self.__email

    def set_email(self, email: str) -> None:
        pattern = r"^[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}$"
        if not isinstance(email, str) or not re.match(pattern, email):
            raise ValueError(f"Invalid email address: {email!r}")
        self.__email = email

    # ---- ID: private field with validated getter/setter ----
    def get_id(self) -> str:
        return self.__id

    def set_id(self, id_: str) -> None:
        if not isinstance(id_, str) or not id_.strip():
            raise ValueError("ID must be a non-empty string.")
        self.__id = id_.strip()

    def describe_role(self) -> str:
        """Generic behavior; each subclass overrides this."""
        return f"{self.name} is a member of the school."

    def __str__(self) -> str:
        return f"{self.name} (ID: {self.get_id()}, Email: {self.get_email()})"


# ---------------------------------------------------------------------
# Step 2: Principal Role
# ---------------------------------------------------------------------
class Principal(Person):
    """Manages the school's members."""

    def __init__(self, name: str, email: str, id_: str):
        super().__init__(name, email, id_)
        self.__members = []  # Teachers and Students under this principal

    def add_member(self, member: Person) -> None:
        if not isinstance(member, (Teacher, Student)):
            raise TypeError("Only Teacher or Student instances can be added.")
        self.__members.append(member)
        print(f"[Principal] Added {member.name} to the school.")

    def remove_member(self, member: Person) -> None:
        if member in self.__members:
            self.__members.remove(member)
            print(f"[Principal] Removed {member.name} from the school.")
        else:
            print(f"[Principal] {member.name} is not a registered member.")

    def list_members(self) -> None:
        print(f"\n--- School Members (managed by {self.name}) ---")
        if not self.__members:
            print("No members registered yet.")
        for member in self.__members:
            print(f"  - {member}")

    def get_members(self) -> list:
        return list(self.__members)

    def describe_role(self) -> str:
        return f"{self.name} is the Principal, overseeing the entire school."


# ---------------------------------------------------------------------
# Step 3: Teacher Role
# ---------------------------------------------------------------------
class Teacher(Person):
    """Teaches a subject and grades students."""

    def __init__(self, name: str, email: str, id_: str, subject: str):
        super().__init__(name, email, id_)
        self.subject = subject
        self.__grades = {}  # student_name -> grade

    def grade_student(self, student: "Student", grade) -> None:
        if not isinstance(student, Student):
            raise TypeError("Only Student instances can be graded.")
        self.__grades[student.name] = grade
        print(f"[Teacher] {self.name} graded {student.name} with '{grade}' "
              f"in {self.subject}.")

    def list_graded_students(self) -> None:
        print(f"\n--- Students graded by {self.name} ({self.subject}) ---")
        if not self.__grades:
            print("No students graded yet.")
        for student_name, grade in self.__grades.items():
            print(f"  - {student_name}: {grade}")

    def describe_role(self) -> str:
        return f"{self.name} is a Teacher who teaches {self.subject}."


# ---------------------------------------------------------------------
# Step 4: Student Role
# ---------------------------------------------------------------------
class Student(Person):
    """Enrolls in subjects."""

    def __init__(self, name: str, email: str, id_: str):
        super().__init__(name, email, id_)
        self.__enrolled_subjects = []

    def enroll(self, subject: str) -> None:
        if subject not in self.__enrolled_subjects:
            self.__enrolled_subjects.append(subject)
            print(f"[Student] {self.name} enrolled in {subject}.")
        else:
            print(f"[Student] {self.name} is already enrolled in {subject}.")

    def list_enrolled_subjects(self) -> None:
        print(f"\n--- Subjects {self.name} is enrolled in ---")
        if not self.__enrolled_subjects:
            print("Not enrolled in any subjects yet.")
        for subject in self.__enrolled_subjects:
            print(f"  - {subject}")

    def describe_role(self) -> str:
        subjects = ", ".join(self.__enrolled_subjects) if self.__enrolled_subjects else "no subjects yet"
        return f"{self.name} is a Student enrolled in: {subjects}."


# ---------------------------------------------------------------------
# Step 5: Create and Use Objects (simulation)
# ---------------------------------------------------------------------
def main():
    # Create instances of Principal, Teacher, and Student
    principal = Principal("Dr. Ahmed Youssef", "ahmed.youssef@school.edu", "P001")
    teacher = Teacher("Ms. Salma Adel", "salma.adel@school.edu", "T001", "Computer Science")
    student1 = Student("Omar Khaled", "omar.khaled@school.edu", "S001")
    student2 = Student("Laila Hassan", "laila.hassan@school.edu", "S002")

    # Principal adds members (Teachers, Students)
    principal.add_member(teacher)
    principal.add_member(student1)
    principal.add_member(student2)

    # Teacher grades a student
    teacher.grade_student(student1, "A")
    teacher.grade_student(student2, "B+")

    # Student enrolls in subjects
    student1.enroll("Computer Science")
    student1.enroll("Mathematics")
    student2.enroll("Computer Science")

    # Show detailed lists
    principal.list_members()
    teacher.list_graded_students()
    student1.list_enrolled_subjects()
    student2.list_enrolled_subjects()

    # Store all members in an array and loop through them calling describe_role()
    all_members = [principal, teacher, student1, student2]
    print("\n--- Role Descriptions (polymorphism in action) ---")
    for member in all_members:
        print(f"  - {member.describe_role()}")


if __name__ == "__main__":
    main()
