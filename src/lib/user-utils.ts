import { IMentor } from "@/src/core/domain/mentor";
import { IMentee } from "@/src/core/domain/mentee";

export type SafeMentor = Omit<IMentor, "password"> & { hasPassword: boolean };

export function stripMentorPassword(mentor: IMentor): SafeMentor {
  const { password: _password, ...safeMentor } = mentor;
  const safeMentorResult = { ...safeMentor, hasPassword: !!_password } as SafeMentor;

  if (safeMentorResult.mentee) {
    const { password: _menteePassword, ...safeMentee } = safeMentorResult.mentee as IMentee;
    const safeMenteeResult: SafeMentee = { ...safeMentee, hasPassword: !!_menteePassword };
    (safeMentorResult as unknown as { mentee: SafeMentee }).mentee = safeMenteeResult;
  }

  return safeMentorResult;
}

export type SafeMentee = Omit<IMentee, "password"> & { hasPassword: boolean };

export function stripMenteePassword(mentee: IMentee): SafeMentee {
  const { password: _password, ...safeMentee } = mentee;
  return { ...safeMentee, hasPassword: !!_password } as SafeMentee;
}
