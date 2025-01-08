// Update the handleSubmit function in LoginForm.tsx
//const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   try {
//     const response = await login(type, { email, password });
//     if (response.requiresVerification) {
//       navigate('/verify-email', { state: { email, type } });
//     } else {
//       navigate(`/${type}/dashboard`);
//     }
//   } catch (err) {
//     console.error('Login failed:', err);
//   }
// };