export default class User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;

  constructor({
    id,
    email,
    firstName,
    lastName,
    dateOfBirth,
  }: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
  }) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
  }
}
