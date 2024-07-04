interface SignUpParams {
  firstName?: string;
  lastName?: string;
  address1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  dateOfBirth?: string;
  ssn?: string;
  email: string;
  password: string;
}

interface SignInProps {
  email: string;
  password: string;
}
