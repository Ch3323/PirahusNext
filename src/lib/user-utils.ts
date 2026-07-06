import { IMentor } from "@/src/core/domain/mentor";
import { IMentee } from "@/src/core/domain/mentee";

/**
 * Removes the password hash from the mentor object before it is returned to the client.
 */
export function stripMentorPassword(mentor: IMentor): Omit<IMentor, "password"> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...safeMentor } = mentor;
  return safeMentor as Omit<IMentor, "password">;
}

/**
 * Removes the password hash from the mentee object before it is returned to the client.
 */
export function stripMenteePassword(mentee: IMentee): Omit<IMentee, "password"> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...safeMentee } = mentee;
  return safeMentee as Omit<IMentee, "password">;
}
