// src/app/my-account/page.tsx
import Container from "@/components/ui/Container";
import LoginForm from "@/components/account/LoginForm";

export default function MyAccountPage() {
  return (
    <Container>
      <div className="py-10">
        <h1 className="sr-only">My account</h1>
        <LoginForm />
      </div>
    </Container>
  );
}
