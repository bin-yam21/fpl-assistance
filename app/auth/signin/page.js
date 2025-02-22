"use client";

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Box, Text, Card, Flex, Heading } from "@chakra-ui/react";
import { Input } from "@chakra-ui/input";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      // Redirect to dashboard on success
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card
        width="100%"
        maxWidth="400px"
        padding="24px"
        shadow="medium"
        borderRadius="8px"
      >
        <Heading size="large" align="center" marginBottom="16px">
          Sign In
        </Heading>

        {error && (
          <Text color="red" align="center" marginBottom="16px">
            {error}
          </Text>
        )}

        <form onSubmit={handleSignIn} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            width="100%"
            marginBottom="12px"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            width="100%"
            marginBottom="16px"
          />
          <Button type="submit" width="100%" color="blue">
            Sign In
          </Button>
        </form>
      </Card>
    </Box>
  );
}
