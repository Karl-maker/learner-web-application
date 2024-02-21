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

  const handleChangeDateOfBirth = (
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

  const handleChangeCountry = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update the school.name attribute in the student object
    params.setStudent((prevStudent) => ({
      ...prevStudent,
      school: {
        ...prevStudent.school,
        name: event.target.value,
      },
    }));
  };

  const handleChangeGrade = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    <div className="flex justify-center items-center h-screen bg-primary">
      <div>
        <h2 className="mx-4 text-2xl font-semibold text-white mb-4 transition-transform transform hover:scale-110 hover:opacity-75">
          Enter information accordingly & Complete your profile
        </h2>
        <h2 className="mx-4 text-xl  text-white mb-4 transition-transform transform hover:scale-110 hover:opacity-75">
          Enter additional information if needed
        </h2>
      </div>
      <div className=" mx-10 w-full gap-4 overflow-hidden">
        <div className="px-6 py-8">
          <div className="mb-4">
            <label className="block text-tertiary text-lg font-bold mb-2">
              School Name
            </label>
            <input
              id="schoolName"
              type="text"
              value={params.student.school?.name || ""}
              onChange={handleChangeSchoolName}
              className="bg-primary w-full p-2 border-b-2 text-white border-tertiary focus:outline-none  focus:border-secondary"
              placeholder="Enter School Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-tertiary text-lg font-bold mb-2">
              Country
            </label>
            <input
              id="country"
              type="text"
              value={params.student.country || ""}
              onChange={handleChangeCountry}
              className="bg-primary w-full p-2 border-b-2 text-white border-tertiary focus:outline-none  focus:border-secondary"
              placeholder="Country"
            />
          </div>
          <div className="mb-4">
            <label className="block text-tertiary text-lg font-bold mb-2">
              Date of Birth
            </label>
            <input
              id="dateOfBirth"
              type="date"
              value={params.student.dateOfBirth || ""}
              onChange={handleChangeDateOfBirth}
              className="bg-primary w-full p-2 border-b-2 text-white border-tertiary focus:outline-none  focus:border-secondary"
              placeholder="Date Of Birth"
            />
          </div>
          <div className="mb-6">
            <label className="block text-tertiary text-lg font-bold mb-2">
              Grade
            </label>
            <input
              id="grade"
              type="number"
              value={params.student.grade || ""}
              onChange={handleChangeGrade}
              className="bg-primary w-full p-2 border-b-2 text-white border-tertiary focus:outline-none  focus:border-secondary"
              placeholder="Grade"
            />
          </div>
          <button
            className="bg-secondary my-4 text-white px-4 py-2 rounded hover:bg-primary focus:outline-none transition-transform transform hover:scale-110 float-right"
            onClick={params.onComplete}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
