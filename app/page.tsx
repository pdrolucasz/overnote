import { Button } from "@/components/ui/button";
import * as Card from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-svh w-full bg-zinc-50 items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card.Card>
            <Card.CardHeader>
              <Card.CardTitle className="text-2xl">Welcome</Card.CardTitle>
              <Card.CardDescription>
                An intuitive note-taking platform to organize your thoughts, ideas, tasks effortlessly, and share notes with other users.
              </Card.CardDescription>
            </Card.CardHeader>

            <Card.CardContent>
              <Link href="/login">
                <Button type="button" className="w-full">
                  Get Started
                </Button>
              </Link>
            </Card.CardContent>
          </Card.Card>
        </div>
      </div>
    </div>
  );
}
