import { Student } from "@/types/student";
import { Dispatch, SetStateAction } from "react";

export type OnboardingProcessInput = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  onComplete: () => void;
  student: Omit<Student, "account_id" | "id">; // id and account_id are given afterwards
  setStudent: Dispatch<SetStateAction<Omit<Student, "account_id" | "id">>>;
};

export default function OnboardingProcess(params: OnboardingProcessInput) {
  /**
   * @note Example of a handler
   */
  const handleChangeSchoolName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Update the school.name attribute in the student object
    params.setStudent((prevStudent) => ({
      ...prevStudent,
      school: {
        ...prevStudent.school,
        name: event.target.value,
      },
    }));
  };

  return (
    <>
      <input
        type="text"
        // ..school?. the ? prevents errors by allowing us to then use || (OR) then a default value. This is because some values may not exist
        value={params.student.school?.name || ""}
        onChange={handleChangeSchoolName}
        placeholder="Enter School Name"
      />
      <button onClick={params.onComplete}>Submit</button>
    </>
  );
}
